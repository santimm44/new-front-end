"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
    <div className="lg:w-[650px] border-2 rounded-3xl px-20 pt-20 pb-2">
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
          className="mt-3 lg:w-[80%] mx-auto"
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
          className="mt-3 lg:w-[80%] mx-auto"
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white text-2xl mt-7 h-15 w-40"> Sign In</Button>
      </div>
      <div className="flex justify-center py-3 text-xl">
        <p className="text-gray-400"> Dont have an account? </p>
        <a href="/" className="underline text-blue-500">Create an account!</a>
      </div>
      <div className="flex justify-center mt-20 text-xl">
        <p className="text-gray-400">Forgot Password/Username?</p>
        <a href="/" className="underline text-blue-500">Click Here!</a>
      </div>
    </div>
  );
};

export default LoginForm;
