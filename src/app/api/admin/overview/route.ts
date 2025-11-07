import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

function isAuthed() {
  const c = cookies();
  return c.get("monweb_admin")?.value === "1";
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [appointments, clients, subscriptions] = await Promise.all([
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.client.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.subscription.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  return NextResponse.json({ appointments, clients, subscriptions });
}



