import React, { ReactNode } from "react"; // Importing ReactNode for children type

interface AdminLayoutProps {
  children: ReactNode; // This represents the page content that will be passed into the layout
}

const Layout: React.FC<AdminLayoutProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
