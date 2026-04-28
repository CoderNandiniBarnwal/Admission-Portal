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
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const loginUser = (userData) => {
    setUser(userData.data);
    localStorage.setItem("user", JSON.stringify(userData.data));
    localStorage.setItem("accessToken", userData.accessToken);
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
        isLogoutOpen,
        setIsLogoutOpen,
        user,
        setUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
