import React, { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  FormHelperText,
  Grid,
} from "@mui/material";
import FormDireccion from "../helpers/FormDireccion";

const Entrega = (props) => {
  const [error, setError] = useState({
    errorCalle: false,
    errorNro: false,
  });
  let navigate = useNavigate();

  const handleBoton = (e) => {
    navigate("/resumen");
  };

  const routeBack = (e) => {
    navigate("/busca");
  };

  // useEffect(() => {
  //   props.setIsDisplayed(false);
  // });

  return (
    <div className="l-entrega">
      <FormDireccion
        contexto={props.contexto}
        onCalleChange={props.onCalleChange}
        onNroChange={props.onNroChange}
        onObservacionChange={props.onObservacionChange}
        titulo={"¿Donde lo entregamos?"}
        disable={true}
      />

      <Button routeBack={routeBack} handleBoton={handleBoton} />
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
          minHeight: "20%",
        }}
      >
        <Button size="normal" onClick={handleBoton}>
          Siguiente
        </Button>
      </Box>
    </div>
  );
};

export default Entrega;
