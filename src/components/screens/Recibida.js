import React, { useState } from "react";
// import FechaHora from "../components/FechaHora";
// import Tarjeta from "./Tarjeta";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Typography, Box, ButtonGroup, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from "@mui/x-date-pickers";

const Recibida = (props) => {
    const [recibida, setRecibida] = useState("asap");
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
        <div style={{ margin: "15%" }}>
            <FormControl
                fullWidth
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "stretch",
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    ¿Cuándo lo querés recibir?
                </Typography>
                <RadioGroup row sx={{ display: "inline-flex" }} value={recibida} onChange={(e) => setRecibida(e.target.value)}>
                    <FormControlLabel value="asap" control={<Radio />} label="Lo antes posible" />
                    <FormControlLabel value="date" control={<Radio />} label="Elegir fecha y hora" />
                </RadioGroup>
                {recibida === "asap" ? (<></>) : (
                    <div>
                        <Typography variant="h4" sx={{ marginBottom: "20px" }}>Seleccionar Fecha y Hora</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                defaultValue={dayjs()}
                                minTime={dayjs().set('hour', 7).startOf('hour')}
                                maxTime={dayjs().add(7, 'day').set('hour', 23).set('minutes', 59)}
                                maxDate={dayjs().add(6, 'day')}
                                disablePast
                                closeOnSelect={false}
                            />
                        </LocalizationProvider>
                    </div>)}
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
        </div >
    );
};

export default Recibida;
