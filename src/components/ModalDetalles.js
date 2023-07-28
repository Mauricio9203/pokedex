import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatosPokemon from './DatosPokemon';
import "../App.css"

const ModalDetalles = ({nombrePokemon, urlPokemon, verBoton,selectedOption, numero}) => {


    //detalles del pokemon
    const [tipo, setTipo] = useState([]);
    const [imagen, setImagen] = useState("");
    const [imagenShiny, setImagenShiny] = useState("");
    const [infoPokemon, setInfoPokemon] = useState([])

    const [versionNormal, setVersionNormal] = useState(true)
    const [versionShiny, setVersionShiny] = useState(false)
    const [versionNormalPestana, setVersionNormalPestana] = useState("active")
    const [versionShinyPestana, setVersionShinyPestana] = useState("")

    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleColorTipo = (item, index) => {
    let tipo = item.type.name
    let color = ""
    let colorTexto = "text-dark"
    switch (tipo) {
      case "grass":color = "#78C850";colorTexto = "text-dark";break;
      case "fire":color = "#F08030";colorTexto = "text-white";break;
      case "water":color = "#6890F0";colorTexto = "text-white";break;
      case "electric":color = "#F8D030";colorTexto = "text-dark";break;
      case "flying":color = "#A890F0";colorTexto = "text-dark";break;
      case "normal":color = "#A8A878";colorTexto = "text-white";break;
      case "poison":color = "#A040A0";colorTexto = "text-white";break;
      case "ice":color = "#98D8D8";colorTexto = "text-dark";break;
      case "fighting":color = "#C03028";colorTexto = "text-white";break;
      case "ground":color = "#E0C068";colorTexto = "text-dark";break;
      case "psychic":color = "#F85888";colorTexto = "text-white";break;
      case "bug":color = "#A8B820";colorTexto = "text-dark";break;
      case "rock":color = "#B8A038";colorTexto = "text-dark";break;
      case "ghost":color = "#705898";colorTexto = "text-white";break;
      case "dragon":color = "#7038F8";colorTexto = "text-white";break;
      case "dark":color = "#705848";colorTexto = "text-white";break;
      case "steel":color = "#B8B8D0";colorTexto = "text-dark";break;
      case "fairy":color = "#EE99AC";colorTexto = "text-dark";break;
      default:
        break;
    }


     return (<p style={{ backgroundColor: color }}  className={"btn btn-sm mx-1 "+colorTexto} key={index}>{item.type.name}</p>)
  
    }

    const verDetalles = (url) => {
      fetch(url)
      .then(response => response.json())
      .then(data => { 
        setImagenShiny(data.sprites.other["official-artwork"].front_shiny)
        setImagen(data.sprites.other["official-artwork"].front_default)
        setTipo(data.types)
        setInfoPokemon(data)
        handleShow()
      })
      .catch(error => console.log(error))
      .finally(() => {
      });
    };

    const handleIntercambiarImagen = (numero) => {
      switch (numero) {
        case 1:
          setVersionNormal(true)
          setVersionShiny(false)
          setVersionNormalPestana("active")
          setVersionShinyPestana("")
          break;
        case 2:
          setVersionNormal(false)
          setVersionShiny(true)
          setVersionNormalPestana("")
          setVersionShinyPestana("active")
          break;
      }
    }

    useEffect(() => {
      if(verBoton === false){
        verDetalles(urlPokemon)
      }
    }, [selectedOption])
    

    return (
      <>
      {verBoton &&
        <Button variant="primary" className="btn btn-dark btn-block btn-sm text-white col-11 mb-2" onClick={() => verDetalles(urlPokemon)}>
          Detalle
        </Button>
      }  

        <Modal show={showModal} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Información de {nombrePokemon}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='container'>
              <div className='row d-flex align-items-center justify-content-center'>
              <div className='col-6 ' style={{ minWidth: '200px' }}>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button className={`nav-link ${versionNormalPestana}`} onClick={() => handleIntercambiarImagen(1)} aria-current="page">Normal</button>
                    </li>
                    <li className="nav-item">
                      <button className={`nav-link ${versionShinyPestana}`} onClick={() => handleIntercambiarImagen(2)} aria-current="page">Shinny</button>
                    </li>
                  </ul>
                  <div className='d-flex justify-content-center'>
                    {versionNormal && <img src={imagen} onClick={() => handleIntercambiarImagen(1)}  className="img-fluid  fade-in-element" alt="pokemon"/>}
                    {versionShiny && <img src={imagenShiny} onClick={() => handleIntercambiarImagen(2)} className="img-fluid fade-in-element " alt="pokemon"/>}
                  </div>
                  <div className="calign-items-center text-center">
                    <h6 className="bg-secondary"><span className="badge badge-dark">#{numero}</span></h6>
                  </div>
                  <div className="d-flex justify-content-center ">
                    {tipo.map((item, index) => {
                      let tipo = handleColorTipo(item, index); // Llamada a handleColorTipo
                        return (
                          tipo
                        );
                      })}
                  </div>
                </div>
                <div className='col-6' style={{ minWidth: '300px' }}>
                  <div className="card" style={{ minHeight: '300px' }}>
                    <div className="card-body">
                      <DatosPokemon infoPokemon={infoPokemon}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default ModalDetalles;