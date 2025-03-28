"use client";
import LoginForm from "@/components/LoginForm";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";
import Image from "next/image";

export default function Home() {
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
