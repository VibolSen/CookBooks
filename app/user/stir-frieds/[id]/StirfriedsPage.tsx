
// app/drinks/[id]/DrinkPageWrapper.tsx
import React from 'react';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import StirFriedPage from "../page" // Import the client component

interface User {
  user_id: string;
  user_name: string;
  // Add other user-related fields here based on your cookie content
}

interface FriedPageWrapperProps {
  params: { id: string }; // id is always a string from the URL parameters
}

const FridePageWrapper = async ({ params }: FriedPageWrapperProps) => {
  const cookieStore = cookies(); // Access cookies
  const userCookie = cookieStore.get('user')?.value; // Fetch the user cookie
  const user: User | null = userCookie ? JSON.parse(userCookie) : null; // Parse the cookie

  // Pass the recipeId and user to the client-side DrinkPage component
  return <StirFriedPage recipeId={params.id} user={user} />;
};

export default FridePageWrapper;
