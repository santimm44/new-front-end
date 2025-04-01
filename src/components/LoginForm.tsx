"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";


const LoginForm = () => {
  
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
    console.log(user);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };


  return (
    <div className="lg:w-[650px] border-2 rounded-3xl px-20 pt-20 pb-2 bg-slate-400">
      <div className="pb-10">
        <Label htmlFor="user" className="pb-4 text-2xl font-semibold ml-[10%]">
          {" "}
          Username/Email{" "}
        </Label>
        <Input
          id="user"
          placeholder="Enter Username/Email"
          value={user}
          onChange={handleUserChange}
          className="mt-3 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div>
        <Label htmlFor="password" className="pb-4 text-2xl font-semibold ml-[10%]">
          {" "}
          Password{" "}
        </Label>
    
        <Input
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-3 lg:w-[80%] mx-auto bg-white"
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white text-2xl mt-7 h-15 w-40 hover:bg-white hover:text-blue-600 hover:border-black hover:border-2"> Sign In</Button>
      </div>
      <div className="flex justify-center py-3 text-xl">
        <p className=""> Dont have an account? </p>
        <Link className="underline text-blue-600" href={"/create-account"}>Create your account!</Link>
      </div>
      <div className="flex justify-center mt-20 text-xl">
        <p className="">Forgot Password/Username?</p>
        <a href="/" className="underline text-blue-600">Click Here!</a>
      </div>
    </div>
  );
};

export default LoginForm;
