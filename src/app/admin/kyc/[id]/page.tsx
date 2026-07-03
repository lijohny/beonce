"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Eye, Loader2 } from "lucide-react";

type KycData = {
  id: number; status: string; aadhaarNumber: string; panNumber: string;
  bankAccount: string; ifscCode: string; bankVerified: boolean;
  refContact: string | null; fatherContact: string | null; motherContact: string | null;
  agreementSigned: boolean; rejectionReason: string | null; createdAt: string;
  user: { id: number; name: string | null; mobile: string; email: string | null };
};
type DocUrls = { panDoc: string | null; selfie: string | null; titleDeed: string | null; cheque: string | null };

export default function KycReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [kyc, setKyc] = useState<KycData | null>(null);
  const [docUrls, setDocUrls] = useState<DocUrls>({ panDoc: null, selfie: null, titleDeed: null, cheque: null });
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/kyc/${id}`).then((r) => r.json()).then((d) => {
      setKyc(d.kyc); setDocUrls(d.docUrls);
    });
  }, [id]);

  async function action(act: "APPROVE" | "REJECT" | "UNDER_REVIEW") {
    if (act === "REJECT" && !reason.trim()) { setError("Rejection reason is required"); return; }
    setError(""); setLoading(true);
    const res = await fetch(`/api/admin/kyc/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: act, reason }),
    });
    setLoading(false);
    if (res.ok) router.push("/admin/kyc");
    else setError("Action failed. Try again.");
  }

  const statusVariant = (s: string) =>
    s === "APPROVED" ? "default" : s === "REJECTED" ? "destructive" : "secondary";

  if (!kyc) return <div className="animate-pulse text-muted-foreground p-8">Loading KYC record…</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">KYC Review</h1>
          <p className="text-sm text-muted-foreground">Submitted {new Date(kyc.createdAt).toLocaleDateString("en-IN")}</p>
        </div>
        <Badge variant={statusVariant(kyc.status) as never} className="text-sm px-3 py-1">{kyc.status}</Badge>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Customer Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-muted-foreground">Name</p><p className="font-medium">{kyc.user.name || "—"}</p></div>
          <div><p className="text-muted-foreground">Mobile</p><p className="font-medium font-mono">{kyc.user.mobile}</p></div>
          <div><p className="text-muted-foreground">Aadhaar</p><p className="font-medium font-mono">{kyc.aadhaarNumber}</p></div>
          <div><p className="text-muted-foreground">PAN</p><p className="font-medium font-mono">{kyc.panNumber}</p></div>
          <div><p className="text-muted-foreground">Bank Account</p><p className="font-medium font-mono">{kyc.bankAccount}</p></div>
          <div><p className="text-muted-foreground">IFSC</p><p className="font-medium font-mono">{kyc.ifscCode}</p></div>
          {kyc.fatherContact && <div><p className="text-muted-foreground">Father</p><p className="font-medium">{kyc.fatherContact}</p></div>}
          {kyc.motherContact && <div><p className="text-muted-foreground">Mother</p><p className="font-medium">{kyc.motherContact}</p></div>}
          {kyc.refContact && <div><p className="text-muted-foreground">Reference</p><p className="font-medium">{kyc.refContact}</p></div>}
          <div><p className="text-muted-foreground">Agreement</p><p className="font-medium">{kyc.agreementSigned ? "✓ Signed" : "Not signed"}</p></div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Documents</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {([
            ["PAN Card", docUrls.panDoc], ["Selfie", docUrls.selfie],
            ["Title Deed", docUrls.titleDeed], ["Cheque", docUrls.cheque],
          ] as [string, string | null][]).map(([label, url]) => (
            <div key={label} className={`border rounded-lg p-3 flex items-center justify-between text-sm ${!url ? "opacity-40" : ""}`}>
              <span>{label}</span>
              {url ? (
                <Button size="sm" variant="outline" className="gap-1" onClick={() => setPreviewUrl(url)}>
                  <Eye className="h-3 w-3" /> View
                </Button>
              ) : <span className="text-xs text-muted-foreground">Not uploaded</span>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Image Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="ghost" className="absolute top-2 right-2 z-10" onClick={() => setPreviewUrl(null)}>✕</Button>
            <Image src={previewUrl} alt="Document" width={800} height={600} className="object-contain max-h-[85vh]" unoptimized />
          </div>
        </div>
      )}

      {/* Actions */}
      {kyc.status !== "APPROVED" && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Review Decision</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Rejection Reason <span className="text-muted-foreground text-xs">(required if rejecting)</span></Label>
              <Textarea placeholder="Explain reason for rejection…" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {kyc.rejectionReason && (
              <p className="text-sm text-destructive border border-destructive/30 rounded p-2">
                Previous rejection: {kyc.rejectionReason}
              </p>
            )}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700" onClick={() => action("APPROVE")} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Approve
              </Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={() => action("UNDER_REVIEW")} disabled={loading}>
                Mark Under Review
              </Button>
              <Button variant="destructive" className="flex-1 gap-2" onClick={() => action("REJECT")} disabled={loading}>
                <XCircle className="h-4 w-4" /> Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {kyc.status === "APPROVED" && (
        <Card className="border-green-500">
          <CardContent className="pt-4 flex items-center gap-3 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">KYC Approved — Customer is active</span>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
