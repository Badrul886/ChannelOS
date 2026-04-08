import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * POST: Handles waitlist signups by storing data only in Supabase.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, utm_source, utm_medium, utm_campaign } = await req.json();

    // 1. Validation
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const source = utm_source?.trim() || "direct";

    // 2. Insert into Supabase
    // We use the ID as the waitlist position.
    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert([
        { 
          email: normalizedEmail, 
          utm_source: source, 
          utm_medium: utm_medium || "", 
          utm_campaign: utm_campaign || "" 
        }
      ])
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") { // Unique constraint violation
        return NextResponse.json(
          { message: "You are already on the waitlist." },
          { status: 409 }
        );
      }
      throw error;
    }

    const position = data.id;

    return NextResponse.json({
      success: true,
      position,
      message: `You're #${position} on the waitlist.`,
    });
  } catch (error) {
    console.error("Supabase Waitlist Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * GET: Admin retrieval of waitlist stats and recent signups from Supabase.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Total count
    const { count: totalCount, error: countError } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // 2. Last 20 members
    const { data: lastMembers, error: membersError } = await supabaseAdmin
      .from("waitlist")
      .select("email, created_at, id")
      .order("created_at", { ascending: false })
      .limit(20);

    // 3. Source breakdown
    const { data: allSources, error: sourcesError } = await supabaseAdmin
      .from("waitlist")
      .select("utm_source");

    const sources: Record<string, number> = {};
    if (allSources) {
      allSources.forEach((row) => {
        const src = row.utm_source || "direct";
        sources[src] = (sources[src] || 0) + 1;
      });
    }

    if (countError || membersError || sourcesError) throw countError || membersError || sourcesError;

    return NextResponse.json({
      totalCount: totalCount || 0,
      lastMembers: lastMembers || [],
      sources,
    });
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
