"use client";
import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  dateTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function login() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      setAuthed(true);
      await loadOverview();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadOverview() {
    const res = await fetch("/api/admin/overview");
    if (res.ok) {
      const data = await res.json();
      setAppointments(data.appointments ?? []);
    }
  }

  async function updateStatus(id: string, status: Appointment["status"]) {
    await fetch(`/api/admin/appointments/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadOverview();
  }

  useEffect(() => {
    // Try to fetch overview to detect existing cookie
    (async () => {
      const res = await fetch("/api/admin/overview");
      if (res.ok) {
        setAuthed(true);
        const data = await res.json();
        setAppointments(data.appointments ?? []);
      }
    })();
  }, []);

  if (!authed) {
    return (
      <main className="mx-auto max-w-sm px-6 py-24">
        <h1 className="text-2xl font-semibold mb-6">Admin login</h1>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
        <div className="grid gap-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-lg border border-zinc-200 px-3 outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            onClick={login}
            disabled={loading || !password}
            className="h-11 rounded-full bg-black text-white px-6 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Admin</h1>
      <section className="grid gap-4">
        <h2 className="text-xl font-medium">Appointments</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="text-left p-3">When</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-t border-zinc-200">
                  <td className="p-3">{new Date(a.dateTime).toLocaleString()}</td>
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(a.id, "CONFIRMED")} className="px-3 py-1 rounded-full border border-zinc-200 hover:bg-zinc-50">
                        Confirm
                      </button>
                      <button onClick={() => updateStatus(a.id, "CANCELLED")} className="px-3 py-1 rounded-full border border-zinc-200 hover:bg-zinc-50">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}



