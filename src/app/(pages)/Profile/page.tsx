"use client";
import { IProfileData } from "@/lib/Interfaces";
import React, { useEffect, useState } from "react";

const [profileItems, setProfileItems] = useState<IProfileData>();
useEffect(() =>{
  const getData = async () => {
    const data: IProfileData = await (getToken());
    console.log(data);

  }

  getData();

}, []);


const page = () => {
  return (
    <div>Profile Page</div>
  )
}

export default page