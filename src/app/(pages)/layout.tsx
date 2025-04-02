"use client";
import NavigationCard from '@/components/NavigationCard';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#EDE7E3]">
    
      <div className="w-full md:w-[40%] lg:w-[35%] md:fixed md:top-0 md:left-0 md:bottom-0 z-10">
        <NavigationCard />
      </div>
      
      
      <div className="w-full md:ml-[40%] lg:ml-[35%]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
