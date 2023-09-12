import React, { useMemo, useState } from "react";
// import FechaHora from "../components/FechaHora";
// import Tarjeta from "./Tarjeta";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

const Recibida = (props) => {
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxTime":
      case "minTime": {
        return props.fechaHoraRecibida.format("DD/MM/YYYY") ===
          dayjs().format("DD/MM/YYYY") &&
          props.fechaHoraRecibida.format("HH:mm") > "07:00"
          ? "El horario tiene que ser posterior al actual"
          : "El horario tiene que estar entre las 07:00 y las 23:59";
      }
      case "maxDate":
      case "minDate": {
        return "La fecha tiene que estar entre hoy y dentro de una semana";
      }
      default: {
        return "";
      }
    }
  }, [error]);

  let navigate = useNavigate();

  const handleBoton = (e) => {
    navigate("/checkout");
  };

  const routeBack = (e) => {
    navigate("/resumen");
  };

  const handleOnRecibidaChange = (e) => {
    props.onRecibidaChange(e);
  };

  const handleOnFechaHoraRecibidaChange = (newDT) => {
    props.onFechaHoraRecibidaChange(newDT);
  };

  return (
    <div style={{ margin: "15%" }}>
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
        }}
      >
        <Typography sx={{ marginBottom: "20px" }}>
          ¿Cuándo lo querés recibir?
        </Typography>
        <RadioGroup
          row
          sx={{ display: "inline-flex" }}
          value={props.recibida}
          onChange={handleOnRecibidaChange}
        >
          <FormControlLabel
            value="asap"
            control={<Radio />}
            label="Lo antes posible"
          />
          <FormControlLabel
            value="date"
            control={<Radio />}
            label="Elegir fecha y hora"
          />
        </RadioGroup>
        {props.recibida === "asap" ? (
          <></>
        ) : (
          <div>
            <Typography sx={{ marginBottom: "20px" }}>
              Seleccionar Fecha y Hora
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                minTime={
                  dayjs().format("DD/MM/YYYY") ===
                    props.fechaHoraRecibida.format("DD/MM/YYYY") &&
                  dayjs().format("HH:mm") > "07:00"
                    ? dayjs()
                    : dayjs().set("hour", 7).set("minutes", 0)
                }
                maxTime={dayjs()
                  .add(7, "day")
                  .set("hour", 23)
                  .set("minutes", 59)}
                maxDate={dayjs().add(6, "day")}
                minDate={dayjs()}
                value={props.fechaHoraRecibida}
                onError={(newError) => setError(newError)}
                onChange={(newDT) => handleOnFechaHoraRecibidaChange(newDT)}
                closeOnSelect={false}
                ampm={false}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </FormControl>
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
          disabled={error != null && props.recibida === "date" ? true : false}
          onClick={handleBoton}
        >
          Finalizar
        </Button>
      </Box>
    </div>
  );
};

export default Recibida;
