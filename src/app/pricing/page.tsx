"use client";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startSubscription(formData: FormData) {
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
        }),
      });
      if (!res.ok) throw new Error("Unable to start subscription");
      setSuccess("Subscription created. I'll reach out to onboard you.");
      (document.getElementById("sub-form") as HTMLFormElement)?.reset();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight mb-4">Yearly package</h1>
      <p className="text-zinc-600 mb-10 max-w-2xl">
        Simple pricing. One yearly package that includes design, development, hosting guidance,
        and ongoing updates. Book an appointment to get started.
      </p>

      <div className="rounded-2xl border border-zinc-200 p-8 grid gap-6">
        <div>
          <span className="text-3xl font-semibold">$1,499</span>
          <span className="text-zinc-500"> / year</span>
        </div>
        <ul className="grid gap-2 text-sm text-zinc-700">
          <li>— Custom minimalist website (up to 6 pages)</li>
          <li>— Responsive design and performance optimization</li>
          <li>— Content updates and small iterations included</li>
          <li>— Priority support</li>
        </ul>
        <div>
          <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800">
            Book an appointment
          </Link>
        </div>
        <div className="border-t border-zinc-200 pt-6">
          <h3 className="font-medium mb-3">Or start your subscription now</h3>
          {success && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{success}</div>}
          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <form id="sub-form" action={startSubscription} className="grid gap-3 sm:grid-cols-3">
            <input name="name" required placeholder="Your name" className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
            <input name="email" type="email" required placeholder="Email" className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
            <input name="company" placeholder="Company (optional)" className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
            <button disabled={submitting} className="h-11 rounded-full bg-black text-white px-6 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 sm:col-span-3">
              {submitting ? "Starting..." : "Start subscription"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


