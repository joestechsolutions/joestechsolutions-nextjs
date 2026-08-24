"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Warning, Spinner, CalendarCheck, Desktop, Cloud, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";

interface PaymentInfo {
  valid: boolean;
  email?: string;
  name?: string;
  type?: "local" | "vps" | "cloud" | "managed";
  sessionId?: string;
  error?: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const urlType = searchParams.get("type") as "local" | "vps" | "cloud" | "managed" | null;
  const isDemo = searchParams.get("demo") === "true";

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [step, setStep] = useState<"verifying" | "intake" | "scheduling">("verifying");
  const [isSubmitting] = useState(false);
  const [error] = useState<string | null>(null);

  // Form data for intake
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    useCases: "",
    // VPS-specific
    domainPreference: "",
    modelSizePreference: "small" as "small" | "medium" | "large",
    // Local-specific
    specs: "",
  });

  const isVPS = ["vps", "cloud", "managed"].includes(paymentInfo?.type || urlType || "");

  // Verify payment on mount (or bypass in demo mode)
  useEffect(() => {
    let cancelled = false;

    async function runVerification() {
      if (!sessionId) {
        if (!cancelled) setPaymentInfo({ valid: false, error: "No payment session found" });
        return;
      }

      // Demo mode: bypass payment verification
      if (isDemo) {
        if (!cancelled) {
          setPaymentInfo({
            valid: true,
            email: "demo@example.com",
            name: "Demo User",
            type: urlType || "local",
            sessionId: sessionId,
          });
          setStep("intake");
        }
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (cancelled) return;

        if (data.valid) {
          setPaymentInfo(data);
          // Pre-fill email from Stripe if available
          if (data.email) {
            setFormData(prev => ({ ...prev, email: data.email }));
          }
          if (data.name) {
            setFormData(prev => ({ ...prev, name: data.name }));
          }
          setStep("intake");
        } else {
          setPaymentInfo({ valid: false, error: data.error || "Payment verification failed" });
        }
      } catch {
        if (!cancelled) {
          setPaymentInfo({ valid: false, error: "Unable to verify payment" });
        }
      }
    }

    runVerification();

    return () => {
      cancelled = true;
    };
  }, [sessionId, urlType, isDemo]);

  // Load qualification data from session storage
  useEffect(() => {
    const qualifyData = sessionStorage.getItem("privateAIQualify");
    if (qualifyData) {
      try {
        const parsed = JSON.parse(qualifyData);
        // We could use this data if needed
        console.log("Qualification data:", parsed);
      } catch {
        // Ignore parsing errors
      }
    }
  }, []);

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Skip server-side save (Vercel has read-only filesystem)
    // Customer info is already captured by Stripe
    sessionStorage.removeItem("privateAIQualify");
    setStep("scheduling");
  };

  // Loading state
  if (step === "verifying" && !paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div role="status" aria-label="Loading">
            <Spinner aria-hidden="true" className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-foreground/70">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Invalid payment
  if (paymentInfo && !paymentInfo.valid) {
    return (
      <div className="min-h-screen py-24">
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn>
            <Card className="bg-card border-red-500/50">
              <CardHeader className="text-center">
                <Warning weight="duotone" className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
                  Payment Verification Failed
                </h1>
                <p className="text-foreground/70">
                  {paymentInfo.error || "We couldn&apos;t verify your payment. Please try again or contact support."}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={() => (window.location.href = "/private-ai-setup")}
                  className="bg-primary hover:bg-primary/85 text-foreground rounded-none"
                >
                  Return to Private AI Setup
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    );
  }

  // Step 2: Intake Form
  if (step === "intake") {
    return (
      <div className="min-h-screen py-24">
        <div className="mx-auto max-w-2xl px-6">
          {/* Demo Mode Banner */}
          {isDemo && (
            <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-center">
              <p className="text-amber-400 font-medium">
                🧪 Demo Mode — Stripe not configured. This is a UI preview only.
              </p>
            </div>
          )}

          <FadeIn>
            <div className="text-center mb-8">
              <CheckCircle weight="duotone" className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
                Payment Successful!
              </h1>
              <p className="text-foreground/70">
                Now tell me a bit more so I can prepare for your setup.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="bg-card border-foreground/10">
              <CardContent className="p-8">
                <form onSubmit={handleIntakeSubmit} className="space-y-6">
                  {/* Setup Type Indicator */}
                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-foreground/10">
                    {isVPS ? (
                      <Cloud weight="duotone" className="h-6 w-6 text-primary" />
                    ) : (
                      <Desktop weight="duotone" className="h-6 w-6 text-primary" />
                    )}
                    <span className="text-foreground font-medium">
                      {isVPS ? "VPS Hosting Setup" : "Local Install"} — Paid ✓
                    </span>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div role="alert" className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* VPS-specific: Domain Preference */}
                  {isVPS && (
                    <div>
                      <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
                        Preferred Domain (optional)
                      </label>
                      <input
                        type="text"
                        id="domain"
                        value={formData.domainPreference}
                        onChange={(e) => setFormData({ ...formData, domainPreference: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder="myai.yourdomain.com or leave blank for suggestions"
                      />
                      <p className="text-foreground/50 text-sm mt-1">We&apos;ll set up SSL and DNS for you</p>
                    </div>
                  )}

                  {/* VPS-specific: Model Size */}
                  {isVPS && (
                    <fieldset>
                      <legend className="block text-sm font-medium text-foreground mb-3">
                        Expected Model Size
                      </legend>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "small", label: "Small (7B)", desc: "Mistral 7B, Llama3 8B" },
                          { value: "medium", label: "Medium (13B)", desc: "Llama2 13B" },
                          { value: "large", label: "Large (30B+)", desc: "May need upgrade" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-[color,border-color,background-color,box-shadow] text-center ${
                              formData.modelSizePreference === option.value
                                ? "border-primary bg-primary/10"
                                : "border-foreground/10 hover:border-foreground/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name="modelSize"
                              value={option.value}
                              checked={formData.modelSizePreference === option.value}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  modelSizePreference: e.target.value as typeof formData.modelSizePreference,
                                })
                              }
                              className="sr-only"
                            />
                            <span className="text-foreground font-medium text-sm">{option.label}</span>
                            <span className="text-foreground/50 text-xs">{option.desc}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* Specs (only for local) */}
                  {!isVPS && (
                    <div>
                      <label htmlFor="specs" className="block text-sm font-medium text-foreground mb-2">
                        Computer Specs (RAM, CPU, GPU if any)
                      </label>
                      <textarea
                        id="specs"
                        value={formData.specs}
                        onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                        placeholder="e.g., 16GB RAM, Intel i7, no dedicated GPU"
                      />
                    </div>
                  )}

                  {/* Use Cases */}
                  <div>
                    <label htmlFor="useCases" className="block text-sm font-medium text-foreground mb-2">
                      What do you want to use AI for? *
                    </label>
                    <textarea
                      id="useCases"
                      required
                      value={formData.useCases}
                      onChange={(e) => setFormData({ ...formData, useCases: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder="e.g., Writing assistance, coding help, analyzing documents, brainstorming ideas..."
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-foreground text-lg py-6 rounded-none shadow-lg disabled:opacity-50 ${
                      isVPS
                        ? "bg-primary hover:bg-primary/85 shadow-primary/20"
                        : "bg-primary hover:bg-primary/85 shadow-primary/20"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div role="status" aria-label="Loading">
                          <Spinner aria-hidden="true" className="h-5 w-5 animate-spin" />
                          <span className="sr-only">Loading...</span>
                        </div>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Continue to Scheduling
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    );
  }

  // Step 3: Scheduling
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-center">
            <p className="text-amber-400 font-medium">
              🧪 Demo Mode — Stripe not configured. This is a UI preview only.
            </p>
          </div>
        )}

        <FadeIn>
          <Card className="bg-card border-primary/50">
            <CardHeader className="text-center">
              <CheckCircle weight="duotone" className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
                You&apos;re All Set!
              </h1>
              <p className="text-foreground/70">
                One last step — pick a time for your setup call.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Setup Type Confirmation */}
              <div className="flex items-center justify-center gap-3 p-4 bg-background rounded-xl border border-foreground/10">
                {isVPS ? (
                  <Cloud weight="duotone" className="h-6 w-6 text-primary" />
                ) : (
                  <Desktop weight="duotone" className="h-6 w-6 text-primary" />
                )}
                <span className="text-foreground font-medium">
                  {isVPS ? "VPS Hosting Setup" : "Local Install"} — Ready to schedule
                </span>
              </div>

              {/* Calendly Embed Placeholder */}
              <div className="bg-background rounded-xl p-8 text-center border border-foreground/10">
                <CalendarCheck weight="duotone" className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Get in touch →</h2>
                <p className="text-foreground/60 mb-6">
                  Pick a time that works for you. I&apos;ll walk you through everything.
                </p>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-primary hover:bg-primary/85 text-foreground rounded-none px-8">
                    Open Scheduler
                  </Button>
                </a>
              </div>

              {/* What to expect */}
              <div className="bg-background rounded-xl p-6 border border-foreground/10">
                <h3 className="text-foreground font-medium mb-3">What happens next:</h3>
                <ol className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Book a time slot that works for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>I&apos;ll review your setup details before our call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>We&apos;ll do the installation together via screen share</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>You&apos;ll have your private AI running by the end of the call!</span>
                  </li>
                </ol>
              </div>

              <div className="text-center text-foreground/50 text-sm">
                <p>Questions? Email me at <a href="mailto:joe@joestechsolutions.com" className="text-primary hover:underline">joe@joestechsolutions.com</a></p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div role="status" aria-label="Loading">
              <Spinner aria-hidden="true" className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-foreground/70">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
