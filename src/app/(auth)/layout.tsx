"use client";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main aria-label="Auth Content" className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {children}
    </main>
  );
};
export default AuthLayout;
