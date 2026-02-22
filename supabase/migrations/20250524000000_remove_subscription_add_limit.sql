-- Remove subscription system and add 5-proposal lifetime limit

-- Drop subscription-related columns from users table
ALTER TABLE public.users DROP COLUMN IF EXISTS subscription_plan;
ALTER TABLE public.users DROP COLUMN IF EXISTS credits_remaining;

-- Add proposal_count column to track lifetime proposals
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS proposal_count INTEGER DEFAULT 0;

-- Update the trigger function to initialize proposal_count instead of credits
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, proposal_count)
  VALUES (new.id, new.email, 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment proposal count
CREATE OR REPLACE FUNCTION public.increment_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET proposal_count = proposal_count + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-increment proposal count on insert
DROP TRIGGER IF EXISTS on_proposal_created ON public.proposals;
CREATE TRIGGER on_proposal_created
  AFTER INSERT ON public.proposals
  FOR EACH ROW EXECUTE FUNCTION public.increment_proposal_count();
