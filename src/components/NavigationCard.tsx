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
import HomeIcon from "@/assets/home.png";
import UserIcon from "@/assets/user.png";
import MatchIcon from "@/assets/link.png";
import SpotterIcon from "@/assets/binoculars.png";
import TrainerIcon from "@/assets/muscle.png";
import MessageIcon from "@/assets/paper-plane.png";
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

  const handleOpenFindSpotter = () => {
    router.push('/FindSpotter');
  }

  const handleOpenFindTrainer = () => {
    router.push('/FindTrainer');
  }

  const handleOpenHome = () => {
    router.push('/Home');
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
        className={`md:sticky md:top-0 md:left-0 md:h-screen md:w-[30%] lg:w-[20%]
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
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px] mt-2"
                onClick={() => handleOpenHome()}
              >
                <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={HomeIcon} alt='Home Icon' />
                    Home
                </div>
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1] hover:!text-[#FC6F2F] hover:text-2xl h-[48px]"
                onClick={() => {handleOpenProfile()}}
              >
                 <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={UserIcon} alt='User Icon' />
                    Profile
                </div>
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px]"
                onClick={() => {handleOpenMatch()}}
              >
                 <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={MatchIcon} alt='Match Icon' />
                    Match
                </div>
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1]  hover:!text-[#FC6F2F] hover:text-2xl h-[48px]"
                onClick={() => {handleOpenFindSpotter()}}
              >
              <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={SpotterIcon} alt='Spotter Icon' />
                    Find A Spotter
                </div>
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1] hover:!text-[#FC6F2F] hover:text-2xl h-[48px]"
                onClick={() => {handleOpenFindTrainer()}}
              >
                 <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={TrainerIcon} alt='Trainer Icon' />
                    Find A Trainer
                </div>
              </SidebarItem>
              <SidebarItem
                href="#"
                className="[&:hover]:bg-white !text-black text-xl bg-[#FFE9D1] hover:!text-[#FC6F2F] hover:text-2xl h-[48px]"
                onClick={() => {handleOpenMessages()}}
              >
                 <div className="flex items-center">
                    <Image className="h-10 w-10 mr-2" src={MessageIcon} alt='Message Icon' />
                    Messages
                </div>
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </>
  );
};

export default NavigationCard;

