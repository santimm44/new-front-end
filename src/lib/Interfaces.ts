

export interface Itoken {
    token: string;
}

export interface IUserInfo {
    emailOrUsername: string;
    password: string;
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
    userPrimarySport: string,
    userSecondarySport: string,
    isSpotter: boolean,
    isTrainer: boolean,
    profilePicture: string,
    trueName: string,
  }

export interface IProfileData{
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
  id: number,
  userId: number,
   username: string,
   trueName: string,
   dateCreated: string,
   description: string,
  isPublished: boolean,
  isDeleted: boolean,
  sport: string,
  stat: string
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

  export interface IMatchSpotterCard{
    id?: number | null; 
    userId: number
    myName: string
    userContent: string
    userSport: string
    daysAvailable: string
    startTime: string
    endTime: string
  }

  export interface IMatchTrainerCard {
    id: number
    username: string
    userLocation: string
    userLocationPublic: boolean
    profilePicture: string
    myName: string
    payment: string
    createAt: string
  }
