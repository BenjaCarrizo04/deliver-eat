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
  ButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";

const Recibida = (props) => {
  const [recibida, setRecibida] = useState("asap");
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(dayjs());

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxTime":
      case "minTime": {
        console.log(
          dateTime.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY"),
          dateTime.format("HH:mm"),
          dayjs().format("HH:mm")
        );
        return dateTime.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") &&
          dateTime.format("HH:mm") <= dayjs().format("HH:mm")
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
          value={recibida}
          onChange={(e) => setRecibida(e.target.value)}
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
        {recibida === "asap" ? (
          <></>
        ) : (
          <div>
            <Typography sx={{ marginBottom: "20px" }}>
              Seleccionar Fecha y Hora
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                minTime={
                  dayjs().format("DD/MM/YYYY") === dateTime.format("DD/MM/YYYY")
                    ? dayjs()
                    : dayjs().set("hour", 7).set("minutes", 0)
                }
                maxTime={dayjs()
                  .add(7, "day")
                  .set("hour", 23)
                  .set("minutes", 59)}
                maxDate={dayjs().add(6, "day")}
                minDate={dayjs()}
                value={dateTime}
                onError={(newError) => setError(newError)}
                onChange={(newDT) => setDateTime(newDT)}
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
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="normal"
          disabled={error != null && recibida === "date" ? true : false}
          onClick={handleBoton}
        >
          Siguiente
        </Button>
      </Box>
    </div>
  );
};

export default Recibida;
