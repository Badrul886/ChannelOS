import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { ratelimit } from "@/lib/ratelimit";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * POST: Handles waitlist signups.
 * Stores data in Vercel KV (Redis) and creates a redundant backup in Vercel Blob.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 2. Validation
    const body = await req.json();
    const { email, utm_source, utm_medium, utm_campaign } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const source = utm_source?.trim() || "direct";

    // 3. Duplicate check using Vercel KV Set
    const exists = await kv.sismember("waitlist:emails", normalizedEmail);
    if (exists) {
      return NextResponse.json(
        { message: "You are already on the waitlist." },
        { status: 409 }
      );
    }

    // 4. Position and Timestamp
    const position = await kv.incr("waitlist:counter");
    const timestamp = new Date().toISOString();
    const unixTimestamp = Math.floor(Date.now() / 1000);

    const signupEntry = {
      email: normalizedEmail,
      utm_source: source,
      utm_medium: utm_medium || "",
      utm_campaign: utm_campaign || "",
      timestamp,
      position,
    };

    // 5. KV Storage (Redis)
    const pipeline = kv.pipeline();
    pipeline.hset(`waitlist:entry:${normalizedEmail}`, signupEntry);
    pipeline.sadd("waitlist:emails", normalizedEmail);
    pipeline.zadd("waitlist:timeline", { score: unixTimestamp, member: normalizedEmail });
    pipeline.hincrby("waitlist:sources", source, 1);
    await pipeline.exec();

    // 6. Vercel Blob Redundant Backup
    try {
      const blobPath = `waitlist/user-${normalizedEmail.replace(/[^a-z0-9]/g, '_')}-${position}.json`;
      await put(blobPath, JSON.stringify(signupEntry, null, 2), {
        access: 'public',
        contentType: 'application/json',
      });
    } catch (blobError) {
      console.error("Vercel Blob failed (Redis succeeded):", blobError);
    }

    return NextResponse.json({
      success: true,
      position,
      message: `You're #${position} on the waitlist.`,
    });
  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * GET: Admin retrieval of waitlist stats and recent signups.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalCount, sources, lastMembers] = await Promise.all([
      kv.get("waitlist:counter"),
      kv.hgetall("waitlist:sources"),
      kv.zrange("waitlist:timeline", 0, 19, { rev: true }),
    ]);

    return NextResponse.json({
      totalCount: totalCount ? parseInt(totalCount as string) : 0,
      sources: sources || {},
      lastMembers: lastMembers || [],
    });
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
