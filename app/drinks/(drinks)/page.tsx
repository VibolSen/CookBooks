import { cookies } from 'next/headers';
import DrinksPageClient from '@/app/components/DrinksPage'; // Import the Client Component
import { getDrinkRecipes } from '@/app/actions/drinkActions';

export default async function DrinksPage() {
  // Fetch user data from cookies in the Server Component
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch drink recipes
  const recipes = await getDrinkRecipes();

  // Pass user and recipes as props to the Client Component
  return <DrinksPageClient user={user} recipes={recipes} />;
}