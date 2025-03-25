"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const CreateAccountForm = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <div className="lg:w-[650px] border-2 rounded-3xl px-20 pt-20 pb-2">
      <div className="pb-10">
        <Label htmlFor="email" className="pb-4 text-2xl font-semibold ml-[10%]">
          {" "}
          Email{" "}
        </Label>
        <Input
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          className="mt-3 lg:w-[80%] mx-auto"
        />
      </div>
      <div>
        <Label htmlFor="username" className="pb-4 text-2xl font-semibold ml-[10%]">
          {" "}
          Username{" "}
        </Label>
        <Input
          id="username"
          placeholder="Enter Username"
          value={email}
          onChange={handleUsernameChange}
          className="mt-3 lg:w-[80%] mx-auto"
        />
      </div>
      <div>
        <Label
          htmlFor="password"
          className="pb-4 text-2xl font-semibold ml-[10%] mt-5"
        >
          {" "}
          Password{" "}
        </Label>

        <Input
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-3 lg:w-[80%] mx-auto"
        />
      </div>
      <div>
        <Label
          htmlFor="password"
          className="pb-4 text-2xl font-semibold ml-[10%] mt-5"
        >
          {" "}
          Confirm Password{" "}
        </Label>

        <Input
          id="password"
          placeholder="Re-enter Password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-3 lg:w-[80%] mx-auto"
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white text-xl mt-7 h-15 w-40">
          {" "}
          Create Account
        </Button>
      </div>
      <div className="flex justify-center py-3 text-xl">
        <p className="text-gray-400"> Already have an account? </p>
        <Link href={"/create-account"}>Login Here!</Link>
      </div>
    </div>
  );
};

export default CreateAccountForm;
