import React from "react";
import { Link } from "react-router-dom";
import "./CardProducts.scss";

export const CardProducts = ({ item, fnAction }) => {
  const newOffer = (item.price * 100) / item.salePrice;
  const offer = 100 - newOffer;
  const nameUrl = item.name.replace(/[-[\]{}()*+?.,;:#@<>\\^$|#"']+/g, " ");
  const tagsUrl = item.tags
    .map((element) => element.replace(/[ ]+/g, "-"))
    .join("-");
  const priceUrl = item.price;
  const id = item._id;

  return (
    <Link
      id="item-card"
      className="card"
      key={item._id}
      to={`/${nameUrl.replace(/[ ]+/g, "-")}/${tagsUrl}/${priceUrl}/${id}`}
      onClick={fnAction}
    >
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-information">
        <h3 className="card-information-product" title={item.name}>
          {item.name}
        </h3>
        <span className="card-information-store">
          Vendido por {item.storeId.name}
        </span>
        <div className="price">
          {item.salePrice && (
            <span className="price-porcent">{offer.toFixed(0)}%</span>
          )}
          <div className="price-price">
            {item.salePrice ? (
              <>
                <span>Q{item.salePrice.toFixed(2).split(".")[0]}.</span>
                <span className="little">
                  {item.salePrice.toFixed(2).split(".")[1]}
                </span>
              </>
            ) : (
              <>
                <span>Q{item.price.toFixed(2).split(".")[0]}.</span>
                <span className="little">
                  {item.price.toFixed(2).split(".")[1]}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="card-information-salePrice">
          {item.salePrice && (
            <div className="normal">
              Precio original: &nbsp;
              <span>Q{item.price.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
