import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import CurrencyTextField from "../helpers/TextMoneda";
import dayjs from "dayjs";

const Resumen = (props) => {
  const [errorTarjeta, setErrorTarjeta] = useState({
    efectivo: undefined,
    numero: undefined,
    nombre: undefined,
    maa: undefined,
    errorTarjetaCvv: undefined,
  });
  const [formaPago, setFormaPago] = useState("efectivo");
  const [monto, setMonto] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    setMonto(500);
  }, []);

  // clean all parameters when changing pay method
  useEffect(() => {
    props.onNumeroTarjetaChange({ target: { value: "" } });
    props.onNombreTarjetaChange({ target: { value: "" } });
    props.onCvvTarjetaChange({ target: { value: "" } });
    props.onMmaaTarjetaChange({ target: { value: "" } });
    props.onMontoEfectivoChange(0);
    setErrorTarjeta({
      efectivo: undefined,
      errorTarjetaNro: undefined,
      errorTarjetaNombre: undefined,
      errorTarjetaMmaa: undefined,
      errorTarjetaCvv: undefined,
    });
  }, [formaPago]);

  useEffect(() => {
    if (props.efectivo !== 0) {
      if (formaPago === "efectivo") {
        onMontoEfectivoChange({ target: { value: props.efectivo } });
      } else {
        onNumeroTarjetaChange({ target: { value: props.tarjeta.numero } });
        onNombreTarjetaChange({ target: { value: props.tarjeta.nombre } });
        onCvvTarjetaChange({ target: { value: props.tarjeta.cvv } });
        onMmaaTarjetaChange({ target: { value: props.tarjeta.mmaa } });
      }
    }
  }, []);

  const handleBoton = (e) => {
    navigate("/recibida");
  };

  const routeBack = (e) => {
    navigate("/entrega");
  };

  const onMontoEfectivoChange = (e) => {
    let err = errorTarjeta;
    if (e === 0 || e == "") {
      err.efectivo = "El monto es incorrecto";
    } else if (e < monto + props.monto) {
      err.efectivo = "El monto es menor al total";
    } else {
      err.efectivo = "";
    }
    setErrorTarjeta({ ...err });
    props.onMontoEfectivoChange(e);
  };

  const onNumeroTarjetaChange = (e) => {
    let err = errorTarjeta;
    if (e.target.value.length > 16) {
    } else if (e.target.value.length === 16 && e.target.value[0] == 4) {
      const cardDigits = e.target.value.split("").map(Number);
      // Reverse the card digits
      cardDigits.reverse();
      // Double every second digit starting from the right
      for (let i = 1; i < cardDigits.length; i += 2) {
        cardDigits[i] *= 2;
        if (cardDigits[i] > 9) {
          cardDigits[i] -= 9;
        }
      }
      // Calculate the checksum (sum of all digits)
      const checksum = cardDigits.reduce((acc, digit) => acc + digit, 0);
      // Check if the checksum is divisible by 10
      if (checksum % 10 === 0) {
        err.errorTarjetaNro = "";
      } else {
        err.errorTarjetaNro = "El número es incorrecto";
      }
      props.onNumeroTarjetaChange(e);
    } else {
        err.errorTarjetaNro = "El número es incorrecto";
        props.onNumeroTarjetaChange(e);
    }
    setErrorTarjeta({ ...err });
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

    if (e.target.value.length !== 5 || !validateDate(e.target.value)) {
      err.errorTarjetaMmaa = "La fecha es inválida";
    } else {
      err.errorTarjetaMmaa = "";
    }
    setErrorTarjeta({ ...err });
    props.onMmaaTarjetaChange(e);
  };

  const validateDate = (dateString) => {
    const [month, year] = dateString.split("/").map(Number);
    let date = null;
    let currentYear = new Date().getFullYear();
    if (month >= 1 && month <= 12 && 2000 + year >= currentYear) {
      const day = 1;
      date = dayjs().set("year", 2000+year).set("month", month-1).endOf("month").toDate();
      if (date === "Invalid Date" || date < new Date()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <div style={{ margin: "15%" }}>
      <FormControl sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ marginBottom: "20px" }}>Resumen de pedido</Typography>
      </FormControl>
      {props.monto != 0 ? (
        <>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>
              Precio producto ${Math.round(props.monto * 100) / 100}
            </Typography>
            <br />
          </div>
          <Divider sx={{ margin: "5px 0px 5px 0px" }} variant="fullWidth" />
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Costo envío $500</Typography>
        <br />
      </div>
      <Divider sx={{ margin: "5px 0px 5px 0px" }} variant="fullWidth" />
      <Typography
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Total: ${Math.round((monto + props.monto) * 100) / 100}
      </Typography>
      <br />
      <Divider sx={{ margin: "5px 0px 5px 0px" }} variant="fullWidth" />
      <br />
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          minHeight: "80%",
        }}
      >
        <Typography sx={{ marginBottom: "20px" }}>
          ¿Cómo vas a pagar?
        </Typography>
        <FormLabel>Forma de pago</FormLabel>
        <RadioGroup
          sx={{ margin: "5px 0px 5px 0px" }}
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
        <Divider variant="middle" />
        <br />
        {formaPago === "efectivo" ? (
          <div>
            <Typography
              sx={{ marginBottom: "20px", margin: "30px 0px 10px 0px" }}
            >
              ¿Con cuánto vas a pagar?
            </Typography>
            <CurrencyTextField
              label="Monto"
              variant="outlined"
              value={props.efectivo}
              currencySymbol="$"
              fullWidth
              minimumValue="0"
              outputFormat="number"
              decimalCharacter=","
              digitGroupSeparator="."
              onChange={(_, value) => onMontoEfectivoChange(value)}
              error={errorTarjeta?.efectivo ? true : false}
              helperText={errorTarjeta?.efectivo}
            />
          </div>
        ) : (
          <div>
            <Typography
              sx={{ marginBottom: "20px", margin: "5px 0px 5px 0px" }}
            >
              ¿Con qué tarjeta vas a pagar?
            </Typography>
            <TextField
              label="Número de tarjeta"
              required
              sx={{ margin: "10px 0px 15px 0px" }}
              inputProps={{ maxLength: 16 }}
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
                inputProps={{ maxLength: 5 }}
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
  );
};

export default Resumen;
