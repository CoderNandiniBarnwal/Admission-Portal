//UserContext

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [picture, setPicture] = useState(null);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const loginUser = (userData) => {
    setUser(userData.data);
    localStorage.setItem("user", JSON.stringify(userData.data));
    localStorage.setItem("accessToken", userData.accessToken);
    console.log(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setuserName,
        phone,
        setPhone,
        picture,
        setPicture,
        otp,
        setOtp,
        user,
        setUser,
        loginUser,logoutUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
