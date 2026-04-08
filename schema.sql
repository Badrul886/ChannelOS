-- ChannelOS Waitlist Schema
-- Run this in your Supabase SQL Editor to set up the necessary table.

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    -- Auto-incrementing ID (used as the waitlist position)
    id BIGSERIAL PRIMARY KEY,
    
    -- User's email (unique to avoid duplicates)
    email TEXT UNIQUE NOT NULL,
    
    -- Marketing attribution (captured from UTM params)
    utm_source TEXT DEFAULT 'direct',
    utm_medium TEXT DEFAULT '',
    utm_campaign TEXT DEFAULT '',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
-- By default, no one can read/write until we add policies.
-- However, since the API uses the Service Role Key (Admin), 
-- it bypasses RLS for backend operations.
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- If you ever want to allow public signup via the browser (not through the API):
-- CREATE POLICY "Allow public signups" ON waitlist FOR INSERT WITH CHECK (true);

-- Helpful indexing
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
