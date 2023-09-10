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

    const handleOnCalleChange = (e) => {
        let err = error;
        if (e.target.value === "" || e.target.value === undefined) {
            err.calle = "La calle no puede estar vacía";
        } else {
            err.calle = undefined;
        }
        setError({ ...err });
//        props.onCalleChange(e);
    };

    const ciudades = [
        { value: "Cordoba", label: "Córdoba" },
        { value: "Carlos Paz", label: "Carlos Paz" },
    ];
    return (
        <div style={{ margin: "15%" }}>
            <FormControl fullWidth>
                <Typography variant="h4">{props.titulo}</Typography>
                <TextField select label="Ciudad" fullWidth required onChange={props.onCiudadChange} sx={{ margin: "10px 0px 15px 0px" }}>
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
                    <TextField label="Calle" required error={error?.calle ? true : false} helperText={error?.calle} onChange={handleOnCalleChange} sx={{ width: "100%", margin: "10px 10px 15px 0px" }} />
                    <TextField label="Numero" required onChange={props.onNroChange} sx={{ margin: "10px 0px 15px 10px" }} />
                </div>
                <TextField label="Observaciones" multiline minRows={3} onChange={props.onObservacionChange} sx={{ margin: "10px 0px 15px 0px" }} />
            </FormControl>
        </div>
    )
}

export default FormDireccion;
