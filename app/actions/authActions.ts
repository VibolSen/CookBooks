// "use server";

// import { supabase } from "@/app/lib/db";

// export async function getAuthenticatedUser() {
//   const { data, error } = await supabase.auth.getSession(); // Correct way to get session

//   if (error || !data.session) {
//     console.error("Authentication error:", error?.message || "No session found");
//     return null;
//   }

//   return data.session.user; // Returns authenticated user object
// }
