import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Index";
import axios from "axios";
import { Link } from "react-router-dom";

export const Stores = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="info">
      {user && user.rol == "COMERCIANTE" ? (
        <div className="info-title">
          <h2>Tiendas en tu cargo</h2>
          <Link to="/join/trade-online/step2">Agregar tienda</Link>
        </div>
      ) : user && user.rol == "TRABAJADOR" ? (
        <div className="info-title">
          <h2>Tiendas a las que perteneces</h2>
        </div>
      ) : (user && user.rol == "MAESTRO") || (user && user.rol == "ADMIN") ? (
        <div className="info-title">
          <h2>Todas las tiendas</h2>
        </div>
      ) : null}
      <List></List>
    </div>
  );
};

const List = () => {
  const { user } = useContext(AuthContext);
  const [allStores, setAllStores] = useState(null);

  const getMyStores = (allStores) => {
    if (user) {
      if (user.rol == "MAESTRO" || user.rol == "ADMIN") setAllStores(allStores);
      else {
        const { stores } = user;
        const myStores = [];
        for (const element of allStores) {
          const { _id } = element.store;
          for (const item of stores) {
            const { storeId } = item;
            if (storeId == _id) myStores.push(element);
          }
        }
        setAllStores(myStores);
      }
    }
  };

  const getStores = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/store/get-all-stores`
      );
      const { allStores } = data;
      getMyStores(allStores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="table all">
      <div className="table-header all-content">
        <label></label>
        <label>Tienda</label>
        <label>Encargado</label>
        <label>Correo</label>
        <label>Estado</label>
      </div>
      {allStores &&
        allStores.length != 0 &&
        allStores.map((item, key) => (
          <Link className="all-content" id="table-content" key={key}>
            <img src={item.store.urlLogo} alt={item.store.name} />
            <span>{item.store.name}</span>
            <span>{item.boss.name}</span>
            <span>{item.boss.email}</span>
            <span>{item.store.state}</span>
          </Link>
        ))}
    </div>
  );
};
