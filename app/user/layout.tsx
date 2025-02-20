import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default async function UserPage({ children }: { children: React.ReactNode }) {
  // ✅ Await cookies() before using it
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
