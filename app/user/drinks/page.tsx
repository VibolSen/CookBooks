import { cookies } from "next/headers";
import DrinksPageClient from "@/app/components/DrinksPage"; // Import the Client Component
import { getDrinkRecipes } from "@/app/actions/drinkActions";

export default async function DrinksPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getDrinkRecipes();

  return <DrinksPageClient user={user} recipes={recipes} />;
}
