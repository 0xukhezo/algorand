import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

const supabaseUrl = "https://cpjmxwptbjqcqrpruyvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwam14d3B0YmpxY3FycHJ1eXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMjAyOTUsImV4cCI6MjAxNjU5NjI5NX0.A9ydFrFcBQ6rLvpI00Pb3IHDGDklLAWU4CSWQyov_uo";

export const supabase = createClient(supabaseUrl, supabaseKey);
