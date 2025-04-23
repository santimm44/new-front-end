import { StaticImageData } from "next/image"

export interface Itoken {
    token: string
}

export interface IUserInfo {
    emailOrUsername: string
    password: string
}
export interface IuserCreateInfo {
    username: string,
    password: string,
    email: string,
    dateOfBirth: string,
    phoneNumber: string,
    userBio: string,
    userLocation: string,
    userLocationPublic: boolean,
    primarySport: string,
    secondarySport: string,
    isSpotter: boolean,
    isTrainer: boolean,
    profilePicture: string | StaticImageData | null
  }

export interface IUserData {
    id: number
    username: string
}

export interface IUserStats {
    sport: string;
    statName: string;
    score: string;
  }

export interface Friend {
    id: number
    name: string;
    lastMessage?: string; 
  }