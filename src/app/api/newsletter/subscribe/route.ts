import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Signups land in Supabase (public.newsletter_subscribers). This used to write
// a JSON file under process.cwd(), which fails on Vercel's read-only
// filesystem — every production signup was lost.

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 64) : null;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from("newsletter_subscribers")
      .insert({ email, source });

    // 23505 = unique violation on lower(email): already on the list, which is
    // a success from the subscriber's point of view.
    if (error?.code === "23505") {
      return NextResponse.json({ success: true, message: "You're already subscribed." });
    }
    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, message: "You're in." });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
