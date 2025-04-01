"use client";
import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";



const NavigationCard = () => {
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <SidebarLogo href="#" img="" imgAlt="Flowbite logo">
        Flowbite
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#">
            Dashboard
          </SidebarItem>
          <SidebarItem href="#">
            Kanban
          </SidebarItem>
          <SidebarItem href="#">
            Inbox
          </SidebarItem>
          <SidebarItem href="#">
            Users
          </SidebarItem>
          <SidebarItem href="#">
            Products
          </SidebarItem>
          <SidebarItem href="#">
            Sign In
          </SidebarItem>
          <SidebarItem href="#">
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default NavigationCard