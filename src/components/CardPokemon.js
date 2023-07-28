import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import ModalDetalles from "./ModalDetalles";
import ImagenPokemon from "./ImagenPokemon";
import Generacion from "./Generacion";


const CardPokemon = ({ subconjunto = [], paginaActual, limiteIntervalo }) => {
  const cargando = `${process.env.PUBLIC_URL}/images/pokebal.gif`
  const [mostrarCargando, setMostrarCargando] = useState(true)
  
  useEffect(() => {
    setMostrarCargando(true)
    let delay = 1500
    setTimeout(() => {
      setMostrarCargando(false)
    }, delay);
  }, [paginaActual])

  if (subconjunto.length === 0) {
    return (
      <div className="spinner-container">
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row ">
        {subconjunto.map((item, index) => (
          <div key={index} className="col mt-3 " >
            <div className="card shadow zoom-div" style={{ minWidth: "200px", maxWidth: "400px", maxHeight: "500px"}}>
              
                <div>
                  
                  <div
                    className="card-header d-flex align-items-center justify-content-center"
                    style={{
                      display:"none"
                    }}
                  >
                    {!mostrarCargando &&
                      <ImagenPokemon url={item.url} className="fade-in-element"/>
                    }

                    {mostrarCargando &&
                      <img src={cargando} className="img-fluid fade-in-element" alt="pokemon" />
                    }

                    

                  </div>
                  <div className="calign-items-center text-center">
                  <Generacion numero = {((limiteIntervalo*paginaActual)-limiteIntervalo)+(index+1)}/>
                  <h6 className="bg-secondary"><span className="badge badge-dark">#{((limiteIntervalo*paginaActual)-limiteIntervalo)+(index+1)}</span></h6>
                  </div>
                  <div className="card-body align-items-center text-center">
                    <h6 className="card-title">{item.name}</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center col-12">
                    <ModalDetalles nombrePokemon={item.name} urlPokemon={item.url} verBoton={true} numero = {((limiteIntervalo*paginaActual)-limiteIntervalo)+(index+1)} />
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPokemon;

