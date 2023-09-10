import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";

import FormaPago from "../components/FormaPago";
import Total from "../components/Total";
import Button from "../components/Button";

const Resumen = (props) => {
  const [errorTarjeta, setErrorTarjeta] = useState({
    errorTarjetaNro: false,
    errorTarjetaNombre: false,
    errorTarjetaMmaa: false,
    errorTarjetaCvv: false,
  });

  const [formaPago, setFormaPago] = useState({
    tarjeta: false,
    efectivo: false,
  });

  const [errorEfectivo, setErrorEfectivo] = useState(false);

  let navigate = useNavigate();

  const onEfectivoClick = (e) => {
    let fp = formaPago;
    if (formaPago.tarjeta) {
      fp.tarjeta = false;
    }
    fp.efectivo = true;
    setFormaPago({ ...fp });
  };

  const onTarjetaClick = (e) => {
    let fp = formaPago;
    if (formaPago.efectivo) {
      fp.efectivo = false;
    }
    fp.tarjeta = true;
    setFormaPago({ ...fp });
  };

  const handleBoton = (e) => {
    let err = errorTarjeta;
    let mmTarjeta = props.tarjeta.mmaa.trim().substring(0, 2);
    let aaTarjeta = props.tarjeta.mmaa.trim().substring(3, 5);
    let date = new Date();

    let mmActual = ("0" + (date.getMonth() + 1)).slice(-2);
    let aaActual = ("0" + date.getFullYear()).slice(-2);

    if (props.tarjeta.mmaa.trim().length !== 5) {
      err.errorTarjetaMmaa = true;
      setErrorTarjeta({ ...err });
    } else if (aaTarjeta < aaActual) {
      err.errorTarjetaMmaa = true;
      setErrorTarjeta({ ...err });
    } else if (aaTarjeta === aaActual && mmTarjeta < mmActual) {
      err.errorTarjetaMmaa = true;
      setErrorTarjeta({ ...err });
    } else {
      err.errorTarjetaMmaa = false;
      setErrorTarjeta({ ...err });
    }

    if (props.tarjeta.cvv.trim().length !== 3) {
      err.errorTarjetaCvv = true;
      setErrorTarjeta({ ...err });
    } else {
      err.errorTarjetaCvv = false;
      setErrorTarjeta({ ...err });
    }

    if (props.tarjeta.nombre.trim().length === 0) {
      err.errorTarjetaNombre = true;
      setErrorTarjeta({ ...err });
    } else {
      err.errorTarjetaNombre = false;
      setErrorTarjeta({ ...err });
    }

    if (props.tarjeta.numero.trim().length !== 19) {
      err.errorTarjetaNro = true;
      setErrorTarjeta({ ...err });
    } else {
      err.errorTarjetaNro = false;
      setErrorTarjeta({ ...err });
    }

    if (props.efectivo === 0 || props.efectivo < props.precio) {
      setErrorEfectivo(true);
    } else {
      setErrorEfectivo(false);

      navigate("/recibida");
    }

    if (
      formaPago.tarjeta &&
      !errorTarjeta.errorTarjetaNro &&
      !errorTarjeta.errorTarjetaNombre &&
      !errorTarjeta.errorTarjetaMmaa &&
      !errorTarjeta.errorTarjetaCvv
    ) {
      navigate("/recibida");
    }
  };

  const routeBack = (e) => {
    navigate("/entrega");
  };

  useEffect(() => {
    props.setIsDisplayed(true);
  });

  return (
    <div className="l-resumen">
      <Total precio={props.precio} />

      <FormaPago
        tarjeta={props.tarjeta}
        onNumeroTarjetaChange={props.onNumeroTarjetaChange}
        onNombreTarjetaChange={props.onNombreTarjetaChange}
        onCvvTarjetaChange={props.onCvvTarjetaChange}
        onMmaaTarjetaChange={props.onMmaaTarjetaChange}
        onMontoEfectivoChange={props.onMontoEfectivoChange}
        errorTarjeta={errorTarjeta}
        errorEfectivo={errorEfectivo}
        efectivo={props.efectivo}
        formaPago={formaPago}
        onEfectivoClick={onEfectivoClick}
        onTarjetaClick={onTarjetaClick}
      ></FormaPago>

      <Button routeBack={routeBack} handleBoton={handleBoton} />
    </div>
  );
};

export default Resumen;
