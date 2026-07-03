import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;

export type KycDocType = "aadhaar" | "pan" | "selfie" | "title_deed" | "cheque";

const ALLOWED_TYPES: Record<KycDocType, string[]> = {
  aadhaar: ["image/jpeg", "image/png", "application/pdf"],
  pan: ["image/jpeg", "image/png", "application/pdf"],
  selfie: ["image/jpeg", "image/png"],
  title_deed: ["image/jpeg", "image/png", "application/pdf"],
  cheque: ["image/jpeg", "image/png", "application/pdf"],
};

const MAX_SIZE_MB = 5;

export function validateUpload(docType: KycDocType, contentType: string, sizeBytes: number) {
  if (!ALLOWED_TYPES[docType]?.includes(contentType)) {
    return `Invalid file type for ${docType}. Allowed: ${ALLOWED_TYPES[docType].join(", ")}`;
  }
  if (sizeBytes > MAX_SIZE_MB * 1024 * 1024) {
    return `File too large. Max ${MAX_SIZE_MB}MB allowed.`;
  }
  return null;
}

export async function getUploadPresignedUrl(key: string, contentType: string): Promise<string> {
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ServerSideEncryption: "AES256",
  });
  return getSignedUrl(s3, cmd, { expiresIn: 300 }); // 5 min
}

export async function getDownloadPresignedUrl(key: string): Promise<string> {
  const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, cmd, { expiresIn: 3600 }); // 1 hr
}

export function buildS3Key(userId: number, docType: KycDocType, ext: string): string {
  return `kyc/${userId}/${docType}_${Date.now()}.${ext}`;
}

export function s3KeyToUrl(key: string): string {
  return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
