"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import Logo from "@/assets/spot-me-high-resolution-logo.png";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Import icons for mobile toggle

const NavigationCard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full border-2 border-[#FC6F2F]"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-[#FC6F2F]" />
          ) : (
            <Menu size={24} className="text-[#FC6F2F]" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`md:w-[70%] lg:w-[60%] flex justify-center 
                    ${isMobileMenuOpen ? 'fixed inset-0 z-10 bg-white' : 'hidden md:flex'}`}
      >
        <Sidebar className="[&>div]:bg-[#FFA62B] mt-10 ml-[3%] !rounded-3xl shadow-2xl !overflow-hidden w-[90%] md:w-[90%] lg:w-[300px]">
          <Image src={Logo} alt="Logo" className="h-36 w-full mb-2" priority />
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#82C0CC] hover:!border-[#16697A] hover:border-2 hover:!text-[#16697A] hover:text-2xl h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#82C0CC] hover:!border-[#16697A] hover:border-2 hover:!text-[#16697A] hover:text-2xl h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#82C0CC] hover:!border-[#16697A] hover:border-2 hover:!text-[#16697A] hover:text-2xl h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Match
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#82C0CC] hover:!border-[#16697A] hover:border-2 hover:!text-[#16697A] hover:text-2xl h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find A Spotter
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#82C0CC] hover:!border-[#16697A] hover:border-2 hover:!text-[#16697A] hover:text-2xl h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find A Trainer
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </>
  );
};

export default NavigationCard;