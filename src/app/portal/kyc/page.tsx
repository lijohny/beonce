"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type DocType = "pan" | "selfie" | "title_deed" | "cheque";
type UploadedKeys = Partial<Record<DocType, string>>;

// ── Schema ─────────────────────────────────────────────────────────────────────
const schema = z.object({
  aadhaarNumber: z.string().length(12, "Must be 12 digits").regex(/^\d{12}$/, "Digits only"),
  panNumber: z.string().length(10, "Must be 10 chars").regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
  bankAccount: z.string().min(9, "Min 9 digits").max(18, "Max 18 digits"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC"),
  refContact: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile").optional().or(z.literal("")),
  fatherContact: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile").optional().or(z.literal("")),
  motherContact: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile").optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

// ── Steps ──────────────────────────────────────────────────────────────────────
const STEPS = ["Aadhaar", "PAN", "Selfie", "Documents", "Bank", "Contacts", "Agreement"];

// ── File Upload Helper ─────────────────────────────────────────────────────────
async function uploadFile(file: File, docType: DocType): Promise<string> {
  const res = await fetch("/api/portal/kyc/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docType, contentType: file.type, sizeBytes: file.size }),
  });
  if (!res.ok) {
    const j = await res.json();
    throw new Error(j.error || "Failed to get upload URL");
  }
  const { uploadUrl, key } = await res.json();
  const upload = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  if (!upload.ok) throw new Error("File upload to S3 failed");
  return key as string;
}

// ── FileUploadField ────────────────────────────────────────────────────────────
function FileUploadField({ label, docType, accept, onUploaded, uploaded }: {
  label: string; docType: DocType; accept: string;
  onUploaded: (key: string) => void; uploaded: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(""); setUploading(true);
    try {
      const key = await uploadFile(file, docType);
      onUploaded(key);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally { setUploading(false); }
  }

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div
        className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${uploaded ? "border-green-500 bg-green-50 dark:bg-green-950" : "hover:bg-muted"}`}
        onClick={() => ref.current?.click()}
      >
        {uploading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> :
          uploaded ? <CheckCircle2 className="h-5 w-5 text-green-500" /> :
          <Upload className="h-5 w-5 text-muted-foreground" />}
        <span className="text-sm">{uploaded ? "Uploaded ✓" : uploading ? "Uploading…" : `Upload ${label}`}</span>
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function KycPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [keys, setKeys] = useState<UploadedKeys>({});
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { register, trigger, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const setKey = useCallback((doc: DocType, key: string) => {
    setKeys((prev) => ({ ...prev, [doc]: key }));
  }, []);

  async function next() {
    // Validate fields for current step
    const fieldsPerStep: (keyof FormData)[][] = [
      ["aadhaarNumber"], ["panNumber"], [], [], ["bankAccount", "ifscCode"],
      ["refContact", "fatherContact", "motherContact"], [],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (!valid) return;

    // Step-specific doc checks
    if (step === 1 && !keys.pan) return;
    if (step === 2 && !keys.selfie) return;

    setStep((s) => s + 1);
  }

  async function submit() {
    if (!agreed) return;
    if (!keys.pan || !keys.selfie) { setSubmitError("Required documents missing"); return; }

    setSubmitting(true); setSubmitError("");
    const vals = getValues();

    const res = await fetch("/api/portal/kyc/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aadhaarNumber: vals.aadhaarNumber,
        panNumber: vals.panNumber,
        panDocKey: keys.pan,
        selfieKey: keys.selfie,
        titleDeedKey: keys.title_deed,
        chequeKey: keys.cheque,
        bankAccount: vals.bankAccount,
        ifscCode: vals.ifscCode,
        refContact: vals.refContact || undefined,
        fatherContact: vals.fatherContact || undefined,
        motherContact: vals.motherContact || undefined,
        agreementAccepted: true,
      }),
    });

    const json = await res.json();
    setSubmitting(false);
    if (!res.ok) { setSubmitError(typeof json.error === "string" ? json.error : "Submission failed"); return; }
    router.push("/portal/kyc/submitted");
  }

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">KYC Verification</h1>
        <p className="text-sm text-muted-foreground">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
      </div>

      {/* Step indicators */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= step ? "text-foreground font-medium" : ""}>{s}</span>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">

          {/* Step 0: Aadhaar */}
          {step === 0 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">Aadhaar Details</CardTitle>
                <CardDescription>Enter your 12-digit Aadhaar number</CardDescription>
              </CardHeader>
              <div className="space-y-1">
                <Label>Aadhaar Number</Label>
                <Input placeholder="xxxx xxxx xxxx" maxLength={12} {...register("aadhaarNumber")} />
                {errors.aadhaarNumber && <p className="text-xs text-destructive">{errors.aadhaarNumber.message}</p>}
              </div>
            </>
          )}

          {/* Step 1: PAN */}
          {step === 1 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">PAN Card</CardTitle>
                <CardDescription>Enter PAN number and upload a clear photo/scan</CardDescription>
              </CardHeader>
              <div className="space-y-1">
                <Label>PAN Number</Label>
                <Input placeholder="ABCDE1234F" maxLength={10} className="uppercase" {...register("panNumber")} />
                {errors.panNumber && <p className="text-xs text-destructive">{errors.panNumber.message}</p>}
              </div>
              <FileUploadField label="PAN Card Photo/PDF" docType="pan" accept="image/jpeg,image/png,application/pdf"
                onUploaded={(k) => setKey("pan", k)} uploaded={!!keys.pan} />
              {!keys.pan && <p className="text-xs text-destructive">PAN document upload is required</p>}
            </>
          )}

          {/* Step 2: Selfie */}
          {step === 2 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">Selfie / Face Photo</CardTitle>
                <CardDescription>Upload a clear selfie for face verification</CardDescription>
              </CardHeader>
              <FileUploadField label="Selfie Photo" docType="selfie" accept="image/jpeg,image/png"
                onUploaded={(k) => setKey("selfie", k)} uploaded={!!keys.selfie} />
              {!keys.selfie && <p className="text-xs text-destructive">Selfie is required</p>}
            </>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">Supporting Documents</CardTitle>
                <CardDescription>Upload Title Deed and Cheque (optional but recommended)</CardDescription>
              </CardHeader>
              <FileUploadField label="Title Deed (optional)" docType="title_deed" accept="image/jpeg,image/png,application/pdf"
                onUploaded={(k) => setKey("title_deed", k)} uploaded={!!keys.title_deed} />
              <FileUploadField label="Cancelled Cheque (optional)" docType="cheque" accept="image/jpeg,image/png,application/pdf"
                onUploaded={(k) => setKey("cheque", k)} uploaded={!!keys.cheque} />
            </>
          )}

          {/* Step 4: Bank */}
          {step === 4 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">Bank Account</CardTitle>
                <CardDescription>Your bank details for EMI debit</CardDescription>
              </CardHeader>
              <div className="space-y-1">
                <Label>Account Number</Label>
                <Input placeholder="Account number" {...register("bankAccount")} />
                {errors.bankAccount && <p className="text-xs text-destructive">{errors.bankAccount.message}</p>}
              </div>
              <div className="space-y-1">
                <Label>IFSC Code</Label>
                <Input placeholder="SBIN0001234" maxLength={11} className="uppercase" {...register("ifscCode")} />
                {errors.ifscCode && <p className="text-xs text-destructive">{errors.ifscCode.message}</p>}
              </div>
            </>
          )}

          {/* Step 5: Contacts */}
          {step === 5 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">Reference Contacts</CardTitle>
                <CardDescription>Emergency and reference contact numbers</CardDescription>
              </CardHeader>
              {(["refContact", "fatherContact", "motherContact"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <Label>{field === "refContact" ? "Friend / Reference" : field === "fatherContact" ? "Father" : "Mother"}</Label>
                  <Input placeholder="10-digit mobile" maxLength={10} {...register(field)} />
                  {errors[field] && <p className="text-xs text-destructive">{errors[field]?.message}</p>}
                </div>
              ))}
            </>
          )}

          {/* Step 6: Agreement */}
          {step === 6 && (
            <>
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base">E-Agreement</CardTitle>
                <CardDescription>Review and digitally sign the EMI agreement</CardDescription>
              </CardHeader>
              <div className="rounded-lg border p-4 h-48 overflow-y-auto text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">EMI Agreement Terms</p>
                <p>I hereby agree to the EMI scheme offered by beOnce Construction. I authorize the company to debit the agreed EMI amount from my bank account on the scheduled due dates.</p>
                <p>I confirm that all documents submitted are genuine and that the information provided is accurate to the best of my knowledge.</p>
                <p>I understand that any default in EMI payments may result in penalties and legal action as per the terms of the scheme.</p>
                <p>I consent to beOnce Construction verifying my Aadhaar, PAN, and bank account details with the respective authorities.</p>
                <p>This agreement is legally binding and governed by the laws of India.</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 rounded" />
                <span className="text-sm">I have read and agree to the EMI agreement terms and conditions.</span>
              </label>
              {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" className="flex-1" onClick={() => setStep((s) => s - 1)} disabled={submitting}>
                Back
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button className="flex-1" onClick={next}>Continue</Button>
            ) : (
              <Button className="flex-1" onClick={submit} disabled={!agreed || submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</> : "Submit KYC"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
