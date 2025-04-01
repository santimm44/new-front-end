"use client";
import LoginForm from "@/components/LoginForm";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";
import Image from "next/image";
import { Router } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    let userData = {
      username: username,
      password: password
    }

    console.log(userData)
      // Login Logic here
      // let token: Itoken = await login(userData);

      // if(token != null){
       // if(typeof window != null){
         // localStorage.setItem("Token", token.token);
         // console.log(token.token)
         // await getLoggedInUserData(username);

          // router.push('/Dashboard');
        // }
     // }else{
      //  alert("Invalid username or password!")
      // }
    // }
}
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src={BgImage}
          alt="Dumbbell image"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
