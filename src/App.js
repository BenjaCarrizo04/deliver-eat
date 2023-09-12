import logo from "./logo.svg";
import "./App.css";
import { Container, Box } from "@mui/material";
import { React, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Descripcion from "./components/screens/Descripcion";
import Resumen from "./components/screens/Resumen";
import Busca from "./components/screens/Busca";
import Entrega from "./components/screens/Entrega";
import NavBar from "./components/helpers/Navbar";
import Recibida from "./components/screens/Recibida";
import dayjs from "dayjs";
import DeliveryIconFull from "./assets/delivery-icon-full.png";
import CheckOut from "./components/screens/CheckOut";

function App() {
  const [pedido, setPedido] = useState({
    descripcion: "",
    imagen: "",
    monto: 0,
    busca: {
      calle: "",
      ciudad: "cordoba",
      observacion: "",
    },
    entrega: {
      calle: "",
      ciudad: "cordoba",
      observacion: "",
    },
    tarjeta: {
      numero: "",
      nombre: "",
      mmaa: "",
      cvv: "",
    },
    efectivo: 0,
    precio: 500,
    recibida: "asap",
    fechaHoraRecibida: dayjs(),
  });

  const onDescripcionChange = (nuevaDescripcion) => {
    let op = pedido;
    op.descripcion = nuevaDescripcion.target.value;
    setPedido({ ...op });
  };

  const onImagenChange = (nuevaImagen) => {
    let op = pedido;
    op.imagen = nuevaImagen.target.files[0];
    setPedido({ ...op });
  };

  const onMontoChange = (nuevoMonto) => {
    let op = pedido;
    op.monto = nuevoMonto;
    setPedido({ ...op });
  };

  const onBuscaCalleChange = (nuevaCalle) => {
    let op = pedido;
    op.busca.calle = nuevaCalle.target.value;
    setPedido({ ...op });
  };

  const onBuscaNroChange = (nuevoNro) => {
    let op = pedido;
    op.busca.nro = nuevoNro.target.value?.replace(/\D/g, "");
    setPedido({ ...op });
  };
  const onBuscaCiudadChange = (nuevaCiudad) => {
    let op = pedido;
    op.busca.ciudad = nuevaCiudad.target.value;
    op.entrega.ciudad = nuevaCiudad.target.value;
    setPedido({ ...op });
  };
  const onBuscaObservacionChange = (nuevaObservacion) => {
    let op = pedido;
    op.busca.observacion = nuevaObservacion.target.value;
    setPedido({ ...op });
  };

  const onEntregaCalleChange = (nuevaCalle) => {
    let op = pedido;
    op.entrega.calle = nuevaCalle.target.value;
    setPedido({ ...op });
  };

  const onEntregaNroChange = (nuevoNro) => {
    let op = pedido;
    op.entrega.nro = nuevoNro.target.value?.replace(/\D/g, "");
    setPedido({ ...op });
  };

  const onEntregaObservacionChange = (nuevaObservacion) => {
    let op = pedido;
    op.entrega.observacion = nuevaObservacion.target.value;
    setPedido({ ...op });
  };

  const onNumeroTarjetaChange = (nuevoNumero) => {
    let op = pedido;
    op.tarjeta.numero = nuevoNumero.target.value;
    setPedido({ ...op });
  };

  const onNombreTarjetaChange = (nuevoNombre) => {
    let op = pedido;
    op.tarjeta.nombre = nuevoNombre.target.value;
    setPedido({ ...op });
  };

  const onMmaaTarjetaChange = (nuevoMmaa) => {
    let op = pedido;
    op.tarjeta.mmaa = nuevoMmaa.target.value;
    setPedido({ ...op });
  };

  const onCvvTarjetaChange = (nuevoCvv) => {
    let op = pedido;
    op.tarjeta.cvv = nuevoCvv.target.value;

    setPedido({ ...op });
  };

  const onMontoEfectivoChange = (nuevoMonto) => {
    let op = pedido;
    op.efectivo = Number(nuevoMonto);

    setPedido({ ...op });
  };

  const onRecibidaChange = (nuevaRecibida) => {
    let op = pedido;
    op.recibida = nuevaRecibida.target.value;
    setPedido({ ...op });
  };

  const onFechaRecibidaChange = (nuevaFecha) => {
    let op = pedido;
    op.fechaHoraRecibida = nuevaFecha;
    setPedido({ ...op });
  };

  const boxStyle = {
    display: "flex",
    borderRadius: "5px",
    margin: "auto",
    boxShadow: "0px 0px 20px #000000",
    backgroundColor: "#F0E6EF",
    width: "40%",
    "@media(max-width: 1300px)": {
      width: "80%",
    },
    "@media(max-width: 800px)": {
      width: "100%",
    },
    minHeight: "60%",
    flexDirection: "column",
  };

  return (
    <div>
      <NavBar></NavBar>
      <Container
        maxWidth
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          backgroundColor: "#9C89B8",
          fontFamily: "Roboto",
        }}
      >
        <img
          className="delivery-icon"
          src={DeliveryIconFull}
          style={{
            width: "200px",
            marginTop: "30px",
            boxShadow: "0px 0px 5px #000000",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <Box sx={boxStyle}>
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Descripcion
                    descripcion={pedido.descripcion}
                    imagen={pedido.imagen}
                    monto={pedido.monto}
                    onDescripcionChange={onDescripcionChange}
                    onMontoChange={onMontoChange}
                    onImagenChange={onImagenChange}
                  />
                }
              ></Route>
              <Route
                path="/resumen"
                element={
                  <Resumen
                    tarjeta={pedido.tarjeta}
                    onNumeroTarjetaChange={onNumeroTarjetaChange}
                    onNombreTarjetaChange={onNombreTarjetaChange}
                    onMmaaTarjetaChange={onMmaaTarjetaChange}
                    onCvvTarjetaChange={onCvvTarjetaChange}
                    onMontoEfectivoChange={onMontoEfectivoChange}
                    efectivo={pedido.efectivo}
                    monto={pedido.monto}
                    precio={pedido.precio}
                  />
                }
              ></Route>
              <Route
                path="/busca"
                element={
                  <Busca
                    contexto={pedido.busca}
                    onCalleChange={onBuscaCalleChange}
                    onNroChange={onBuscaNroChange}
                    onCiudadChange={onBuscaCiudadChange}
                    onObservacionChange={onBuscaObservacionChange}
                  />
                }
              ></Route>
              <Route
                path="/entrega"
                element={
                  <Entrega
                    contexto={pedido.entrega}
                    onCalleChange={onEntregaCalleChange}
                    onNroChange={onEntregaNroChange}
                    onObservacionChange={onEntregaObservacionChange}
                  />
                }
              ></Route>
              <Route
                path="/recibida"
                element={
                  <Recibida
                    contexto={pedido.entrega}
                    recibida={pedido.recibida}
                    fechaHoraRecibida={pedido.fechaHoraRecibida}
                    onRecibidaChange={onRecibidaChange}
                    onFechaHoraRecibidaChange={onFechaRecibidaChange}
                  />
                }
              ></Route>
              <Route path="/checkout" element={<CheckOut />}></Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </Container>
    </div>
  );
}

export default App;
