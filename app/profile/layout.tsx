import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {
  let user = null;

  try {
    const cookieStore = await cookies(); // Await the cookies() function
    const userCookie = cookieStore.get("user")?.value;
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }

  return (
    <div>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}


// import ProfileUser from "../components/ProfileUser";

// export default function Layout () {
//     return (
//         <div>

//         </div>
//     );

// }
