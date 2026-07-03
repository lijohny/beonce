import { NextRequest, NextResponse } from "next/server";
import { getUploadPresignedUrl, buildS3Key, validateUpload, type KycDocType } from "@/lib/s3";
import { z } from "zod";

const schema = z.object({
  docType: z.enum(["aadhaar", "pan", "selfie", "title_deed", "cheque"]),
  contentType: z.string(),
  sizeBytes: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { docType, contentType, sizeBytes } = parsed.data;

  const validationError = validateUpload(docType as KycDocType, contentType, sizeBytes);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const ext = contentType === "application/pdf" ? "pdf" : contentType.split("/")[1];
  const key = buildS3Key(userId, docType as KycDocType, ext);
  const uploadUrl = await getUploadPresignedUrl(key, contentType);

  return NextResponse.json({ uploadUrl, key });
}
