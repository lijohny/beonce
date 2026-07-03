import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const kyc = await prisma.kycRecord.findUnique({
    where: { userId },
    select: {
      id: true,
      status: true,
      rejectionReason: true,
      aadhaarVerified: true,
      bankVerified: true,
      agreementSigned: true,
      reviewedAt: true,
      createdAt: true,
      updatedAt: true,
      // field presence flags (no raw data exposure)
      panNumber: true,
      bankAccount: true,
    },
  });

  if (!kyc) return NextResponse.json({ status: "NOT_SUBMITTED" });

  return NextResponse.json({
    status: kyc.status,
    rejectionReason: kyc.rejectionReason,
    fields: {
      aadhaar: true,
      pan: !!kyc.panNumber,
      bank: !!kyc.bankAccount,
      aadhaarVerified: kyc.aadhaarVerified,
      bankVerified: kyc.bankVerified,
      agreementSigned: kyc.agreementSigned,
    },
    reviewedAt: kyc.reviewedAt,
    submittedAt: kyc.createdAt,
  });
}
