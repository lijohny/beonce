import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } }).catch(() => {});
  }
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.delete("auth_token");
  return res;
}
