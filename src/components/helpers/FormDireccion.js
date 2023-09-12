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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { useState, useEffect } from "react";

const FormDireccion = (props) => {
  const [num, setNum] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.contexto.calle !== "") {
      handleOnCalleChange({ target: { value: props.contexto.calle } });
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
        <TextField
          label="Calle y Número"
          fullWidth
          required
          error={props.error?.calle ? true : false}
          value={props.contexto.calle}
          helperText={props.error?.calle}
          onChange={handleOnCalleChange}
          sx={{ margin: "10px 10px 15px 0px" }}
        />
        <TextField
          label="Observaciones"
          multiline
          inputProps={{ maxLength: 240 }}
          minRows={3}
          value={props.contexto.observacion}
          onChange={props.onObservacionChange}
          sx={{ margin: "10px 0px 15px 0px" }}
        />
        <div>
          <Button onClick={() => setOpen(true)}>
            <FormHelperText variant="standard">
              {props.imagen ? props.imagen.name : ""}
            </FormHelperText>
            <FormHelperText>Seleccionar ubicación desde el mapa</FormHelperText>
            <MapIcon></MapIcon>
          </Button>
        </div>
        <div>
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Seleccione una ubicación"}</DialogTitle>
            <DialogContent>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.258898772187!2d-64.19367616668173!3d-31.44068710260856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2f63bd47aa7%3A0xd84b77324dd71bc8!2sNational%20Technological%20University%2C%20C%C3%B3rdoba%20Regional%20Faculty!5e0!3m2!1sen!2sar!4v1694492547701!5m2!1sen!2sar"
                  width="100%"
                  height="450"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={(e) => setOpen(false)}>
                Cancelar
              </Button>
              <Button size="small" onClick={(e) => setOpen(false)}>
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </FormControl>
    </div>
  );
};

export default FormDireccion;
