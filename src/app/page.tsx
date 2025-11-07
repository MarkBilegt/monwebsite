import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">monweb</Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/pricing" className="hover:opacity-70">Pricing</Link>
            <Link href="/book" className="hover:opacity-70">Book</Link>
            <Link href="/admin" className="hover:opacity-70">Admin</Link>
          </nav>
          <Link href="/book" className="sm:hidden text-sm underline">Book</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-24 sm:py-32 grid gap-10">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
            Your website, designed and built for you.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            monweb is your web agent. Choose a yearly package and book an appointment.
            I handle design, development, and updates — minimal, fast, and responsive.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800">
              Book an appointment
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium hover:bg-zinc-50">
              View yearly package
            </Link>
          </div>
        </section>

        <section className="py-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="font-medium mb-2">Minimalist</h3>
            <p className="text-zinc-600 text-sm">Clean design that highlights your brand and message.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="font-medium mb-2">Responsive</h3>
            <p className="text-zinc-600 text-sm">Looks perfect on phones, tablets, and desktops.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="font-medium mb-2">Done-for-you</h3>
            <p className="text-zinc-600 text-sm">I build and maintain it under a simple yearly package.</p>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} monweb</span>
          <Link href="/book" className="hover:opacity-70">Get started</Link>
        </div>
      </footer>
    </div>
  );
}
