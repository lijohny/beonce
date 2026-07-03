"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof schema>;

type Step = "form" | "otp";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmitForm(data: FormData) {
    setError("");
    const res = await fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: data.mobile, purpose: "REGISTRATION" }),
    });
    const json = await res.json();
    if (!res.ok) return setError(json.error || "Failed to send OTP");
    setFormData(data);
    setStep("otp");
  }

  async function onVerifyOtp() {
    setError("");
    if (!formData) return;

    // Verify OTP
    const verifyRes = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: formData.mobile, otp, purpose: "REGISTRATION" }),
    });
    const verifyJson = await verifyRes.json();
    if (!verifyRes.ok) return setError(verifyJson.error || "Invalid OTP");

    // Register
    const regRes = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const regJson = await regRes.json();
    if (!regRes.ok) return setError(regJson.error || "Registration failed");

    router.push("/portal/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            {step === "form" ? "Register for beOnce EMI portal" : "Enter the OTP sent to your mobile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "form" ? (
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <div className="space-y-1">
                <Label>Mobile Number</Label>
                <Input placeholder="10-digit mobile" {...register("mobile")} />
                {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
              </div>
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input placeholder="Your name" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <Label>Email (optional)</Label>
                <Input type="email" placeholder="email@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" placeholder="Min. 8 characters" {...register("password")} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending OTP..." : "Continue"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account? <Link href="/portal/login" className="hover:underline">Sign in</Link>
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">OTP sent to +91{formData?.mobile}</p>
              <div className="space-y-1">
                <Label>Enter OTP</Label>
                <Input
                  placeholder="6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button className="w-full" onClick={onVerifyOtp} disabled={otp.length !== 6}>
                Verify & Register
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("form")}>
                Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
