import React from "react";

export const Payment = () => {
  return (
    <div className="register-form">
      <div className="form">
        <div className="container step2">
          <div className="container-form">
            <span className="container-form-title">Métodos de pago</span>
            <div className="container-form-data">
              <label htmlFor="xml">Método 1:</label>
              <input type="text" id="xml" name="xml" required />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
