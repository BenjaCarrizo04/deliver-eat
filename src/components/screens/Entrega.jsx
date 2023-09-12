import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FormDireccion from "../helpers/FormDireccion";

const Entrega = (props) => {
  const [error, setError] = useState({
    calle: undefined,
  });

  let navigate = useNavigate();

  const handleBoton = (e) => {
    navigate("/resumen");
  };

  const routeBack = (e) => {
    navigate("/busca");
  };

  return (
    <div style={{ margin: "15%" }}>
      <FormDireccion
        contexto={props.contexto}
        onCalleChange={props.onCalleChange}
        onNroChange={props.onNroChange}
        onObservacionChange={props.onObservacionChange}
        error={error}
        setError={setError}
        titulo={"¿Donde lo entregamos?"}
        disabled={true}
      />
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
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

export default Entrega;
