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
    let err = error;
    if (props.contexto.calle.trim().length === 0) {
      err.errorCalle = true;
      setError({ ...err });
    } else {
      err.errorCalle = false;
      setError({ ...err });
    }

    if (props.contexto.nro.trim().length === 0) {
      err.errorNro = true;
      setError({ ...err });
    } else {
      err.errorNro = false;
      setError({ ...err });
    }

    if (!error.errorCalle && !error.errorNro) {
      navigate("/entrega");
    }
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
        setIsDisplayed={props.setIsDisplayed}
        error={error}
        titulo={"¿Donde lo buscamos?"}
        disable={false}
      />

      <Button routeBack={routeBack} handleBoton={handleBoton} />
    </div>
  );
};

export default Busca;
