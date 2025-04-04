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
import MessageImage from "@/assets/image-removebg-preview.png"
import { useRouter } from "next/navigation";

const NavigationCard = () => {
    const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenMessages = () => {
    router.push('/DirectMessages');
  }

  const handleOpenMatch = () => {
    router.push('/Match');
  }

  const handleOpenProfile = () => {
    router.push('/Profile');
  }

  return (
    <>
      {/* Mobile Menu Toggle Button - Only visible on small screens */}

      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full bg-[#FFE9D1] border-2 border-[#FC6F2F]"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-[#FC6F2F]" />
          ) : (
            <Menu size={24} className="text-[#FC6F2F]" />
          )}
        </button>
      </div>

      {/* Sidebar - Full screen on mobile when open, sticky full-height on desktop */}
      <div
        className={`md:sticky md:top-0 md:left-0 md:h-screen md:w-[25%] lg:w-[20%]
                    flex justify-center items-stretch
                    ${isMobileMenuOpen ? 'fixed inset-0 z-10 bg-white' : 'hidden md:flex'}`}
      >
        <Sidebar className="[&>div]:bg-[#FFE9D1] !rounded-r-3xl shadow-2xl !overflow-hidden w-full h-full md:h-auto flex flex-col">
          <div className="px-3 py-4">
            <Image src={Logo} alt="Logo" className="h-36 w-full object-contain" priority />
          </div>
          <SidebarItems className="flex-grow">
            <SidebarItemGroup className="flex flex-col h-full justify-start">
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC] hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => {handleOpenProfile()}}
              >
                Profile
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => {handleOpenMatch()}}
              >
                Match
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find A Spotter
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC] hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find A Trainer
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-white text-xl bg-[#82C0CC] hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => {handleOpenMessages()}}
              >
                Messages
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </>
  );
};

export default NavigationCard;

