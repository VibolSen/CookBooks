"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AdminHeaderProps {
  onMobileMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  isSearchFocused: boolean;
  adminName: string | null;
  adminImageUrl: string | null;
  adminEmail: string | null;
  onLogoutClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sidebarCollapsed: boolean;
  userId: string | null;
  notifications?: Notification[];
  unreadCount?: number;
  onNotificationsClick?: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isLayoutReady: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMobileMenuClick,
  adminName,
  adminImageUrl,
  adminEmail,
  onLogoutClick,
  unreadCount = 0,
  onNotificationsClick = () => {},
  userId,
}) => {
  const pathname = usePathname();

  const getInitials = (email: string | null, name: string | null) => {
    if (name) {
      const parts = name.split(" ");
      return parts.map((part) => part.charAt(0).toUpperCase()).join("");
    }
    if (!email) return "";
    const username = email.split("@")[0];
    return username.charAt(0).toUpperCase();
  };

  const imageUrl = adminImageUrl?.startsWith("http") ? adminImageUrl : null;
  const initials = getInitials(adminEmail, adminName);

  // Dynamic breadcrumbs based on the router path
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 min-h-[72px]">
      {/* Left side: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMobileMenuClick} 
          className="md:hidden p-1.5 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-400 font-medium">
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
            return (
              <React.Fragment key={segment}>
                {index > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
                <span 
                  className={
                    isLast 
                      ? "text-gray-700 dark:text-white font-semibold" 
                      : "text-gray-400 dark:text-gray-500"
                  }
                >
                  {formattedSegment}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right side: Notifications & Profile Dropdown */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-100 dark:bg-gray-700 hidden sm:block"></div>

        {/* Profile Dropdown */}
        {userId && (
          <ProfileDropdown
            adminImageUrl={imageUrl}
            adminName={adminName}
            adminEmail={adminEmail}
            onLogoutClick={onLogoutClick}
            initials={initials}
          />
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
