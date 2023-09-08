import React from 'react'
import "../App.css"
import DatosPokemonMovimientoModal from './DatosPokemonMovimientoModal'
import { useState } from 'react'


const DatosPokemonMovimientos = (movimientos = []) => {
   const arregloMovimientos = movimientos["movimientos"]
   const [modalShow, setModalShow] = useState(false);
   const [datosMovimiento, setDatosMovimiento] = useState([])

   const handleOpenModal = () => {
     setModalShow(true);
   };
 
   const handleCloseModal = () => {
     setModalShow(false);
   };

   const handleDetalleMovimiento = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setDatosMovimiento(data)
      handleOpenModal(true)
  
    })
    .catch(error => console.log(error))
    .finally(() => {
      // Acción a ejecutar mientras se espera la respuesta
    });
  };



   const movimientosJSX = arregloMovimientos.map((element, key) => (
    <tr key={key}>
      <td style={{ fontSize: "12px" }}>{key+1}</td>
      <td style={{ fontSize: "12px" }}>{element.move.name}</td>
      <td style={{ fontSize: "12px" }}>
        <button className='btn btn-outline-danger btn-sm' onClick={() => handleDetalleMovimiento(element.move.url)} style={{ fontSize: "11px", maxHeight: "25px" }}>
          Detalle
        </button>
      </td>
    </tr>
  ));

  return (

<>
    <DatosPokemonMovimientoModal
        show={modalShow}
        onHide={handleCloseModal}
        datosMovimiento = {datosMovimiento}
      />
    <div className="table-responsive" style={{maxHeight: "250px"}}>
      <table className="table table-sm table-hover">
        <thead className='thead-dark'>
          <tr>
            <th style={{fontSize: "12px"}}>N°</th>
            <th style={{fontSize: "12px"}}>Nombre</th>
            <th style={{fontSize: "12px"}}>Detalle</th>
          </tr>
        </thead>
        <tbody>
           {movimientosJSX}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default DatosPokemonMovimientos
