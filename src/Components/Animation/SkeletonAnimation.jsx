import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {

  return (
    <Grid container wrap="wrap" justifyContent={"center"} height={'85vh'}>
      {Array.from(new Array(20)).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 1, my: 3 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export const SkeletonAnimation = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media />
    </Box>
  );
};
