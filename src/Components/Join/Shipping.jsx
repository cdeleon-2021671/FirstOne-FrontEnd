import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Shipping = () => {
  const { storeId } = useParams();
  const [shipping, setShipping] = useState([]);

  return (
    <div className="register-form">
      <div className="form">
        <div className="container step2">
          <div className="container-form">
            <span className="container-form-title">Métodos de envío</span>
            <div className="container-form-data">
              <label htmlFor="method1">Método 1</label>
              <input
                type="text"
                id={`method1`}
                name="method1"
              />
            </div>
            <Link
              className="container-btn"
              to={`/join/trade-online/step2/payment/${storeId}`}
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
