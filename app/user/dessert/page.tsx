import { cookies } from "next/headers";
import DessertPageClient from "@/app/components/DessertPage"; // Import the Client Component
import { getDessertRecipes } from "@/app/actions/recipeActions";

export default async function DessertPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getDessertRecipes();

  return <DessertPageClient user={user} recipes={recipes} />;
}
