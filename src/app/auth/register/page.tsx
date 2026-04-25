"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setLoading(true);
    // Auth logic will go here
    setLoading(false);
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
            "Join thousands of educators who trust ExamApp to deliver fair,
            efficient, and modern examinations."
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

          <div className="mb-8">
            <h1 className="font-mono text-2xl font-semibold text-[var(--gray-900)] mb-1">
              Create account
            </h1>
            <p className="font-mono text-sm text-[var(--gray-500)]">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
                required
              />
            </div>

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

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="font-mono text-xs text-[var(--red-500)] mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading || (!!confirmPassword && password !== confirmPassword)}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center font-mono text-sm text-[var(--gray-500)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--blue-600)] hover:text-[var(--blue-700)] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
