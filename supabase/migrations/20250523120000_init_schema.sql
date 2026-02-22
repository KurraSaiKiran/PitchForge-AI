/*
  # Initial Schema for PitchPro AI
  
  ## Query Description: 
  This migration sets up the core database structure for the PitchPro AI application.
  It includes tables for Users, Proposals, Analytics, and Templates.
  It also sets up Row Level Security (RLS) to ensure data privacy.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "High"
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - public.users: Extends auth.users with app-specific data (credits, plan).
  - public.proposals: Stores generated proposals.
  - public.analytics: Stores analytics data linked to proposals.
  - public.templates: Stores user-saved templates.
  
  ## Security Implications:
  - RLS Enabled on all tables.
  - Users can only access their own data.
*/

-- Create Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro')),
  credits_remaining INTEGER DEFAULT 5
);

-- Enable RLS for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create public.users on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, subscription_plan, credits_remaining)
  VALUES (new.id, new.email, 'free', 5);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid duplication errors on re-runs
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Create Proposals table
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  job_title TEXT NOT NULL,
  platform TEXT NOT NULL,
  generated_proposal TEXT,
  win_probability INTEGER,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Submitted', 'Hired', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  content_json JSONB -- To store structured parts like hook, subject lines etc separately if needed
);

-- Enable RLS for proposals
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Policies for proposals
CREATE POLICY "Users can CRUD their own proposals"
  ON public.proposals FOR ALL
  USING (auth.uid() = user_id);


-- Create Analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES public.proposals(id) ON DELETE CASCADE NOT NULL,
  viewed BOOLEAN DEFAULT FALSE,
  response_received BOOLEAN DEFAULT FALSE,
  hired BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for analytics
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Policies for analytics
-- Users can access analytics if they own the related proposal
CREATE POLICY "Users can view analytics for their proposals"
  ON public.analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.proposals
      WHERE public.proposals.id = public.analytics.proposal_id
      AND public.proposals.user_id = auth.uid()
    )
  );
  
CREATE POLICY "Users can update analytics for their proposals"
  ON public.analytics FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.proposals
      WHERE public.proposals.id = public.analytics.proposal_id
      AND public.proposals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert analytics for their proposals"
  ON public.analytics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.proposals
      WHERE public.proposals.id = public.analytics.proposal_id
      AND public.proposals.user_id = auth.uid()
    )
  );


-- Create Templates table
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  template_name TEXT NOT NULL,
  saved_template_content TEXT NOT NULL,
  type TEXT DEFAULT 'custom' CHECK (type IN ('custom', 'hook', 'signature')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for templates
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Policies for templates
CREATE POLICY "Users can CRUD their own templates"
  ON public.templates FOR ALL
  USING (auth.uid() = user_id);
