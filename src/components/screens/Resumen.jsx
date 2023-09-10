import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";

const Resumen = (props) => {
  const [errorTarjeta, setErrorTarjeta] = useState({
    efectivo: undefined,
    numero: undefined,
    nombre: undefined,
    maa: undefined,
    errorTarjetaCvv: undefined,
  });
  const [formaPago, setFormaPago] = useState("efectivo");

  let navigate = useNavigate();

  // clean all parameters when changing pay method
  useEffect(() => {
    props.onNumeroTarjetaChange({ target: { value: "" } });
    props.onNombreTarjetaChange({ target: { value: "" } });
    props.onCvvTarjetaChange({ target: { value: "" } });
    props.onMmaaTarjetaChange({ target: { value: "" } });
    props.onMontoEfectivoChange({ target: { value: "" } });
    setErrorTarjeta({
      efectivo: undefined,
      errorTarjetaNro: undefined,
      errorTarjetaNombre: undefined,
      errorTarjetaMmaa: undefined,
      errorTarjetaCvv: undefined,
    });
  }, [formaPago]);

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
    navigate("/recibida");
  };

  const routeBack = (e) => {
    navigate("/entrega");
  };

  const onMontoEfectivoChange = (e) => {
    let err = errorTarjeta;
    if (
      e.target.value === "0" ||
      e.target.value === undefined ||
      e.target.value === ""
    ) {
      err.efectivo = "El monto es incorrecto";
    } else {
      err.efectivo = "";
    }
    setErrorTarjeta({ ...err });
    props.onMontoEfectivoChange(e);
  };

  const onNumeroTarjetaChange = (e) => {
    let err = errorTarjeta;
    if (e.target.value.length !== 16) {
      err.errorTarjetaNro = "El número es incorrecto";
    } else {
      err.errorTarjetaNro = "";
    }
    setErrorTarjeta({ ...err });
    props.onNumeroTarjetaChange(e);
  };

  const onNombreTarjetaChange = (e) => {
    let err = errorTarjeta;
    if (e.target.value.trim().length === 0) {
      err.errorTarjetaNombre = "El nombre es incorrecto";
    } else {
      err.errorTarjetaNombre = "";
    }
    setErrorTarjeta({ ...err });
    props.onNombreTarjetaChange(e);
  };

  const onCvvTarjetaChange = (e) => {
    let err = errorTarjeta;
    if (e.target.value.length !== 3) {
      err.errorTarjetaCvv = "El código es incorrecto";
    } else {
      err.errorTarjetaCvv = "";
    }
    setErrorTarjeta({ ...err });
    props.onCvvTarjetaChange(e);
  };

  const onMmaaTarjetaChange = (e) => {
    let err = errorTarjeta;
    if (e.target.value.trim().length !== 5) {
      err.errorTarjetaMmaa = "La fecha es incorrecta";
    } else {
      err.errorTarjetaMmaa = "";
    }
    setErrorTarjeta({ ...err });
    props.onMmaaTarjetaChange(e);
  };

  const validateSave = () => {
    if (formaPago === "efectivo") {
      return (
        Object.keys(errorTarjeta).some((x) =>
          x === "monto" ? errorTarjeta[x].monto !== 0 : false
        ) > 0
      );
    } else {
      return Object.keys(errorTarjeta).some((x) =>
        x !== "monto"
          ? errorTarjeta[x] === undefined || errorTarjeta[x] !== ""
          : false
      );
    }
  };
  return (
    <div style={{ margin: "15%" }}>
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          minHeight: "80%",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          ¿Cómo vas a pagar?
        </Typography>
        <FormLabel>Forma de pago</FormLabel>
        <RadioGroup
          defaultValue="efectivo"
          onChange={(e) => setFormaPago(e.target.value)}
        >
          <FormControlLabel
            value="efectivo"
            label="Efectivo"
            control={<Radio />}
          ></FormControlLabel>
          <FormControlLabel
            value="tarjeta"
            label="Tarjeta de Débito o Crédito"
            control={<Radio />}
          ></FormControlLabel>
        </RadioGroup>

        <br />
        <Divider variant="fullWidth" />
        <br />
        {formaPago === "efectivo" ? (
          <div>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              ¿Con cuánto vas a pagar?
            </Typography>
            <TextField
              label="Monto"
              type="number"
              required
              sx={{ margin: "10px 0px 15px 0px" }}
              fullWidth
              onChange={onMontoEfectivoChange}
              error={errorTarjeta.efectivo}
              helperText={errorTarjeta.efectivo}
              value={props.efectivo}
            ></TextField>
          </div>
        ) : (
          <div>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              ¿Con qué tarjeta vas a pagar?
            </Typography>
            <TextField
              label="Número de tarjeta"
              type="number"
              required
              sx={{ margin: "10px 0px 15px 0px" }}
              fullWidth
              onChange={onNumeroTarjetaChange}
              error={errorTarjeta.errorTarjetaNro}
              helperText={
                errorTarjeta.errorTarjetaNro ? "El número es incorrecto" : ""
              }
              value={props.tarjeta.numero}
            ></TextField>
            <TextField
              label="Nombre y apellido"
              type="text"
              required
              sx={{ margin: "10px 0px 15px 0px" }}
              fullWidth
              onChange={onNombreTarjetaChange}
              error={errorTarjeta.errorTarjetaNombre}
              helperText={
                errorTarjeta.errorTarjetaNombre ? "El nombre es incorrecto" : ""
              }
              value={props.tarjeta.nombre}
            ></TextField>
            <div style={{ display: "flex" }}>
              <TextField
                label="MM/AA"
                type="text"
                required
                fullWidth
                sx={{ margin: "10px 10px 15px 0px" }}
                onChange={onMmaaTarjetaChange}
                error={errorTarjeta.errorTarjetaMmaa}
                helperText={
                  errorTarjeta.errorTarjetaMmaa ? "La fecha es incorrecta" : ""
                }
                value={props.tarjeta.mmaa}
              ></TextField>
              <TextField
                label="CVV"
                type="number"
                required
                fullWidth
                sx={{ margin: "10px 0px 15px 0px" }}
                onChange={onCvvTarjetaChange}
                error={errorTarjeta.errorTarjetaCvv}
                helperText={
                  errorTarjeta.errorTarjetaCvv ? "El CVV es incorrecto" : ""
                }
                value={props.tarjeta.cvv}
              ></TextField>
            </div>
          </div>
        )}
      </FormControl>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
          minHeight: "20%",
        }}
      >
        <Button
          size="normal"
          disabled={
            formaPago === "efectivo"
              ? Object.keys(errorTarjeta).some((x) =>
                  x === "efectivo" ? errorTarjeta[x] !== "" : false
                ) > 0
              : Object.keys(errorTarjeta).some((x) =>
                  x !== "efectivo"
                    ? errorTarjeta[x] === undefined || errorTarjeta[x] !== ""
                    : false
                )
          }
          onClick={handleBoton}
        >
          Siguiente
        </Button>
      </Box>
    </div>

    /*     <div className="l-resumen">
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
    </div> */
  );
};

export default Resumen;
