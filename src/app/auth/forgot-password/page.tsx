"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Auth logic will go here
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--gray-900)] flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <Image src="/Logo.png" alt="Logo" width={36} height={36} />
          <span className="font-mono text-white text-lg font-semibold tracking-tight">
            ExamApp
          </span>
        </div>
        <div>
          <blockquote className="text-white/80 font-mono text-base leading-relaxed max-w-sm">
            "Your security matters. Reset your password anytime and get back
            to what matters most — teaching and learning."
          </blockquote>
          <p className="mt-4 text-white/40 font-mono text-sm">ExamApp Team</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <Image src="/Logo.png" alt="Logo" width={28} height={28} />
            <span className="font-mono text-[var(--gray-900)] text-base font-semibold">
              ExamApp
            </span>
          </div>

          {!submitted ? (
            <>
              <div className="mb-8">
                <h1 className="font-mono text-2xl font-semibold text-[var(--gray-900)] mb-1">
                  Forgot password?
                </h1>
                <p className="font-mono text-sm text-[var(--gray-500)]">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={loading}
                >
                  {loading ? "Sending link..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="size-14 bg-[var(--emerald-50)] flex items-center justify-center">
                  <svg
                    className="size-7 text-[var(--emerald-500)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="font-mono text-xl font-semibold text-[var(--gray-900)] mb-2">
                Check your email
              </h2>
              <p className="font-mono text-sm text-[var(--gray-500)] mb-6">
                We sent a password reset link to{" "}
                <span className="text-[var(--gray-900)] font-medium">{email}</span>
              </p>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                Resend link
              </Button>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 font-mono text-sm text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
