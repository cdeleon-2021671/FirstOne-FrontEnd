import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Index";
import axios from "axios";
import { Link } from "react-router-dom";
import { Animation } from "../Animation/Animation";

export const Stores = () => {
  const { user } = useContext(AuthContext);
  const [myUser, setMyUser] = useState(null);

  const getMyUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/get-user-by-id/${user.sub}`
      );
      setMyUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) getMyUser();
  }, [user]);

  return (
    <div className="info">
      {myUser && myUser.rol == "COMERCIANTE" ? (
        <div className="info-title">
          <h2>Tiendas en tu cargo</h2>
          <Link className="info-title-action" to="/join/trade-online/step2/information">
            Agregar tienda
          </Link>
        </div>
      ) : myUser && myUser.rol == "TRABAJADOR" ? (
        <div className="info-title">
          <h2>Tiendas a las que perteneces</h2>
        </div>
      ) : (myUser && myUser.rol == "MAESTRO") ||
        (myUser && myUser.rol == "ADMIN") ? (
        <div className="info-title">
          <h2>Todas las tiendas</h2>
        </div>
      ) : null}
      <List user={myUser}></List>
    </div>
  );
};

const List = ({ user }) => {
  const [allStores, setAllStores] = useState(null);
  const [loading, setLoading] = useState(false);

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
            if (storeId._id == _id) myStores.push(element);
          }
        }
        setAllStores(myStores);
      }
    }
    setLoading(false);
  };

  const getStores = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/store/get-all-stores`
      );
      const { allStores } = data;
      getMyStores(allStores);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      getStores();
    }
  }, [user]);

  return (
    <>
      {loading && <Animation></Animation>}
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
            <Link
              className="all-content"
              id="table-content"
              key={key}
              to={`/profile/store/${item.store.name.replace(/[ ]+/g, "-")}/${
                item.store._id
              }`}
            >
              <img src={item.store.urlLogo} alt={item.store.name} />
              <span>{item.store.name}</span>
              <span>{item.boss.name}</span>
              <span>{item.boss.email}</span>
              <span>{item.store.state}</span>
            </Link>
          ))}
      </div>
    </>
  );
};
