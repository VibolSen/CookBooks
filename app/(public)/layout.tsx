"use client";

import React, { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useSession } from "next-auth/react";

interface UserLayoutProps {
 children: ReactNode;
}

const PublicLayout = ({ children }: UserLayoutProps) => {
 const { data: session } = useSession();

 const user = session?.user
 ? {
 user_id: (session.user as any).id || "",
 user_name: session.user.name || "User",
 email: session.user.email || "",
 image_url: session.user.image || "/default-avatar.png",
 }
 : null;

 return (
 <div className="flex flex-col min-h-screen bg-gray-100">
 <header>
 <Navbar user={user} />
 </header>
 <main aria-label="Main Content" className="flex-1">
 {children}
 </main>
 <footer className="mt-auto">
 <Footer />
 </footer>
 </div>
 );
};

export default PublicLayout;
