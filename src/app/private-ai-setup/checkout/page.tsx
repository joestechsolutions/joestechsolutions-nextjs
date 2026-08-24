"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Desktop, Cloud, Spinner, ArrowLeft, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlType = searchParams.get("type") as "local" | "vps" | null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    setupType: (urlType || "local") as "local" | "vps",
    operatingSystem: "",
    specs: "",
    useCases: "",
    // VPS-specific
    domainPreference: "",
    modelSizePreference: "small" as "small" | "medium" | "large",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no type specified
  useEffect(() => {
    if (!urlType) {
      router.push("/private-ai-setup");
    }
  }, [urlType, router]);

  const isVPS = formData.setupType === "vps";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // First, save the intake data
      const intakeResponse = await fetch("/api/intakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status: "pending_payment",
        }),
      });

      if (!intakeResponse.ok) {
        throw new Error("Failed to save your information");
      }

      const intakeData = await intakeResponse.json();

      // Then, create the Stripe checkout session
      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.setupType,
          intakeId: intakeData.id,
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!urlType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div role="status" aria-label="Loading">
          <Spinner aria-hidden="true" className="h-12 w-12 text-primary animate-spin" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* Back Link */}
        <FadeIn>
          <button
            onClick={() => router.push("/private-ai-setup")}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to options</span>
          </button>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground font-mono mb-3">
              Let&apos;s Get Started
            </h1>
            <p className="text-xl text-foreground/70">
              Quick form so I can prepare for your {isVPS ? "VPS" : "local"} setup session.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="bg-card border-foreground/10">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Setup Type Indicator */}
                <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-foreground/10 mb-6">
                  {isVPS ? (
                    <Cloud weight="duotone" className="h-6 w-6 text-primary" />
                  ) : (
                    <Desktop weight="duotone" className="h-6 w-6 text-primary" />
                  )}
                  <div className="flex-1">
                    <span className="text-foreground font-medium block">
                      {isVPS ? "VPS Hosting Setup" : "Local Install"}
                    </span>
                    <span className="text-foreground/50 text-sm">
                      {isVPS ? "$499 setup + $29/mo" : "$199 one-time"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/private-ai-setup")}
                    className="text-primary text-sm hover:underline"
                  >
                    Change
                  </button>
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

                {/* Operating System */}
                <div>
                  <label htmlFor="os" className="block text-sm font-medium text-foreground mb-2">
                    {isVPS ? "VPS Operating System *" : "Your Operating System *"}
                  </label>
                  <select
                    id="os"
                    required
                    value={formData.operatingSystem}
                    onChange={(e) => setFormData({ ...formData, operatingSystem: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  >
                    <option value="">Select OS</option>
                    {isVPS ? (
                      <>
                        <option value="ubuntu-22">Ubuntu 22.04 LTS (Recommended)</option>
                        <option value="ubuntu-20">Ubuntu 20.04 LTS</option>
                        <option value="debian-12">Debian 12</option>
                        <option value="other-linux">Other Linux</option>
                      </>
                    ) : (
                      <>
                        <option value="windows-11">Windows 11</option>
                        <option value="windows-10">Windows 10</option>
                        <option value="macos-sonoma">macOS Sonoma (14)</option>
                        <option value="macos-ventura">macOS Ventura (13)</option>
                        <option value="macos-older">macOS (older)</option>
                        <option value="linux-ubuntu">Linux (Ubuntu/Debian)</option>
                        <option value="linux-other">Linux (Other)</option>
                        <option value="unsure">Not sure</option>
                      </>
                    )}
                  </select>
                </div>

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
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder="e.g., 16GB RAM, Intel i7, no dedicated GPU&#10;(Leave blank if unsure - I'll help figure it out)"
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
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <LockSimple weight="bold" className="h-5 w-5" />
                      Continue to Payment — {isVPS ? "$499 + $29/mo" : "$199"}
                    </span>
                  )}
                </Button>

                <p className="text-center text-foreground/50 text-sm">
                  Secure checkout powered by Stripe
                </p>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div role="status" aria-label="Loading">
            <Spinner aria-hidden="true" className="h-12 w-12 text-primary animate-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
