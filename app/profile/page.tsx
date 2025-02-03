import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      {/* Other components go here */}
      <Profile />
      <Footer />
    </div>
  );
}
