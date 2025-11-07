import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company } = body ?? {};
    if (!name || !email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    let client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
      client = await prisma.client.create({ data: { name, email, company } });
    }
    const start = new Date();
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);

    const subscription = await prisma.subscription.create({
      data: {
        clientId: client.id,
        plan: "YEARLY",
        priceCents: 149900,
        startDate: start,
        endDate: end,
        status: "ACTIVE",
      },
    });
    return NextResponse.json({ id: subscription.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



