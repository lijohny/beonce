import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const sns = new SNSClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// ── SMS via AWS SNS ───────────────────────────────────────────────────────────
export async function sendSms(mobile: string, message: string): Promise<void> {
  await sns.send(new PublishCommand({
    Message: message,
    PhoneNumber: mobile.startsWith("+") ? mobile : `+91${mobile}`,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": { DataType: "String", StringValue: "Transactional" },
      "AWS.SNS.SMS.SenderID": { DataType: "String", StringValue: process.env.AWS_SNS_SENDER_ID || "BEONCE" },
    },
  }));
}

// ── Email via AWS SES ─────────────────────────────────────────────────────────
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  await ses.send(new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL!,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: { Html: { Data: html, Charset: "UTF-8" } },
    },
  }));
}

// ── WhatsApp via Meta Cloud API ───────────────────────────────────────────────
export async function sendWhatsApp(mobile: string, templateName: string, components: unknown[]): Promise<void> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return; // optional — skip if not configured

  await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: mobile.startsWith("+") ? mobile : `+91${mobile}`,
      type: "template",
      template: { name: templateName, language: { code: "en" }, components },
    }),
  });
}

// ── Notification Templates ────────────────────────────────────────────────────

export async function notifyEmiDue(mobile: string, email: string | null, name: string, emiAmount: number, dueDate: string) {
  const msg = `Dear ${name}, your EMI of Rs.${emiAmount.toLocaleString("en-IN")} is due on ${dueDate}. Pay now: ${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard`;

  await Promise.allSettled([
    sendSms(mobile, msg),
    email && sendEmail(email, "EMI Due Reminder – beOnce", `
      <p>Dear ${name},</p>
      <p>Your EMI of <strong>₹${emiAmount.toLocaleString("en-IN")}</strong> is due on <strong>${dueDate}</strong>.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard">Pay Now</a></p>
      <p>Regards,<br/>beOnce Construction</p>
    `),
    sendWhatsApp(mobile, "emi_due_reminder", [
      { type: "body", parameters: [{ type: "text", text: name }, { type: "text", text: `₹${emiAmount}` }, { type: "text", text: dueDate }] },
    ]),
  ]);
}

export async function notifyPaymentSuccess(mobile: string, email: string | null, name: string, amount: number, paymentId: string) {
  const msg = `Dear ${name}, your payment of Rs.${amount.toLocaleString("en-IN")} (ID: ${paymentId}) to beOnce was successful. Thank you!`;

  await Promise.allSettled([
    sendSms(mobile, msg),
    email && sendEmail(email, "Payment Successful – beOnce", `
      <p>Dear ${name},</p>
      <p>Your payment of <strong>₹${amount.toLocaleString("en-IN")}</strong> was received successfully.</p>
      <p>Payment ID: <code>${paymentId}</code></p>
      <p>Regards,<br/>beOnce Construction</p>
    `),
    sendWhatsApp(mobile, "payment_success", [
      { type: "body", parameters: [{ type: "text", text: name }, { type: "text", text: `₹${amount}` }, { type: "text", text: paymentId }] },
    ]),
  ]);
}

export async function notifyPaymentFailed(mobile: string, email: string | null, name: string, amount: number) {
  const msg = `Dear ${name}, your EMI payment of Rs.${amount.toLocaleString("en-IN")} to beOnce FAILED. Please pay manually: ${process.env.NEXT_PUBLIC_APP_URL}/portal/payments`;

  await Promise.allSettled([
    sendSms(mobile, msg),
    email && sendEmail(email, "Payment Failed – beOnce", `
      <p>Dear ${name},</p>
      <p>Your EMI payment of <strong>₹${amount.toLocaleString("en-IN")}</strong> could not be processed.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/payments">Pay Manually</a></p>
      <p>Regards,<br/>beOnce Construction</p>
    `),
    sendWhatsApp(mobile, "payment_failed", [
      { type: "body", parameters: [{ type: "text", text: name }, { type: "text", text: `₹${amount}` }] },
    ]),
  ]);
}

export async function notifyKycStatus(mobile: string, email: string | null, name: string, status: "APPROVED" | "REJECTED", reason?: string) {
  const approved = status === "APPROVED";
  const msg = approved
    ? `Dear ${name}, your KYC has been APPROVED. You can now access your EMI portal: ${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard`
    : `Dear ${name}, your KYC was REJECTED. Reason: ${reason}. Please re-submit: ${process.env.NEXT_PUBLIC_APP_URL}/portal/kyc`;

  await Promise.allSettled([
    sendSms(mobile, msg),
    email && sendEmail(email, `KYC ${approved ? "Approved" : "Rejected"} – beOnce`, `
      <p>Dear ${name},</p>
      <p>Your KYC has been <strong>${status}</strong>.</p>
      ${!approved && reason ? `<p>Reason: ${reason}</p>` : ""}
      <p><a href="${approved ? `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard` : `${process.env.NEXT_PUBLIC_APP_URL}/portal/kyc`}">${approved ? "Go to Dashboard" : "Re-submit KYC"}</a></p>
      <p>Regards,<br/>beOnce Construction</p>
    `),
  ]);
}
