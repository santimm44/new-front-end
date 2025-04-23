"use client";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";
import ProfileImage from "@/assets/Stock_Profile-removebg-preview.png";
import Logo from "@/assets/spot-me-high-resolution-logo.png"
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Itoken } from "@/lib/Interfaces";
import { createAccount, getLoggedInUserData, login } from "@/lib/DataServices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [primarySport, setPrimarySport] = useState<string>("");
  const [secondarySport, setSecondarySport] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userLocationPublic, setUserLocationPublic] = useState<boolean>();
  const [isTrainer, setIsTrainer] = useState<boolean>();
  const [isSpotter, setIsSpotter] = useState<boolean>();
  const [profilePicture, setProfilePicture] = useState<StaticImageData | string | null>(ProfileImage);

  const [switchBool, setSwitchBool] = useState<boolean>(false);
  const [switchCreateAccount, setSwitchCreateAccount] = useState<boolean>(false);

  const states = ["CA", "NY", "TX", "FL", "IL"];
  const sports = ["Powerlifting", "Bodybuilding", "CrossFit", "Strongman", "Olympic Lifting"];


  const router = useRouter();

  // Toggle between login and create account forms
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthdate("");
    setConfirmPassword("");
    setPhoneNumber("")
  };

  const handleNextSwitch = () => {
    setSwitchCreateAccount(true);
    setPrimarySport("");
    setSecondarySport("");
    setUserBio("")
    setUserLocation("");
    setIsTrainer(false);
    setIsSpotter(false);
    setUserLocationPublic(true);
    setProfilePicture(ProfileImage);
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
    console.log(switchBool);
    const userData = {
      username: username,
      password: password,
      email: email,
      dateOfBirth: birthdate,
      phoneNumber: phoneNumber,
      userBio: userBio,
      userLocation: userLocation,
      userLocationPublic: userLocationPublic,
      primarySport: primarySport,
      secondarySport: secondarySport,
      isSpotter: isSpotter,
      isTrainer: isTrainer,
      profilePicture: profilePicture
    };
    const userLoginData = {
      emailOrUsername: username, 
      password: password,
    };
  
    if (switchBool) {
      // Create Account Logic Here
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        setSwitchBool(true);
        return;
      }
      if (
        password != "" &&
        username != "" &&
        email != "" &&
        phoneNumber != "" &&
        birthdate != ""

      ) {
        console.log("Email: ", email);
        console.log("password: ", password);
        console.log("username: ", username);
        console.log("phonenumber: ", phoneNumber);
        console.log("birthdate: ", birthdate);
        console.log("location: ", userLocation);
        console.log("bio: ", userBio);
        console.log("LocationPublic: ", userLocationPublic);
        console.log("primarySport: ", primarySport);
        console.log("secondarySport: ", secondarySport);
        console.log("isSpotter: ", isSpotter);
        console.log("isTrainer: ", isTrainer)
  
        const result = await createAccount(userData);
  
        if (result) {
          alert("Account Created!");
          handleSwitch();
        } else {
          alert("Failed to Create Account");
        }
      }
    } else {
      // Login Logic here
      const response: Itoken | null = await login(userLoginData); 
  
      if (response && response.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("Token", response.token);
          localStorage.setItem("username", username); 
          console.log("Token stored:", response.token);
          console.log("Username stored:", username);
          await getLoggedInUserData(username); 
          router.push("/Dashboard");
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
            <div className="lg:w-[650px] border-2 rounded-3xl px-8 py-10 bg-[#FFE9D1]">
              <div className="flex justify-center" >
                <Image src={Logo} alt="Logo" className=" h-30 w-50 rounded-full" />
              </div>
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
                  className="bg-[#82C0CC] text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-[#82C0CC]"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </div>
              <div className="flex justify-center gap-2 py-3 text-lg">
                <p>Don&#39;t have an account?</p>
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
            <div className="lg:w-[650px] border-2 rounded-3xl px-8 py-14 bg-[#FFE9D1] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-center" >
                <Image src={Logo} alt="Logo" className=" h-30 w-50 rounded-full" />
              </div>
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
                    htmlFor="PhoneNumber"
                    className="block text-xl font-semibold mb-1 lg:w-[80%] "
                  >
                    PhoneNumber
                  </Label>
                </div>
                <div className="flex justify-center">
                  <Input
                    id="PhoneNumber"
                    placeholder="Enter PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white lg:w-[80%]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="lg:flex lg:justify-center">
                  <Label
                    htmlFor="username"
                    className="block text-xl font-semibold mb-1 lg:w-[80%]"
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
                    className="block text-xl font-semibold mb-1 lg:w-[80%]"
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
                    className="block text-xl font-semibold mb-1 lg:w-[80%]"
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
                    className="block text-xl font-semibold mb-1 lg:w-[80%]"
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
                <h2 className="text-2xl font-bold mb-4">Create Account - Step 2</h2>

          <Label>Primary Sport</Label>
          <select
            value={primarySport}
            onChange={(e) => setPrimarySport(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select a sport</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>

          <Label>Secondary Sport</Label>
          <select
            value={secondarySport}
            onChange={(e) => setSecondarySport(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select a sport</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>

          <Label>Bio</Label>
          <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="w-full border p-2 rounded mb-2 h-24"
          />

          <Label>City</Label>
          <Input value={userLocation} onChange={(e) => setUserLocation(e.target.value)} className="mb-2" />


          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={userLocationPublic}
              onChange={(e) => setUserLocationPublic(e.target.checked)}
              className="mr-2"
            />
            <Label>Make Location Public</Label>
          </div>

          <Label className="block mb-2">Are you a...</Label>
          <div className="flex gap-4 mb-4">
            <Button
              variant={isSpotter ? "default" : "outline"}
              onClick={() => {
                setIsSpotter(true);
                setIsTrainer(false);
              }}
            >
              Spotter
            </Button>
            <Button
              variant={isTrainer ? "default" : "outline"}
              onClick={() => {
                setIsTrainer(true);
                setIsSpotter(false);
              }}
            >
              Trainer
            </Button>
          </div>

        

          <Button className="w-full" onClick={handleSubmit}>
            Create Account
          </Button>

              </div>
              <div className="flex justify-center">
                <Button
                  className=" bg-[#82C0CC] text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-[#82C0CC]"
                  onClick={handleNextSwitch}
                >
                  Next
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
