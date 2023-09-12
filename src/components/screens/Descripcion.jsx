import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CurrencyTextField from "../helpers/TextMoneda";
import DeleteIcon from "@mui/icons-material/Delete";

const Descripcion = (props) => {
  const hiddenFileInput = React.useRef(null);

  const [error, setError] = useState({
    description: undefined,
    imagen: "",
    monto: "",
  });

  useEffect(() => {
    if (props.descripcion !== "") {
      handleOnDescriptionChange({ target: { value: props.descripcion } });
    }
  }, []);

  let navigate = useNavigate();

  const handleOnMontoChange = (e) => {
    let err = error;
    setError({ ...err });
    props.onMontoChange(e);
  };

  const handleBoton = (e) => {
    navigate("/busca");
  };

  const handleOnDescriptionChange = (e) => {
    // validate descpription is not empty
    let err = error;
    if (e.target.value === "") {
      err.description = "La descripcion no puede estar vacia";
    } else {
      err.description = "";
    }
    setError({ ...err });
    props.onDescripcionChange(e);
  };

  const handleOnImageChange = (e) => {
    let err = error;
    if (e.target.files[0].type && e.target.files[0].type === "image/jpeg") {
      if (e.target.files[0].size * 1e-6 > 5.0) {
        err.image = "El archivo es demasiado grande";
      } else {
        err.image = "";
      }
      setError({ ...err });
      props.onImagenChange(e);
    }
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

  const handleOnDeleteImage = (e) => {
    props.onImagenChange({ target: { files: [] } });
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
          Preparemos tu pedido
        </Typography>

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
          <CurrencyTextField
            label="Monto"
            variant="outlined"
            value={props.monto}
            currencySymbol="$"
            fullWidth
            minimumValue="0"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value) => handleOnMontoChange(value)}
            error={error?.monto ? true : false}
            helperText={error?.monto}
          />
          <Box sx={{ margin: "10px 0px 15px 0px" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              onChange={(e) => handleOnImageChange(e)}
              error={error?.image ? true : false}
              helperText={error?.image}
            >
              Subir Archivo
              <VisuallyHiddenInput accept="image/jpeg" type="file" />
            </Button>
            <FormHelperText sx={{ display: "inline-block" }}>
              Maximo 5MB, solo JPG
            </FormHelperText>
            {props.imagen && (
              <div>
                <Button onClick={handleOnDeleteImage}>
                  <FormHelperText variant="standard">
                    {props.imagen ? props.imagen.name : ""}
                  </FormHelperText>
                  <DeleteIcon></DeleteIcon>
                </Button>
                <FormHelperText error>
                  {error.image ? error.image : ""}
                </FormHelperText>
              </div>
            )}
          </Box>
        </div>
      </FormControl>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{ display: "flex" }}
          size="small"
          disabled
          onClick={handleBoton}
        >
          Atras
        </Button>
        <Button
          sx={{ display: "flex" }}
          size="small"
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
    </div>
  );
};

export default Descripcion;
