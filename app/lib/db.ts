import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be set');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection to Supabase
async function testConnection() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);
  if (error) {
    console.error("Connection test failed:", error);
  } else {
    console.log("Connection test succeeded:", data);
  }
}

// Call the test function
testConnection();

export { supabase };