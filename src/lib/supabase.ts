import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  created_at: string;
  subscription_plan: 'free' | 'pro';
  credits_remaining: number;
};

export type Proposal = {
  id: string;
  user_id: string;
  job_title: string;
  platform: string;
  generated_proposal: any; // JSON object
  win_probability: number;
  status: 'Draft' | 'Submitted' | 'Hired' | 'Rejected';
  created_at: string;
};

export type Template = {
  id: string;
  user_id: string;
  template_name: string;
  saved_template_content: string;
  created_at: string;
};
