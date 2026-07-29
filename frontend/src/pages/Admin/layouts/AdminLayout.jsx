import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = ({
  children,
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  onQuickAction,
  onSearchChange
}) => {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 font-gaming flex">
      {/* Sidebar */}
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onQuickAction={onQuickAction}
      />

      {/* Main Container */}
      <div 
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ${
          collapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        {/* Navbar */}
        <AdminNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onSearchChange={onSearchChange}
        />

        {/* Viewport for Content */}
        <main className="flex-1 pt-20 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
