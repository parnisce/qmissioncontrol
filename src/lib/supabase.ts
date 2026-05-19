import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase Project URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_znvlgNLPcOj5HJeoVrEwlQ_iOJqG5U3';

export const supabase = createClient(supabaseUrl, supabaseKey);
