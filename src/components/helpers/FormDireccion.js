import {
    Box,
    Select,
    FormControl,
    TextField,
    MenuItem,
    Typography,
    Button,
    FormHelperText,
    Grid,
    InputLabel,
} from "@mui/material";
import { useState } from "react";

const FormDireccion = (props) => {
    const [error, setError] = useState({});
    const [num, setNum] = useState();

    const handleOnCalleChange = (e) => {
        let err = error;
        if (e.target.value === "" || e.target.value === undefined) {
            err.calle = "La calle no puede estar vacía";
        } else {
            err.calle = undefined;
        }
        setError({ ...err });
        props.onCalleChange(e);
    };


    const handleOnNroChange = (e) => {
        let err = error;
        if (e.target.value === "" || e.target.value === undefined) {
            console.log(e.target.value);
            err.nro = "El número no puede estar vacío";
        } else {
            err.nro = undefined;
        }
        setError({ ...err });
        props.onNroChange(e);
    };

    const ciudades = [
        { value: "cordoba", label: "Córdoba" },
        { value: "carlos paz", label: "Carlos Paz" },
    ];

    return (
        <div style={{ margin: "15%" }}>
            <FormControl fullWidth>
                <Typography variant="h4">{props.titulo}</Typography>
                <TextField select label="Ciudad" fullWidth required value={props.contexto.ciudad} onChange={props.onCiudadChange} sx={{ margin: "10px 0px 15px 0px" }}>
                    {ciudades.map((ciudad) => (
                        <MenuItem
                            key={ciudad.value}
                            value={ciudad.value}
                        >
                            {ciudad.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ display: "flex" }}>
                    <TextField label="Calle" required error={error?.calle ? true : false} value={props.contexto.calle} helperText={error?.calle} onChange={handleOnCalleChange} sx={{ width: "75%", margin: "10px 10px 15px 0px" }} />
                    <TextField label="Número" required error={error?.nro ? true : false} value={props.contexto.nro} helperText={error?.nro} type="number" onChange={handleOnNroChange} sx={{ margin: "10px 0px 15px 10px" }} />
                </div>
                <TextField label="Observaciones" multiline minRows={3} value={props.contexto.observacion} onChange={props.onObservacionChange} sx={{ margin: "10px 0px 15px 0px" }} />
            </FormControl>
        </div>
    )
}

export default FormDireccion;
