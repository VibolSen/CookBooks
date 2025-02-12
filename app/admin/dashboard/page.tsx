import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/db";
import Link from "next/link";
import Image from "next/image";

// Fetch dashboard stats
async function getDashboardStats() {
  try {
    const [{ count: userCount }, { count: recipeCount }, { count: eventCount }, { count: categoryCount }] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact' }),
      supabase.from('recipes').select('*', { count: 'exact' }),
      supabase.from('events').select('*', { count: 'exact' }),
      supabase.from('categories').select('*', { count: 'exact' }),
    ]);

    return {
      userCount,
      recipeCount,
      eventCount,
      categoryCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { userCount: 0, recipeCount: 0, eventCount: 0, categoryCount: 0 };
  }
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    redirect("/login");
  }

  let user;
  try {
    user = JSON.parse(userCookie.value);
  } catch (e) {
    console.error("Error parsing user cookie:", e);
    redirect("/login");
  }

  if (user.role !== "Admin") {
    redirect("/");
  }

  const { userCount, recipeCount, eventCount, categoryCount } = await getDashboardStats();

  const sidebarLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/users", label: "Users", icon: "people" },
    { href: "/admin/recipes", label: "Recipes", icon: "restaurant_menu" },
    { href: "/admin/events", label: "Events", icon: "event" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <Image
            src="/logo.png"
            alt="CookBook Logo"
            width={90}
            height={90}
            className="mx-auto"
          />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {sidebarLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/admin/dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg w-full max-w-md px-4 py-2"
          />
          <div className="flex items-center space-x-4">
            <Image
              src="/profile.png"
              alt="Admin Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        {/* Greeting and Action Buttons */}
        <section
          className="mb-8 bg-cover bg-center rounded-lg p-8 h-[250px]"
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          <h1 className="text-4xl font-semibold text-black mb-2">
            Hello, {user.name}
          </h1>
          <p className="text-black mb-4">
            Get{" "}
            <span className="text-orange-400 font-medium text-lg">
              FREE delivery
            </span>{" "}
            on every weekend.
          </p>
          <div className="flex space-x-4 my-12">
            <Link
              href="/post-event"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Post Events
            </Link>
            <Link
              href="/events"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              Check Events
            </Link>
          </div>
        </section>

        {/* Dashboard Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-medium">Users</h3>
              <p className="text-3xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-medium">Recipes</h3>
              <p className="text-3xl font-bold">{recipeCount}</p>
            </div>
          </div>
        </section>

        {/* Recipe Categories and Occasion Sections */}
        <div className="flex items-center bg-gray-100 justify-evenly">
          {/* Recipe Categories Section */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-4">Recipe Category</h2>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 overflow-x-auto">
                {["Soup", "Stir Fried", "Drinks", "Desserts"].map(
                  (category) => (
                    <div
                      key={category}
                      className="bg-white rounded-lg shadow-md p-4 text-center"
                    >
                      <Image
                        src="/soup.png"
                        alt={category}
                        width={48}
                        height={48}
                        className="mx-auto mb-2"
                      />
                      <h3 className="font-medium">{category}</h3>
                      <Link
                        href={`/recipes?category=${category.toLowerCase()}`}
                        className="text-blue-600 hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Occasion Section */}
          <section className="w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4">Occasion</h2>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 overflow-x-auto">
                {["Birthday", "Pchum Ben", "Luna New Year"].map((occasion) => (
                  <div
                    key={occasion}
                    className="bg-white rounded-lg shadow-md p-4 text-center"
                  >
                    <Image
                      src="/drinks.png"
                      alt={occasion}
                      width={48}
                      height={48}
                      className="mx-auto mb-2"
                    />
                    <h3 className="font-medium">{occasion}</h3>
                    <Link
                      href={`/recipes?occasion=${occasion.toLowerCase()}`}
                      className="text-blue-600 hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
