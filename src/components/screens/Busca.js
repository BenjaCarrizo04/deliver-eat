import React, { useState } from "react";
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

const Busca = (props) => {
  const [error, setError] = useState({ errorCalle: false, errorNro: false });
  let navigate = useNavigate();

  const handleBoton = (e) => {
    navigate("/entrega");
  };

  const routeBack = (e) => {
    navigate("/");
  };

  // useEffect(() => {
  //   prop.onCalleChange();
  // }, [prop.busca.calle]);

  return (
    <div className="l-busca">
      <FormDireccion
        contexto={props.contexto}
        onCalleChange={props.onCalleChange}
        onNroChange={props.onNroChange}
        onObservacionChange={props.onObservacionChange}
        onCiudadChange={props.onCiudadChange}
        titulo={"¿Donde lo buscamos?"}
        disable={false}
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

export default Busca;
