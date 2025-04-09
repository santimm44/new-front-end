
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
    phoneNumber: string
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
export interface IProfileData {
    name: string
    city: string
    state: string
    image: string
    specialty: string 
    username: string
    password: string
}

export interface Friend {
    id: number
    name: string;
    lastMessage?: string; 
  }