import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BannerSwiper from "./components/slider";

export default async function HomePage() {
  // Await cookies() to get the cookie store properly
  const cookieStore = await cookies(); // Ensure you're awaiting it
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      {/* Other components go here */}
      <div className="max-w-[1400px] m-auto">
      <BannerSwiper />
      </div>
      <Footer />
    </div>
  );
}

