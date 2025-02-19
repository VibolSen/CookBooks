import { cookies } from "next/headers";
import OccasionPageClient from "@/app/components/OccasionPage"; // Import the Client Component
import { getOccasionRecipes } from "@/app/actions/recipeActions";

export default async function DrinksPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getOccasionRecipes();

  return <OccasionPageClient user={user} recipes={recipes} />;
}
