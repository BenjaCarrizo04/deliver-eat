import React from "react";
import "../../css/style.css";
import { Typography } from "@mui/material";

const CheckOut = () => {
  return (
    <div className="c-checkout">
      <svg
        version="1.1"
        id="tick"
        x="0px"
        y="0px"
        viewBox="0 0 37 37"
        className="c-checkout__svg"
      >
        <path
          d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
          className="c-checkout__path c-checkout__path--circ"
        />
        <polyline
          className="c-checkout__polyline c-checkout__polyline--tick"
          points="11.6,20 15.9,24.2 26.4,13.8 "
        />
      </svg>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "50px",
          alignItems: "center",
        }}
      >
        Pedido registrado con éxito
      </Typography>
    </div>
  );
};

export default CheckOut;
