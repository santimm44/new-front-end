"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg"
import Image from "next/image";

const CreateAccountForm = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    
    
    value = value.replace(/\D/g, ''); 
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }
    
    
    value = value.slice(0, 10);
    
    setBirthdate(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
   
    <div className="lg:w-[650px] border-2 rounded-3xl px-20 pt-20 pb-2 bg-slate-400">

      <div className="pb-10">
        <Label htmlFor="email" className="pb-4 text-2xl font-semibold ml-[10%]">
          Email
        </Label>
        <Input
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="pb-10">
        <Label htmlFor="username" className="pb-4 text-2xl font-semibold ml-[10%]">
          Username
        </Label>
        <Input
          id="username"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
          className="mt-1 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="pb-10">
        <Label htmlFor="birthdate" className="pb-4 text-2xl font-semibold ml-[10%]">
          Date of Birth
        </Label>
        <Input
          id="birthdate"
          placeholder="mm/dd/yyyy"
          value={birthdate}
          onChange={handleBirthdateChange}
          className="mt-1 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="pb-10">
        <Label
          htmlFor="password"
          className="pb-4 text-2xl font-semibold ml-[10%]"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="pb-10">
        <Label
          htmlFor="confirm-password"
          className="pb-4 text-2xl font-semibold ml-[10%]"
        >
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="mt-1 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white text-xl mt-2 h-15 w-40 hover:bg-white hover:text-blue-600 hover:border-black hover:border-2">
          Create Account
        </Button>
      </div>
      <div className="flex justify-center py-3 text-xl">
        <p className=" mr-2">Already have an account?</p>
        <Link href="/" className="text-blue-600 underline">Login Here!</Link>
      </div>
    </div>
  
  );
};

export default CreateAccountForm;