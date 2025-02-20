import { cookies } from "next/headers";
import OccasionPageClient from "@/app/components/OccasionPage"; // Import the Client Component
import { getOccasionRecipes } from "@/app/actions/recipeActions";

export default async function OccasionPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch occasion recipes
  const recipes = await getOccasionRecipes();

  return <OccasionPageClient user={user} recipes={recipes} />;
}
