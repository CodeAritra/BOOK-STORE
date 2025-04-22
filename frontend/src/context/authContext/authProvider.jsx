import React, { useEffect, useState } from "react";
import authContext from "./authContext";
import axios from "axios";

const authProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    const parsedData = JSON.parse(data);
    if (data) {
      setAuth({ user: parsedData.user, token: parsedData.token });
    }
  }, []);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default authProvider;
