

export interface Itoken {
    token: string;
}

export interface IUserInfo {
    emailOrUsername: string;
    password: string;
}
export interface IuserCreateInfo {
    id: number,
    username: string,
    password: string,
    email: string,
    dateOfBirth: string,
    phoneNumber: string,
    userBio: string,
    userLocation: string,
    userLocationPublic: boolean,
    userPrimarySport: string,
    userSecondarySport: string,
    isSpotter: boolean,
    isTrainer: boolean,
    profilePicture: string,
    trueName: string,
  }

export interface IUserData {
    id: number;
    username: string;
}

export interface IUserStats {
    sport: string;
    statName: string;
    score: string;
  }

export interface Friend {
    id: number;
    name: string;
    lastMessage?: string; 
  }

 export interface UserModel {
    id: number;
    username: string;
    trueName: string;
    isSpotter: boolean;
    isTrainer: boolean;
    profilePicture: string;
  }