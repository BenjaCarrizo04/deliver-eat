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
  let navigate = useNavigate();

  const [error, setError] = useState({
    calle: undefined,
  });

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
    <div style={{ margin: "15%" }}>
      <FormDireccion
        contexto={props.contexto}
        onCalleChange={props.onCalleChange}
        onNroChange={props.onNroChange}
        onObservacionChange={props.onObservacionChange}
        onCiudadChange={props.onCiudadChange}
        error={error}
        setError={setError}
        titulo={"¿Donde lo buscamos?"}
        disable={false}
      />
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          minHeight: "20%",
        }}
      >
        <Button size="small" onClick={routeBack}>
          Atras
        </Button>
        <Button
          size="small"
          disabled={
            Object.keys(error).some(
              (x) => error[x] === undefined || error[x] !== ""
            ) > 0
          }
          onClick={handleBoton}
        >
          Siguiente
        </Button>
      </Box>
    </div>
  );
};

export default Busca;
