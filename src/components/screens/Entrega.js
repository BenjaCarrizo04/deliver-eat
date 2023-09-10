import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { useNavigate } from "react-router-dom";

import FormDireccion from "../components/FormDireccion";
import Button from "../components/Button";

const Entrega = (props) => {
  const [error, setError] = useState({
    errorCalle: false,
    errorNro: false,
  });
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
      navigate("/resumen");
    }
  };
  const routeBack = (e) => {
    navigate("/busca");
  };

  useEffect(() => {
    props.setIsDisplayed(false);
  });

  return (
    <div className="l-entrega">
      <FormDireccion
        contexto={props.contexto}
        onCalleChange={props.onCalleChange}
        onNroChange={props.onNroChange}
        onObservacionChange={props.onObservacionChange}
        setIsDisplayed={props.setIsDisplayed}
        error={error}
        titulo={"¿Donde lo entregamos?"}
        disable={true}
      />

      <Button routeBack={routeBack} handleBoton={handleBoton} />
    </div>
  );
};

export default Entrega;
