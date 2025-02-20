import { cookies } from "next/headers";
import FriedPageClient from "../../components/friedPage"; // Import the Client Component
import { getfriedRecipes } from "@/app/actions/recipeActions";

export default async function StirFriedPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getfriedRecipes();

  return <FriedPageClient user={user} recipes={recipes} />;
}