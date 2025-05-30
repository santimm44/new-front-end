"use client";
import BgImage from "@/assets/A close up of a dumbbell with a nice gym background.jpg";
import Logo from "@/assets/spot-me-high-resolution-logo.png"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Itoken } from "@/lib/Interfaces";
import { createAccount, getLoggedInUserData, login } from "@/lib/DataServices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ValidationErrors {
  username?: string;
  password?: string;
  email?: string;
  birthdate?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  userPrimarySport?: string;
  userSecondarySport?: string;
  userBio?: string;
  userLocation?: string;
  trueName?: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [userPrimarySport, setUserPrimarySport] = useState<string>("");
  const [userSecondarySport, setUserSecondarySport] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userLocationPublic, setUserLocationPublic] = useState<boolean>(false);
  const [isTrainer, setIsTrainer] = useState<boolean>(false);
  const [isSpotter, setIsSpotter] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [trueName, setTrueName] = useState<string>("");
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(false);
  const [switchCreateAccount, setSwitchCreateAccount] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const sports = ["American Football", "Baseball", "Basketball", "Cricket", "Field Hockey", "Ice Hockey", "Lacrosse", "Rugby", "Soccer/Football", "Softball", "Volleyball", "Water Polo", "Badminton", "Padel", "Pickleball", "Racquetball", "Squash", "Table Tennis/Ping Pong", "Tennis", "Boxing", "Brazilian Jiu-Jitsu", "Fencing", "Judo", "Karate", "Kickboxing", "Mixed Martial Arts (MMA)", "Muay Thai", "Taekwondo", "Wrestling", "Bodybuilding", "Calisthenics", "CrossFit", "Functional Training", "HIIT (High-Intensity Interval Training)", "Olympic Weightlifting", "Pilates", "Powerlifting", "Strength Training", "Yoga", "Cycling", "Duathlon", "Marathon Running", "Rowing", "Swimming", "Trail Running", "Triathlon", "Archery", "Canoeing/Kayaking", "Climbing/Bouldering", "Golf", "Hiking", "Mountain Biking", "Sailing", "Skateboarding", "Skiing", "Snowboarding", "Surfing", "Bowling", "Dance", "Darts", "Diving", "Equestrian", "Figure Skating", "Gymnastics", "Handball", "Parkour"];

  const router = useRouter();

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const validateBirthdate = (date: string): boolean => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(date)) return false;
    
    const [month, day, year] = date.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Check if date is valid and not in the future
    return inputDate.getFullYear() === year && 
           inputDate.getMonth() === month - 1 && 
           inputDate.getDate() === day &&
           inputDate < today;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (switchBool) {
      // Create account validation
      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!validateEmail(email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!phoneNumber.trim()) {
        errors.phoneNumber = "Phone number is required";
      } else if (!validatePhoneNumber(phoneNumber)) {
        errors.phoneNumber = "Please enter a valid 10-digit phone number";
      }

      if (!username.trim()) {
        errors.username = "Username is required";
      }

      if (!birthdate.trim()) {
        errors.birthdate = "Date of birth is required";
      } else if (!validateBirthdate(birthdate)) {
        errors.birthdate = "Please enter a valid date (MM/DD/YYYY)";
      }

      if (!password.trim()) {
        errors.password = "Password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }

      if (!confirmPassword.trim()) {
        errors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      if (!trueName.trim()) {
        errors.trueName = "Name is required";
      }

      if (!userPrimarySport.trim()) {
        errors.userPrimarySport = "Primary sport is required";
      }

      if (!userSecondarySport.trim()) {
        errors.userSecondarySport = "Secondary sport is required";
      }

      if (!userBio.trim()) {
        errors.userBio = "Bio is required";
      }

      if (!userLocation.trim()) {
        errors.userLocation = "Location is required";
      }
    } else {
      // Login validation
      if (!username.trim()) {
        errors.username = "Username is required";
      }

      if (!password.trim()) {
        errors.password = "Password is required";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Toggle between login and create account forms
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthdate("");
    setConfirmPassword("");
    setPhoneNumber("")
    setSwitchCreateAccount(!switchCreateAccount);
    setUserPrimarySport("");
    setUserSecondarySport("");
    setUserBio("")
    setUserLocation("");
    setIsTrainer(false);
    setIsSpotter(false);
    setUserLocationPublic(true);
    setProfilePicture("");
    setTrueName("");
    setProfilePictureFile(null);
    setProfilePicturePreview("");
    setValidationErrors({});
  };

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    
    
    if (validationErrors.birthdate) {
      setValidationErrors(prev => ({ ...prev, birthdate: undefined }));
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else if (value.length > 6) {
      value = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 10);
    }
    
    setPhoneNumber(value);
    
    
    if (validationErrors.phoneNumber) {
      setValidationErrors(prev => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setProfilePictureFile(file);
    console.log(profilePictureFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setProfilePicturePreview(base64String);
      setProfilePicture(base64String);
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  }
};

  const clearValidationError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const userData = {
      username: username,
      password: password,
      email: email,
      dateOfBirth: birthdate,
      phoneNumber: phoneNumber.replace(/\D/g, ""),
      userBio: userBio,
      userLocation: userLocation,
      userLocationPublic: userLocationPublic,
      userPrimarySport: userPrimarySport,
      userSecondarySport: userSecondarySport,
      isSpotter: isSpotter,
      isTrainer: isTrainer,
      profilePicture: profilePicture,
      trueName: trueName
    };

    const userLoginData = {
      emailOrUsername: username,
      password: password,
    };

    if (switchBool) {
      // Create Account Logic
      const result = await createAccount(userData);

      if (result) {
        handleSwitch();
      } else {
      }
    } else {
      // Login Logic
      const response: Itoken | null = await login(userLoginData);

      if (response && response.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("Token", response.token);
          localStorage.setItem("username", username);
          console.log("Username stored:", username);
          await getLoggedInUserData(username);
          router.push("/Profile");
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
                    Username
                  </Label>
                </div>
                {validationErrors.username && (
                  <div className="flex justify-center">
                    <p className="text-red-500 text-sm mb-1 lg:w-[80%]">{validationErrors.username}</p>
                  </div>
                )}
                <div className="flex justify-center">
                  <Input
                    id="user"
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      clearValidationError('username');
                    }}
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
                {validationErrors.password && (
                  <div className="flex justify-center">
                    <p className="text-red-500 text-sm mb-1 lg:w-[80%]">{validationErrors.password}</p>
                  </div>
                )}
                <div className="flex justify-center">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearValidationError('password');
                    }}
                    className="w-full bg-white lg:w-[80%]"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-[#82C0CC] text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-[#82C0CC] cursor-pointer"
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
              <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
              
              <div className="mb-4">
                <Label htmlFor="email" className="block text-xl font-semibold mb-1 w-full">
                  Email *
                </Label>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.email}</p>
                )}
                <Input
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearValidationError('email');
                  }}
                  className="w-full bg-white"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="PhoneNumber" className="block text-xl font-semibold mb-1 w-full">
                  Phone Number *
                </Label>
                {validationErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.phoneNumber}</p>
                )}
                <Input
                  id="PhoneNumber"
                  placeholder="Enter Phone Number (e.g., 123-456-7890)"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full bg-white"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="username" className="block text-xl font-semibold mb-1 w-full">
                  Username *
                </Label>
                {validationErrors.username && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.username}</p>
                )}
                <Input
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    clearValidationError('username');
                  }}
                  className="w-full bg-white"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="birthdate" className="block text-xl font-semibold mb-1 w-full">
                  Date of Birth *
                </Label>
                {validationErrors.birthdate && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.birthdate}</p>
                )}
                <Input
                  id="birthdate"
                  placeholder="MM/DD/YYYY"
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  className="w-full bg-white"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="create-password" className="block text-xl font-semibold mb-1 w-full">
                  Password *
                </Label>
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.password}</p>
                )}
                <Input
                  id="create-password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearValidationError('password');
                  }}
                  className="w-full bg-white"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="confirm-password" className="block text-xl font-semibold mb-1 w-full">
                  Confirm Password *
                </Label>
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.confirmPassword}</p>
                )}
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearValidationError('confirmPassword');
                  }}
                  className="w-full bg-white mb-2"
                />
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Name *</Label>
                {validationErrors.trueName && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.trueName}</p>
                )}
                <Input 
                  placeholder="Enter Name" 
                  value={trueName} 
                  onChange={(e) => {
                    setTrueName(e.target.value);
                    clearValidationError('trueName');
                  }} 
                  className="mb-2 bg-white" 
                />
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mb-2 bg-white"
                />
                {profilePicturePreview && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Primary Sport *</Label>
                {validationErrors.userPrimarySport && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.userPrimarySport}</p>
                )}
                <select
                  value={userPrimarySport}
                  onChange={(e) => {
                    setUserPrimarySport(e.target.value);
                    clearValidationError('userPrimarySport');
                  }}
                  className="w-full p-2 mb-2 border rounded bg-white"
                >
                  <option value="">Select a sport</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Secondary Sport *</Label>
                {validationErrors.userSecondarySport && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.userSecondarySport}</p>
                )}
                <select
                  value={userSecondarySport}
                  onChange={(e) => {
                    setUserSecondarySport(e.target.value);
                    clearValidationError('userSecondarySport');
                  }}
                  className="w-full p-2 mb-2 border rounded bg-white"
                >
                  <option value="">Select a sport</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Bio *</Label>
                {validationErrors.userBio && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.userBio}</p>
                )}
                <textarea
                  value={userBio}
                  onChange={(e) => {
                    setUserBio(e.target.value);
                    clearValidationError('userBio');
                  }}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full border p-2 rounded mb-2 h-24 bg-white"
                />
              </div>

              <div className="mb-4">
                <Label className="text-xl font-semibold mb-1 block">Location *</Label>
                {validationErrors.userLocation && (
                  <p className="text-red-500 text-sm mb-1">{validationErrors.userLocation}</p>
                )}
                <Input 
                  value={userLocation} 
                  onChange={(e) => {
                    setUserLocation(e.target.value);
                    clearValidationError('userLocation');
                  }} 
                  className="mb-2 bg-white" 
                  placeholder="Enter your location"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={userLocationPublic}
                  onChange={(e) => setUserLocationPublic(e.target.checked)}
                  className="mr-2"
                />
                <Label>Make Location Public</Label>
              </div>

              <Label className="block mb-2 text-center text-xl font-semibold">Are you a...</Label>
              <div className="flex justify-center gap-4 mb-4">
                <Button
                  className="bg-white"
                  variant={isSpotter ? "outline" : "default"}
                  onClick={() => {
                    setIsSpotter(true);
                    setIsTrainer(false);
                  }}
                >
                  Spotter
                </Button>
                <Button
                  className="bg-white"
                  variant={isTrainer ? "outline" : "default"}
                  onClick={() => {
                    setIsTrainer(true);
                    setIsSpotter(false);
                  }}
                >
                  Trainer
                </Button>
              </div>

              <div className="flex justify-center">
                <Button
                  className="bg-[#82C0CC] text-white text-xl mt-4 h-12 w-40 hover:bg-white hover:text-[#82C0CC] cursor-pointer"
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