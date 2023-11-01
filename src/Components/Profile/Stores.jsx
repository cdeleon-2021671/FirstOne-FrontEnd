import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Index";
import axios from "axios";
import { Ecommerce } from "./Ecommerce";
import { AllEcommerce } from "./AllEcommerce";
import { Link } from "react-router-dom";

export const Stores = () => {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState(null);

  const getStores = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/get-user-by-id/${user.sub}`
      );
      const { stores } = data.user;
      setStores(stores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getStores();
    }
  }, [user]);

  return (
    <div className="info">
      {user && user.rol == "COMERCIANTE" ? (
        <div className="info-title">
          <h2>Tiendas en tu cargo</h2>
          <Link to="/join/trade-online/step2">Agregar tienda</Link>
        </div>
      ) : user.rol == "MAESTRO" ? (
        <div className="info-title">
          <h2>Todas las tiendas</h2>
        </div>
      ) : null}
      {user && user.rol == "COMERCIANTE" ? (
        <Ecommerce stores={stores}></Ecommerce>
      ) : (
        user.rol == "MAESTRO" && <AllEcommerce></AllEcommerce>
      )}
    </div>
  );
};
