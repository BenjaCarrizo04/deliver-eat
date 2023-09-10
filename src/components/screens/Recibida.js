import React, { useState } from "react";
import "../../css/style.css";
import FechaHora from "../components/FechaHora";
// import Tarjeta from "./Tarjeta";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Recibida = (props) => {
  const [antesPosible, setAntesPosible] = useState(false);
  const [Fecha, setFecha] = useState(false);
  const [error, setError] = useState({
    errorFecha: false,
    errorHora: false,
  });
  let navigate = useNavigate();

  const handleAntesPosible = (e) => {
    if (Fecha) {
      setFecha(false);
    }
    setAntesPosible(true);
  };

  const handleFecha = (e) => {
    if (antesPosible) {
      setAntesPosible(false);
    }
    setFecha(true);
  };

  const handleBoton = (e) => {
    let err = error;
    let date = new Date();
    let dateUnaSemana = new Date(date.getTime() + 6.048e8);
    let dateMediaHora = new Date(date.getTime() + 1.8e6);

    let añoIngresado = props.recibida.fecha.substring(0, 4),
      mesIngresado = props.recibida.fecha.substring(5, 7),
      diaIngresado = props.recibida.fecha.substring(8, 10);

    let mesActual = ("0" + (date.getMonth() + 1)).slice(-2),
      añoActual = String(date.getFullYear()),
      diaActual = String(date.getDate());

    let mesUnaSemana = ("0" + (dateUnaSemana.getMonth() + 1)).slice(-2),
      añoUnaSemana = String(dateUnaSemana.getFullYear()),
      diaUnaSemana = String(dateUnaSemana.getDate());

    let horaActual = String(date.getHours());

    let horaMediaHora = String(dateMediaHora.getHours()),
      minutoMediaHora = String(dateMediaHora.getMinutes());

    let horaIngresada = props.recibida.hora.substring(0, 2),
      minutoIngresado = props.recibida.hora.substring(3, 5);

    if (props.recibida.fecha.trim().length === 0) {
      err.errorFecha = true;
      setError({ ...err });
    } else if (añoIngresado !== añoActual && añoIngresado !== añoUnaSemana) {
      err.errorFecha = true;
      setError({ ...err });
    } else if (
      (añoIngresado === añoActual && mesIngresado < mesActual) ||
      (añoIngresado === añoUnaSemana && mesIngresado > mesUnaSemana)
    ) {
      err.errorFecha = true;
      setError({ ...err });
    } else if (
      (añoIngresado === añoActual &&
        mesIngresado === mesActual &&
        diaIngresado < diaActual) ||
      (añoIngresado === añoUnaSemana &&
        mesIngresado === mesUnaSemana &&
        diaIngresado > diaUnaSemana)
    ) {
      err.errorFecha = true;
      setError({ ...err });
    } else {
      err.errorFecha = false;

      setError({ ...err });
    }

    if (!horaIngresada) {
      err.errorHora = true;
      setError({ ...err });
    } else if (Number(horaIngresada) < 8) {
      err.errorHora = true;
      setError({ ...err });
    } else if (Number(horaIngresada) >= 23) {
      err.errorHora = true;
      setError({ ...err });
    } else if (
      añoIngresado === añoActual &&
      mesIngresado === mesActual &&
      diaIngresado === diaActual &&
      Number(horaIngresada) < Number(horaMediaHora)
    ) {
      err.errorHora = true;
      setError({ ...err });
    } else if (
      añoIngresado === añoActual &&
      mesIngresado === mesActual &&
      diaIngresado === diaActual &&
      (horaIngresada === horaActual || horaIngresada === horaMediaHora) &&
      Number(minutoIngresado) < Number(minutoMediaHora)
    ) {
      err.errorHora = true;
      setError({ ...err });
    } else {
      err.errorHora = false;
      setError({ ...err });
    }

    if (!error.errorFecha && !error.errorHora) {
      navigate("/checkout");
    }

    if (antesPosible) {
      navigate("/checkout");
    }
  };
  const routeBack = (e) => {
    navigate("/resumen");
  };

  return (
    <div className="c-recibida">
      <h1 className="c-recibida__titulo">¿Cuando lo querés recibir?</h1>
      <button
        className="c-recibida__seleccion c-recibida__seleccion--1"
        onClick={handleAntesPosible}
      >
        Lo antes posible
      </button>
      <button
        className="c-recibida__seleccion c-recibida__seleccion--2"
        onClick={handleFecha}
      >
        En una fecha/hora particular
      </button>

      {Fecha ? (
        <FechaHora
          recibida={props.recibida}
          onFechaRecibidaChange={props.onFechaRecibidaChange}
          onHoraRecibidaChange={props.onHoraRecibidaChange}
          error={error}
        ></FechaHora>
      ) : (
        <div></div>
      )}

      <Button routeBack={routeBack} handleBoton={handleBoton} />
    </div>
  );
};

export default Recibida;
