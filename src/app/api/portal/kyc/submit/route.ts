import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { s3KeyToUrl } from "@/lib/s3";
import { z } from "zod";

const schema = z.object({
  aadhaarNumber: z.string().length(12).regex(/^\d{12}$/),
  panNumber: z.string().length(10).regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/),
  panDocKey: z.string(),
  selfieKey: z.string(),
  titleDeedKey: z.string().optional(),
  chequeKey: z.string().optional(),
  bankAccount: z.string().min(9).max(18),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/),
  refContact: z.string().regex(/^[6-9]\d{9}$/).optional(),
  fatherContact: z.string().regex(/^[6-9]\d{9}$/).optional(),
  motherContact: z.string().regex(/^[6-9]\d{9}$/).optional(),
  agreementAccepted: z.literal(true),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const d = parsed.data;

  const existing = await prisma.kycRecord.findUnique({ where: { userId } });
  if (existing?.status === "APPROVED") {
    return NextResponse.json({ error: "KYC already approved" }, { status: 409 });
  }

  const data = {
    aadhaarNumber: d.aadhaarNumber,
    panNumber: d.panNumber,
    panDocUrl: s3KeyToUrl(d.panDocKey),
    selfieUrl: s3KeyToUrl(d.selfieKey),
    titleDeedUrl: d.titleDeedKey ? s3KeyToUrl(d.titleDeedKey) : null,
    chequeUrl: d.chequeKey ? s3KeyToUrl(d.chequeKey) : null,
    bankAccount: d.bankAccount,
    ifscCode: d.ifscCode,
    refContact: d.refContact ?? null,
    fatherContact: d.fatherContact ?? null,
    motherContact: d.motherContact ?? null,
    agreementSigned: true,
    status: "PENDING" as const,
  };

  const record = existing
    ? await prisma.kycRecord.update({ where: { userId }, data })
    : await prisma.kycRecord.create({ data: { userId, ...data } });

  return NextResponse.json({ message: "KYC submitted successfully", kycId: record.id }, { status: 201 });
}
