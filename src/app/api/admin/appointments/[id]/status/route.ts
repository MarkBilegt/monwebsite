import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const c = cookies();
  if (c.get("monweb_admin")?.value !== "1") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await request.json();
  if (!status) return NextResponse.json({ error: "Missing status" }, { status: 400 });

  await prisma.appointment.update({ where: { id: params.id }, data: { status } });
  return NextResponse.json({ ok: true });
}



