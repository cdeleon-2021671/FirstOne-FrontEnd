import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export const FiltersCard = ({ products }) => {
  return (
    <div className="filtersContainer">
      <h1>Ver más: </h1>
      <div className="singleFilter">
        {products &&
          products.map((item, key) => <MediaCard key={key} {...item} />)}
      </div>
    </div>
  );
};

const MediaCard = ({ image, name, price, _id, storeId }) => {
  return (
    <Card>
      <Link to={`/product-details/${_id}`}>
        <CardActionArea sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
              objectPosition: "left",
              width: "17vw",
              height: "15vw",
            }}
            image={image}
            alt={name}
          />
          <CardContent style={{ height: "100%" }}>
            <Typography>
              {name} | <b>{storeId.name}</b> <br /> <br /> 4.2 views
            </Typography>
            <br />
            <Typography variant="h5" color="div">
              Q{price.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
