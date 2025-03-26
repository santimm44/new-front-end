import CreateAccountForm from "@/components/CreateAccountForm";
import Image from "next/image";
import React from "react";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";

const CreateAccountPage = () => {
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
    <CreateAccountForm />
  </div>
</div>

  );
};

export default CreateAccountPage;
