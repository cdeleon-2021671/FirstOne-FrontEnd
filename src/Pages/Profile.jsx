import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useParams } from "react-router-dom";
import { Dashboard } from "../Components/Profile/Dashboard";
import { AuthContext } from "../Index";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

export const Profile = () => {
  const { user, userId } = useParams();
  const { isLogged } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

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
      {isLogged && (
        <div id="profile-container" className={toggle ? `isActive` : ""}>
          <button
            className="toggle"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {toggle ? <IoClose /> : <IoIosArrowForward />}
          </button>
          <Dashboard></Dashboard>
          <Outlet></Outlet>
        </div>
      )}
    </>
  );
};
