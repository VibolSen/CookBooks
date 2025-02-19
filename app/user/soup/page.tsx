import { cookies } from "next/headers";
import SoupPageClient from "@/app/components/SoupPage"; // Import the Client Component
import { getSoupRecipes } from "@/app/actions/soupactions";

export default async function SoupPage() {
  // Await the cookies() function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getSoupRecipes();

  return <SoupPageClient user={user} recipes={recipes} />;
}