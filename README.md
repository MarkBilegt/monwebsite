monweb — your web agent
=======================

Minimalist, responsive website service. Clients can book an appointment and start a yearly subscription. Includes an admin panel to manage appointments and subscribers.

Tech
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma + SQLite

Run locally
1. Set env vars in `.env`:
   - `DATABASE_URL="file:./dev.db"` (already set)
   - `ADMIN_PASSWORD=admin` (change in production)
2. Install deps and run:

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open `http://localhost:3000`.

Features
- Landing page with brand and CTAs
- Pricing page with subscription form
- Booking page for appointments
- Admin panel (at `/admin`) with password auth and appointment status updates

Notes
- Payments are not integrated; subscription creation is recorded in the database.
- Update pricing/plan logic in `src/app/api/subscriptions/route.ts`.
