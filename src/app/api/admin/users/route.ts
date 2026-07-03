import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const search = searchParams.get("search") || "";
  const kycStatus = searchParams.get("kycStatus") || undefined;
  const limit = 20;

  const where = {
    role: "CUSTOMER" as const,
    ...(search && {
      OR: [
        { mobile: { contains: search } },
        { name: { contains: search } },
        { email: { contains: search } },
      ],
    }),
    ...(kycStatus && { kycRecord: { status: kycStatus as never } }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, name: true, mobile: true, email: true,
        status: true, isVerified: true, createdAt: true,
        kycRecord: { select: { id: true, status: true, rejectionReason: true } },
        emiAccounts: { select: { id: true, status: true, loanAmount: true, paidEmis: true, totalEmis: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) });
}
