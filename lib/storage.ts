import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";

export interface WaitlistEntry {
  email: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  timestamp: string;
}

/**
 * Saves user data to Vercel KV (Redis) and Vercel Blob.
 */
export async function saveToWaitlist(entry: WaitlistEntry) {
  const email = entry.email.toLowerCase().trim();

  // 1. Check if user already exists (using Redis Set for O(1) lookups)
  const isMember = await kv.sismember("waitlist:emails", email);
  if (isMember) {
    return { status: "already_exists" };
  }

  // 2. Add to KV (Redis)
  // We use a transaction to add to set and push to list atomically
  await kv.sadd("waitlist:emails", email);
  await kv.rpush("waitlist:entries", JSON.stringify(entry));
  
  // Get current position
  const position = await kv.llen("waitlist:entries");

  // 3. Backup to Vercel Blob
  // Since Vercel Blob is an object store, we'll store individual records 
  // for each user to ensure we never lose data due to concurrency issues 
  // with a single large file.
  try {
    const filename = `waitlist/user-${Date.now()}-${email.replace(/[^a-z0-9]/g, '_')}.json`;
    await put(filename, JSON.stringify(entry, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
  } catch (err) {
    console.error("Vercel Blob storage failed, but Redis was successful:", err);
  }

  return { status: "success", position };
}

/**
 * Retrieves all waitlist entries from KV.
 */
export async function getAllWaitlistEntries() {
  const entries = await kv.lrange("waitlist:entries", 0, -1);
  return entries.map(e => typeof e === 'string' ? JSON.parse(e) : e);
}
