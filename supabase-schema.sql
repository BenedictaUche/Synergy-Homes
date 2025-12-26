-- Supabase Database Schema for Synergy Homes
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Table for investment interest submissions
CREATE TABLE IF NOT EXISTS investment_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount NUMERIC,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for prospectus download requests
CREATE TABLE IF NOT EXISTS prospectus_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_name TEXT NOT NULL,
  investment_slug TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for waitlist registrations
CREATE TABLE IF NOT EXISTS waitlist_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_investment_interests_email ON investment_interests(email);
CREATE INDEX IF NOT EXISTS idx_investment_interests_created_at ON investment_interests(created_at);
CREATE INDEX IF NOT EXISTS idx_prospectus_requests_email ON prospectus_requests(user_email);
CREATE INDEX IF NOT EXISTS idx_prospectus_requests_slug ON prospectus_requests(investment_slug);
CREATE INDEX IF NOT EXISTS idx_waitlist_registrations_email ON waitlist_registrations(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_registrations_created_at ON waitlist_registrations(created_at);

-- Enable Row Level Security (RLS) - adjust policies based on your needs
ALTER TABLE investment_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospectus_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role to insert (for API routes)
-- Note: These policies allow inserts from authenticated service role
-- Adjust based on your security requirements

-- Policy for investment_interests
CREATE POLICY "Allow service role to insert investment interests"
  ON investment_interests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for prospectus_requests
CREATE POLICY "Allow service role to insert prospectus requests"
  ON prospectus_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for waitlist_registrations
CREATE POLICY "Allow service role to insert waitlist registrations"
  ON waitlist_registrations
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Optional: Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_investment_interests_updated_at
  BEFORE UPDATE ON investment_interests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prospectus_requests_updated_at
  BEFORE UPDATE ON prospectus_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_registrations_updated_at
  BEFORE UPDATE ON waitlist_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
