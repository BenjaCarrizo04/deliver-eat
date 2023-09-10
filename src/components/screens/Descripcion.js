import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  FormHelperText,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const Descripcion = (props) => {
  const hiddenFileInput = React.useRef(null);

  const [error, setError] = useState({});

  let navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleBoton = (e) => {
    const err = error;
    if (props.descripcion.trim().length === 0) {
      err.errorDescripcion = true;
      setError({ ...err });
    } else {
      err.errorDescripcion = false;
      setError({ ...err });
    }

    if (props.imagen.size * 1e-6 > 5.0) {
      err.errorImagen = true;
      setError({ ...err });
    } else if (props.imagen.type !== "image/jpeg") {
      err.errorImagen = true;
      setError({ ...err });
    } else {
      err.errorImagen = false;
      setError({ ...err });
    }

    if (props.imagen === "") {
      err.errorImagen = false;
      setError({ ...err });
    }

    if (!error.errorDescripcion && !error.errorImagen) {
      navigate("/busca");
    }
  };

  const routeBack = (e) => {
    navigate("/");
  };

  const handleOnDescriptionChange = (e) => {
    // validate descpription is not empty
    let err = error;
    if (e.target.value === "" || e.target.value === undefined) {
      err.description = "La descripcion no puede estar vacia";
    } else {
      err.description = undefined;
    }
    setError({ ...err });
    props.onDescripcionChange(e);
  };

  const handleOnImageChange = (e) => {
    // validate image is not larger than 5mb
    let err = error;
    if (e.target.files[0].size * 1e-6 > 5.0) {
      err.image = "El archivo es demasiado grande";
    } else {
      err.image = undefined;
    }
    setError({ ...err });
    props.onImagenChange(e);
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  return (
    <div style={{ margin: "15%" }}>
      <FormControl fullWidth>
        <Typography variant="h4">Preparemos tu pedido</Typography>
        <div style={{ marginLeft: "10px" }}>
          <TextField
            label="¿Que queres pedir?"
            multiline
            inputProps={{ maxLength: 240 }}
            required
            sx={{ margin: "10px 0px 15px 0px" }}
            minRows={5}
            fullWidth
            onChange={handleOnDescriptionChange}
            error={error?.description ? true : false}
            helperText={error?.description}
            value={props.descripcion}
          ></TextField>
          <FormHelperText>
            {props.imagen ? props.imagen.name : ""}
          </FormHelperText>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
            onChange={handleOnImageChange}
            error={error?.image ? true : false}
            helperText={error?.image}
          >
            Subir Archivo
            <VisuallyHiddenInput accept="image/jpeg" type="file" />
          </Button>
          <FormHelperText>Maximo 5MB, solo JPG</FormHelperText>
        </div>
      </FormControl>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button size="small">Siguiente</Button>
      </Box>
    </div>
  );
};

export default Descripcion;
