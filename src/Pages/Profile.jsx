import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useParams } from "react-router-dom";
import { Dashboard } from "../Components/Profile/Dashboard";

export const Profile = () => {
  const { user, userId } = useParams();
  return (
    <>
      <Helmet>
        <title>Tienda.gt - Perfil</title>
        <meta
          name="description"
          content="Apartado en donde puedes ver la información de tu perfil. No te lo pierdas!"
        />
        <link
          rel="canonical"
          href={`https://tienda.gt/profile/${user}/${userId}`}
        />
      </Helmet>
      <div id="profile-container">
        <Dashboard></Dashboard>
        <Outlet></Outlet>
      </div>
    </>
  );
};
