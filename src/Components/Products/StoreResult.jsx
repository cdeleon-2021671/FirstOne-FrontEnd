import React from "react";

export const StoreResult = ({ store }) => {
  return (
    <>
      {store && (
        <div className="all-stores">
          {store.map(({ name, urlLogo, description }, key) => {
            return (
              <div key={key} className="all-stores-content">
                <img src={urlLogo} alt={name} />
                <div className="all-stores-content-information">
                  <h2>{name}</h2>
                  <span>{description}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
