import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { routes, socialLinks } from "./Components/Utilities";

export const AuthContext = createContext();
export const Index = () => {
  const [isLogged, setIsLogged] = useState(null);
  const [user, setUser] = useState({});

  const getInfo = async (token) => {
    try {
      const headers = {
        "content-types": "aplication/json",
        Authorization: token,
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/info`,
        { headers: headers }
      );
      setUser({
        sub: data.user.sub,
        name: data.user.name,
        email: data.user.email,
        stores: data.user.stores,
        rol: data.user.rol,
        state: data.user.state,
      });
      setIsLogged(true);
    } catch (err) {
      console.log(err);
      localStorage.clear();
      setIsLogged(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getInfo(token);
    } else {
      localStorage.clear();
      setIsLogged(false);
      setUser({});
    }
  }, [isLogged]);

  return (
    <>
      <AuthContext.Provider
        value={{
          socialLinks,
          isLogged,
          setIsLogged,
          user,
          setUser,
        }}
      >
        <RouterProvider router={routes} />
      </AuthContext.Provider>
    </>
  );
};
