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
    sport: string
    statName: string
    score: string
}