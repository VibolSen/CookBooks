import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Edit from "../components/Edit";

export default async function EditProfile() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      {/* Pass the user data to the Edit component */}
      <Edit user={user} />
      <Footer />
    </div>
  );
}
