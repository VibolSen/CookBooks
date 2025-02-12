import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// UserPage component will be an async function to handle cookie retrieval
export default async function UserPage({ children }: { children: React.ReactNode }) {
  // Await cookies() to get the cookie store properly
  const cookieStore = await cookies(); // Ensure you're awaiting it
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      {/* Other components go here */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
