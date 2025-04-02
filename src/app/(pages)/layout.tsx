"use client";
import NavigationCard from '@/components/NavigationCard';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[]">
      {/* Sidebar - Now handled as sticky in NavigationCard component */}
      <NavigationCard />
      
      {/* Main Content */}
      <div className="w-full md:w-[75%] lg:w-[80%] min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;

