import { IuserCreateInfo, IUserData, IUserInfo } from "./Interfaces";

const url = "https://fullstackwebapp-bxcja2evd2hef3b9.westus-01.azurewebsites.net/";
let userData: IUserData;

// Login Fetch
export const login = async (user: IUserInfo) => {
  console.log(user)
    const res = await fetch(url + "User/Login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if (!res.ok) {
      const data = await res.json();
      const message = data.message;
      console.log(message);
      return null;
    }
  
    const data = await res.json();
    return data;
  };

// Create Account Fetch

export const createAccount = async (user: IuserCreateInfo) => {
  
  try{
    const res = await fetch(url + "User/CreateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return data.success;
      }
    
      const data = await res.json();
      return data.success;
  }
  catch{
    console.error('error in fetching the url+User/Createuser', url+"User/createUser")
  }
  
  };

  // Getting Logged in Data Fetch

  export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + `User/GetUserInfoByEmailOrUsername/${username}`);
  
    if (!res.ok) {
      const data = await res.json();
      const message = data.message;
      console.log(message);
      return null;
    }
    userData = await res.json();
  
    return userData;
  };

  export const loggedInData = () => {
    return userData;
  };

  export const checkToken = () => {
    let result = false;
  
    if (typeof window !== null) {
      const lsData = localStorage.getItem("Token");
  
      if (lsData != null) {
        result = true;
      }
    }
    return result;
  };



// Data fetches 