"use client";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Itoken } from "@/lib/Interfaces";
import { createAccount, getLoggedInUserData, login } from "@/lib/DataServices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(false);

  const router = useRouter();

  // Toggle between login and create account forms
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthdate("");
    setConfirmPassword("");
  };

  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    if (value.length > 5) {
      value = value.slice(0, 5) + "/" + value.slice(5);
    }

    value = value.slice(0, 10);

    setBirthdate(value);
  };

  const handleSubmit = async () => {
    let userData = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate
    };

    console.log(userData);

    if (switchBool) {
      // Create Account Logic Here
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      let result = await createAccount(userData);
      result ? alert("Account Created!") : alert("Username Already Exists");
    } else {
      // Login Logic here
      let token: Itoken = await login(userData);

      if (token != null) {
        if (typeof window != null) {
          localStorage.setItem("Token", token.token);
          console.log(token.token);
          await getLoggedInUserData(username);
          router.push('/Dashboard');
        }
      } else {
        alert("Invalid Username or Password!");
      }
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div className="absolute inset-0">
        <Image
          src={BgImage}
          alt="Dumbbell image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Centered Form Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10">
          {!switchBool ? (
            // Login Form
            <div className="lg:w-[650px] border-2 rounded-3xl px-8 py-10 bg-slate-400">
              <div className="mb-6">
              <div className="lg:flex lg:justify-center">
                <Label
                  htmlFor="user"
                  className="block text-2xl font-semibold mb-2 lg:w-[80%]"
                >
                  Username/Email
                </Label>
                </div>
                <div className="flex justify-center">
                <Input
                  id="user"
                  placeholder="Enter Username/Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white lg:w-[80%]"
                />
              </div>
              </div>
              <div className="mb-6">
              <div className="lg:flex lg:justify-center">
                <Label
                  htmlFor="password"
                  className="block text-2xl font-semibold mb-2 lg:w-[80%]"
                >
                  Password
                </Label>
                </div>
                <div className="flex justify-center">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white lg:w-[80%]"
                />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-blue-600 hover:border-black hover:border-2"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </div>
              <div className="flex justify-center gap-2 py-3 text-lg">
                <p>Don't have an account?</p>
                <button
                  onClick={handleSwitch}
                  className="underline text-blue-600 cursor-pointer"
                >
                  Create your account!
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-14 text-lg">
                <p>Forgot Password/Username?</p>
                <button className="underline text-blue-600 cursor-pointer">Click Here!</button>
              </div>
            </div>
          ) : (
            // Create Account Form
            <div className="lg:w-[650px] border-2 rounded-3xl px-8 py-14 bg-slate-400 max-h-[90vh] overflow-y-auto">
              <div className="mb-4">
                <div className="lg:flex lg:justify-center">
                <Label
                  htmlFor="email"
                  className="block text-xl font-semibold mb-1 lg:w-[80%] "
                >
                  Email
                </Label>
                </div>
                <div className="flex justify-center">
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white lg:w-[80%]"
                  />
                </div>
              </div>
              <div className="mb-4">
              <div className="lg:flex lg:justify-center">
                <Label
                  htmlFor="username"
                  className="block text-xl font-semibold mb-1"
                >
                  Username
                </Label>
                </div>
                <div className="flex justify-center">
                  <Input
                    id="username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white lg:w-[80%]"
                  />
                </div>
                </div>
                <div className="mb-4">
                <div className="lg:flex lg:justify-center">
                  <Label
                    htmlFor="birthdate"
                    className="block text-xl font-semibold mb-1"
                  >
                    Date of Birth
                  </Label>
                  </div>
                  <div className="flex justify-center">
                    <Input
                      id="birthdate"
                      placeholder="mm/dd/yyyy"
                      value={birthdate}
                      onChange={handleBirthdateChange}
                      className="w-full bg-white lg:w-[80%]"
                    />
                  </div>
                </div>
                <div className="mb-4">
                <div className="lg:flex lg:justify-center">
                  <Label
                    htmlFor="create-password"
                    className="block text-xl font-semibold mb-1"
                  >
                    Password
                  </Label>
                  </div>
                  <div className="flex justify-center">
                    <Input
                      id="create-password"
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white lg:w-[80%]"
                    />
                  </div>
                </div>
                <div className="mb-4">
                <div className="lg:flex lg:justify-center">
                  <Label
                    htmlFor="confirm-password"
                    className="block text-xl font-semibold mb-1"
                  >
                    Confirm Password
                  </Label>
                  </div>
                  <div className="flex justify-center">
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white lg:w-[80%]"
                    />
                  </div>
                
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-blue-600 hover:border-black hover:border-2"
                  onClick={handleSubmit}
                >
                  Create Account
                </Button>
              </div>
              <div className="flex justify-center py-3 text-lg">
                <p className="mr-2">Already have an account?</p>
                <button
                  onClick={handleSwitch}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Login Here!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
