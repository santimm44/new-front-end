import { IProfileData, IuserCreateInfo, IUserData, IUserInfo, IUserStats, UserModel } from "./Interfaces";

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
    console.log(user);
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

export const getAllUsers = async (token: string): Promise<UserModel[]> => {
  const res = await fetch(url + "User/GetAllUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("GetAllUsers Error:", errorData.message);
    return [];
  }

  const data = await res.json();
  return data;
};

export const getStatsByUsername = async (username: string): Promise<IUserStats[]> => {
  const res = await fetch(`${url}UserStats/GetStatsByUsername/${username}`);
  if (!res.ok) {
    console.error("Failed to fetch stats");
    return [];
  }
  return await res.json();
};

export const addStat = async (stat: IUserStats): Promise<boolean> => {
  const res = await fetch(`${url}UserStats/AddStat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stat),
  });
  return res.ok;
};

// export const editStat = async (stat: IUserStats): Promise<boolean> => {
  //const res = await fetch(`${url}UserStats/EditStat/${stat.id}`, {
   // method: "PUT",
   // headers: { "Content-Type": "application/json" },
   // body: JSON.stringify(stat),
  //});
//  return res.ok;
// };

export const deleteStat = async (id: number): Promise<boolean> => {
  const res = await fetch(`${url}UserStats/DeleteStat/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};

export const getProfileItemsByUser = async (emailOrUsername: string, token: string) => {
  const res = await fetch(url + "User/GetUserInfoByEmailOrUsername/" + emailOrUsername, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
  if(!res.ok){
    const errorData = await res.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }
  const data = await res.json();
  console.log(data);
  return data;
}



export const updateProfileItem = async (item:IuserCreateInfo , token:string) => {
  const res = await fetch(url + `User/UpdateUserInfo/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body:JSON.stringify(item)
  });
  if(!res.ok){
    const errorData = await res.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await res.json();
  return data.success
}

export const getFriendsData = async (userId: number, token: string) => {
  
  const res = await fetch(`${url}Friendship/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }
  
  const data = await res.json();
  return data;
};

export const getUserById = async (userId: number, token: string): Promise<IProfileData | null> => {
  try {
    const res = await fetch(`${url}User/GetUserById/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error("GetUserById Error:", errorData.message);
      return null;
    }
  
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
