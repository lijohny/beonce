import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDownloadPresignedUrl } from "@/lib/s3";
import { notifyKycStatus } from "@/lib/notifications";
import { z } from "zod";

const patchSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("APPROVE") }),
  z.object({ action: z.literal("REJECT"), reason: z.string().min(5, "Provide a reason") }),
  z.object({ action: z.literal("UNDER_REVIEW") }),
]);

function extractS3Key(url: string | null): string | null {
  if (!url) return null;
  // URL format: https://bucket.s3.region.amazonaws.com/key
  const match = url.match(/amazonaws\.com\/(.+)$/);
  return match ? match[1] : null;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kyc = await prisma.kycRecord.findUnique({
    where: { id: Number(id) },
    include: { user: { select: { id: true, name: true, mobile: true, email: true } } },
  });
  if (!kyc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Generate short-lived presigned URLs for doc viewing
  const docUrls: Record<string, string | null> = {};
  for (const [field, url] of [
    ["panDoc", kyc.panDocUrl], ["selfie", kyc.selfieUrl],
    ["titleDeed", kyc.titleDeedUrl], ["cheque", kyc.chequeUrl],
  ] as [string, string | null][]) {
    const key = extractS3Key(url);
    docUrls[field] = key ? await getDownloadPresignedUrl(key) : null;
  }

  return NextResponse.json({ kyc, docUrls });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminId = Number(req.headers.get("x-user-id"));
  const { id } = await params;

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const kyc = await prisma.kycRecord.findUnique({ where: { id: Number(id) } });
  if (!kyc) return NextResponse.json({ error: "KYC not found" }, { status: 404 });

  const { action } = parsed.data;

  const updated = await prisma.kycRecord.update({
    where: { id: Number(id) },
    data: {
      status: action === "APPROVE" ? "APPROVED" : action === "REJECT" ? "REJECTED" : "UNDER_REVIEW",
      rejectionReason: action === "REJECT" ? parsed.data.reason : null,
      reviewedBy: adminId,
      reviewedAt: new Date(),
    },
  });

  // Activate user if KYC approved
  if (action === "APPROVE") {
    await prisma.user.update({ where: { id: kyc.userId }, data: { status: "ACTIVE" } });
  }

  // Notify customer
  const user = await prisma.user.findUnique({ where: { id: kyc.userId }, select: { mobile: true, email: true, name: true } });
  if (user && (action === "APPROVE" || action === "REJECT")) {
    notifyKycStatus(user.mobile, user.email, user.name || "Customer",
      action === "APPROVE" ? "APPROVED" : "REJECTED",
      action === "REJECT" ? parsed.data.reason : undefined
    ).catch(() => {});
  }

  return NextResponse.json({ message: `KYC ${action.toLowerCase()}d`, kyc: updated });
}
