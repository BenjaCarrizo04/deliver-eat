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
import { useState, useEffect } from "react";

const FormDireccion = (props) => {
  const [num, setNum] = useState();

  useEffect(() => {
    if (props.contexto.calle !== "") {
      handleOnCalleChange({ target: { value: props.contexto.calle } });
      handleOnNroChange({ target: { value: props.contexto.nro } });
    }
  }, []);

  const handleOnCalleChange = (e) => {
    let err = props.error;
    if (e.target.value === "") {
      err.calle = "La calle no puede estar vacía";
    } else {
      err.calle = "";
    }
    props.setError({ ...err });
    props.onCalleChange(e);
  };

  const handleOnNroChange = (e) => {
    let err = props.error;
    if (e.target.value === "") {
      console.log(e.target.value);
      err.nro = "El número no puede estar vacío";
    } else {
      err.nro = "";
    }
    props.setError({ ...err });
    props.onNroChange(e);
  };

  const ciudades = [
    { value: "cordoba", label: "Córdoba" },
    { value: "carlos paz", label: "Carlos Paz" },
  ];

  return (
    <div>
      <FormControl fullWidth>
        <Typography>{props.titulo}</Typography>
        <TextField
          select
          label="Ciudad"
          fullWidth
          disabled={props.disabled}
          required
          value={props.contexto.ciudad}
          onChange={props.onCiudadChange}
          sx={{ margin: "10px 0px 15px 0px" }}
        >
          {ciudades.map((ciudad) => (
            <MenuItem key={ciudad.value} value={ciudad.value}>
              {ciudad.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ display: "flex" }}>
          <TextField
            label="Calle"
            required
            error={props.error?.calle ? true : false}
            value={props.contexto.calle}
            helperText={props.error?.calle}
            onChange={handleOnCalleChange}
            sx={{ width: "75%", margin: "10px 10px 15px 0px" }}
          />
          <TextField
            label="Número"
            required
            error={props.error?.nro ? true : false}
            value={props.contexto.nro}
            helperText={props.error?.nro}
            type="number"
            onChange={handleOnNroChange}
            sx={{ margin: "10px 0px 15px 10px" }}
          />
        </div>
        <TextField
          label="Observaciones"
          multiline
          minRows={3}
          value={props.contexto.observacion}
          onChange={props.onObservacionChange}
          sx={{ margin: "10px 0px 15px 0px" }}
        />
      </FormControl>
    </div>
  );
};

export default FormDireccion;
