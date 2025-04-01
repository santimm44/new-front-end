"use client";
import React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import Logo from "@/assets/spot-me-high-resolution-logo.png";
import Image from "next/image";

const NavigationCard = () => {
  return (
    <div className="lg:w-[30%] w-[35%] flex justify-center">
    <Sidebar className="[&>div]:bg-[#FFE9D1] mt-10 ml-[3%] !rounded-3xl shadow-2xl !overflow-hidden lg:w-[300px]">
  <Image src={Logo} alt="Logo" className="h-36 w-full" priority />
  <SidebarItems>
    <SidebarItemGroup>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">Home</SidebarItem>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">Discovery</SidebarItem>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">Profile</SidebarItem>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">Match</SidebarItem>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">
        Find A Spotter
      </SidebarItem>
      <SidebarItem href="#" className="[&:hover]:bg-white !text-black text-xl bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:text-2xl hover:position-absolute h-[48px]">
        Test Your Strength
      </SidebarItem>
    </SidebarItemGroup>
  </SidebarItems>
</Sidebar>
</div>
  );
};

export default NavigationCard;
