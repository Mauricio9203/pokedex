import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DatosPokemonMovimientoModal = ({ show, onHide, datosMovimiento}) => {
    const [nombreMovimiento, setNombreMovimiento] = useState("")
    const [descripcionEspanol, setDescripcionEspanol] = useState("")
    const [descripcionIngles, setDescripcionIngles] = useState("")

    //estados de las pestañas
    const [espanol, setEspanol] = useState(true)
    const [ingles, setIngles] = useState(false)
    const [pestanaEspanol, setPestanaEspanol] = useState("active")
    const [pestanaIngles, setPestanaIngles] = useState("")

    //detalle movimientos
    const [precision, setPrecision] = useState("-")
    const [tipo, setTipo] = useState("-")
    const [pp, setPp] = useState("-")
    const [tipoDano, setTipoDano] = useState("-")

    //Handle intercambiar idioma
    const handleCambiarIdioma = (numero) => {
        switch (numero) {
            case 1:
                setEspanol(true)
                setPestanaEspanol("active")
                setIngles(false)
                setPestanaIngles("")
                break;
            default:
                setEspanol(false)
                setPestanaEspanol("")
                setIngles(true)
                setPestanaIngles("active")
                break;
        }
    }

    const handleDescripcionIdiomas = (traducciones) =>{
      let descripcionEspanol = ""
      let descripcionIngles = ""

      traducciones.forEach(element => {
        let lenguaje = element.language.name
        if(lenguaje === "es"){
          descripcionEspanol = element.flavor_text
        }
        if(lenguaje === "en"){
          descripcionIngles = element.flavor_text
        }
      });

      return [descripcionEspanol, descripcionIngles]
    }


    const handleNombreEspanol = (traducciones) => {
      let nombreEspanol = ""
      let nombreIngles = ""

      traducciones.forEach(element => {
        let lenguaje =  element.language.name
        if(lenguaje === "es"){
          nombreEspanol = element.name
        }

        if(lenguaje === "en"){
          nombreIngles = element.name
        }
      });

      return `${nombreEspanol} | ${nombreIngles}`
    }

    useEffect(() => {
        if(datosMovimiento.names){
            setEspanol(true)
            setPestanaEspanol("active")
            setIngles(false)
            setPestanaIngles("")

            setDescripcionEspanol(handleDescripcionIdiomas(datosMovimiento.flavor_text_entries)[0])
            setDescripcionIngles(handleDescripcionIdiomas(datosMovimiento.flavor_text_entries)[1])
            setNombreMovimiento(handleNombreEspanol(datosMovimiento.names))

            if(datosMovimiento.accuracy === null){
              setPrecision("-")
            }else{
              setPrecision(datosMovimiento.accuracy+"%")
            }
            
            setTipo(datosMovimiento.type.name)
            setPp(datosMovimiento.pp)
            setTipoDano(datosMovimiento.damage_class.name)
        }
    }, [datosMovimiento])
    
  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title style={{fontSize: "17px"}}>{nombreMovimiento}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
   
        <div className='container mt-2 '>
          <div className='row justify-content-center'>
            <div className='col-6 mb-3' style={{minWidth:"300px"}}>
              <div className='card shadow'>
                <div className='card-body'>
                <b>Type: </b>{tipo}<br/>
                <b>Accuracy:</b> {precision} <br/>
                <b>PP: </b>{pp}<br/>
                <b>Damage Class: </b>{tipoDano}<br/>
                </div>
              </div>
            </div>
            <div className='col-6' style={{minWidth:"320px"}}>
              <ul className="nav nav-tabs">
              <li className="nav-item">
                      <button className={`nav-link ${pestanaIngles}`} onClick={()=> handleCambiarIdioma(2)} aria-current="page" >English</button>
                  </li>
                  <li className="nav-item">
                      <button className={`nav-link ${pestanaEspanol}`} onClick={()=> handleCambiarIdioma(1)} aria-current="page" >Spanish</button>
                  </li>
               
              </ul>
              <div className='row mt-1'>
              {ingles && <div className='col'> <div className='zoom-div alert alert-primary fade-in-element'>{descripcionIngles}</div></div>}
                  {espanol && <div className='col'><div className=' zoom-div alert alert-info fade-in-element'>{descripcionEspanol}</div>  </div>}
                 
              </div>
            </div>
          </div>
           
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="zoom-div" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DatosPokemonMovimientoModal;
