"use client";
import { useState } from "react";

export default function BookPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          dateTime: formData.get("dateTime"),
        }),
      });
      if (!res.ok) throw new Error("Failed to book appointment");
      setSuccess("Appointment requested. I'll confirm via email soon.");
      (document.getElementById("book-form") as HTMLFormElement)?.reset();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Book an appointment</h1>
      <p className="text-zinc-600 mb-8">Ill review your request and confirm a time by email.</p>
      {success && <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{success}</div>}
      {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <form id="book-form" action={onSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm">Name</label>
          <input name="name" required className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Email</label>
          <input type="email" name="email" required className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Phone</label>
          <input name="phone" className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Preferred date & time</label>
          <input type="datetime-local" name="dateTime" required className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Project details</label>
          <textarea name="message" rows={4} className="rounded-lg border border-zinc-200 p-3 outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <button disabled={submitting} className="h-11 rounded-full bg-black text-white px-6 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50">
          {submitting ? "Submitting..." : "Request appointment"}
        </button>
      </form>
    </main>
  );
}



