import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from '../../Index';
import "./ProductsCard.scss";
import $ from "jquery";

export const ProductsCard = ({ products, tags }) => {
  const {offers} = useContext(AuthContext);
  const [myOffers, setMyOffers] = useState(null);

  useEffect(() => {
    $(".more-options")[0].scrollLeft = 0;
  }, [tags]);

  useEffect(()=>{
    const allOffers = [];
    offers.forEach(({_id}, key) => {
      allOffers.push(_id);
    });
    setMyOffers(allOffers);
  }, [products]);

  return (
    <>
      {products && (
        <div id="products-card">
          {tags && tags.length !== 0 && (
            <div className="more-options">
              <label>Ver más:</label>
              {tags.map((item, key) => (
                <Link key={key} to={`/products/${item}`}>
                  {item}
                </Link>
              ))}
            </div>
          )}
          <div className="products">
            {products.map(
              ({ _id, image, price, name, storeId, stock, salePrice }, key) => (
                <Link key={key} to={`/product/${name}/${_id}`}>
                  <img src={image} alt={name} />
                  {salePrice || myOffers && myOffers.includes(_id) ? <small>Oferta</small> : null}
                  <div>
                    <h1>
                      {name} - {storeId.name}
                    </h1>
                    <div className="price">
                      {salePrice && salePrice != price &&(
                        <div>
                          <span>-20%</span>
                        </div>
                      )}
                      <span>Q{price.toFixed(2).split(".")[0]}.</span>
                      <span className="little">
                        {price.toFixed(2).split(".")[1]}
                      </span>
                    </div>
                    {salePrice && salePrice != price ? (
                      <div className="salePrice">
                        <span className="tipico">Q{salePrice.toFixed(2)}</span>
                        <span
                          style={{
                            color:
                              stock == "Disponible" ? "#28B463" : "#E74C3C",
                          }}
                          className="stock"
                        >
                          {stock}
                        </span>
                      </div>
                    ) : (
                      <div className="salePrice">
                        <span
                          style={{
                            color:
                              stock == "Disponible" ? "#28B463" : "#E74C3C",
                          }}
                          className="stock"
                        >
                          {stock}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
