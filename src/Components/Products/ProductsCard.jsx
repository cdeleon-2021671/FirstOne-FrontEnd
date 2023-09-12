import React, { useRef } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Products.scss";
import { Link } from "react-router-dom";

export const ProductsCard = ({ products, title, fnReload = undefined }) => {
  const containers = products && products.map(() => useRef(null));

  const moveRight = (index) => {
    const container = containers[index].current;
    const { clientWidth } = container;
    const { scrollWidth } = container;
    const { scrollLeft } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    if (scrollRight == 0) container.scrollLeft = 0;
    else container.scrollLeft += 500;
  };

  const moveLeft = (index) => {
    const container = containers[index].current;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    if (scrollLeft == 0) container.scrollLeft = scrollWidth;
    else container.scrollLeft -= 500;
  };

  return (
    <>
      {products && (
        <div className="productsContainer">
          <h1>{title}</h1>
          {products.map((elements, key) => (
            <div key={key} className="products">
              <button onClick={() => moveLeft(key)} className="slice">
                <MdOutlineArrowBackIos />
              </button>
              <div className="singleProduct" ref={containers[key]}>
                {elements.map((item, key) => (
                  <MediaCard key={key} {...item} fnReload={fnReload} />
                ))}
              </div>
              <button className="slice" onClick={() => moveRight(key)}>
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const MediaCard = ({ image, name, price, _id, storeId, fnReload}) => {
  return (
    <Card sx={{ minWidth: 245 }}>
      <Link to={`/product-details/${_id}`} onClick={fnReload}>
        <CardActionArea>
          <CardMedia component="img" height="246.6" image={image} alt={name} />
          <CardContent style={{ height: "100%" }}>
            <Typography variant="body2">
              {name} | <b>{storeId.name}</b>
            </Typography>
            <Typography variant="h6" color="div">
              Q{price.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
