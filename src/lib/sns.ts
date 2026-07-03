import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpSms(mobile: string, otp: string): Promise<void> {
  const params = {
    Message: `Your beOnce OTP is ${otp}. Valid for ${process.env.OTP_EXPIRY_MINUTES || 10} minutes. Do not share.`,
    PhoneNumber: mobile.startsWith("+") ? mobile : `+91${mobile}`,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": { DataType: "String", StringValue: "Transactional" },
      "AWS.SNS.SMS.SenderID": { DataType: "String", StringValue: process.env.AWS_SNS_SENDER_ID || "BEONCE" },
    },
  };
  await sns.send(new PublishCommand(params));
}
