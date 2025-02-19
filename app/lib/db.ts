import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ ERROR: Supabase URL and Key must be set in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // 🔹 Ensures session persistence across page reloads
    autoRefreshToken: true, // 🔹 Refreshes the session automatically when needed
    detectSessionInUrl: true, // 🔹 Detects OAuth sign-in sessions
  },
});

// ✅ Test Supabase Connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) {
      console.error("❌ Connection test failed:", error);
    } else {
      console.log("✅ Supabase Connection Successful:", data);
    }
  } catch (err) {
    console.error("❌ Unexpected error while testing connection:", err);
  }
}

// Call the test function only in development
if (process.env.NODE_ENV === "development") {
  testConnection();
}
