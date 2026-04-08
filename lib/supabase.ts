import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Standard Supabase client for general use.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin client with service role access for operations that bypass RLS.
 * Useful for incrementing waitlist positions or fetching all data.
 */
export const supabaseAdmin = supabaseServiceRole 
  ? createClient(supabaseUrl, supabaseServiceRole)
  : supabase;
