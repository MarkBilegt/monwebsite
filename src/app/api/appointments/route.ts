import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, dateTime } = body ?? {};
    if (!name || !email || !dateTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const created = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        message,
        dateTime: new Date(dateTime),
      },
    });
    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  // For debugging/basic listing (non-admin); returns recent available slots
  const items = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json({ items });
}



