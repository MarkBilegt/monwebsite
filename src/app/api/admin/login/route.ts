import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!password) return NextResponse.json({ error: "Missing password" }, { status: 400 });
  const expected = process.env.ADMIN_PASSWORD || "admin";
  if (password !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("monweb_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}



