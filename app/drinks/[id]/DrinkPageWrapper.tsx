// app/drinks/[id]/DrinkPageWrapper.tsx
import React from 'react';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import DrinkPage from './page'; // Import the client component

const DrinkPageWrapper = async ({ params }) => {
  const cookieStore = cookies(); // Access cookies
  const userCookie = cookieStore.get('user')?.value; // Fetch the user cookie
  const user = userCookie ? JSON.parse(userCookie) : null; // Parse the cookie

  return <DrinkPage recipeId={params.id} user={user} />; // Pass props to the client component
};

export default DrinkPageWrapper;