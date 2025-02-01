import React, { useState, useEffect } from 'react';

const Paginacion = ({paginaActual, paginaSiguiente, paginaAnterior, cantidadPersonajes,limiteIntervalo, handlePaginaEleccion }) => {
  const maximo = 5
  const [estadoPrevious, setEstadoPrevious] = useState("disabled");
  const [estadoNext, setEstadoNext] = useState("");

  const [indexInicio, setIndexInicio] = useState(1);
  const [indexFin, setIndexFin] = useState(5);



  const handleSepararEnteroDecimal = (numero) => {
      const separado = numero.toString().split('.');
      const enteros = parseInt(separado[0]);
      const decimales = parseInt(separado[1]);

      return [enteros, decimales]
  }

  useEffect(() => {
    if(cantidadPersonajes > 0){
      setEstadoNext("disabled")


      let cantidadPaginas = cantidadPersonajes/limiteIntervalo
      let enteros = handleSepararEnteroDecimal(cantidadPaginas)[0]
      let decimal = handleSepararEnteroDecimal(cantidadPaginas)[1]

      let delay = 1500
      setTimeout(() => {
        setEstadoNext("disabled")        

        if(decimal > 0){
          cantidadPaginas = enteros+1
        }else{
          cantidadPaginas= enteros
        }
  
        if (paginaActual >= cantidadPaginas) {
          setEstadoNext("disabled");
        } else {
          setEstadoNext("");
        }
      }, delay);

    }

    if(paginaActual > indexFin){
      let cantidadPaginas = cantidadPersonajes/limiteIntervalo
      let enteros = handleSepararEnteroDecimal(cantidadPaginas)[0]
      let decimal = handleSepararEnteroDecimal(cantidadPaginas)[1]
      if(decimal > 0){
        cantidadPaginas = enteros+1
      }else{
        cantidadPaginas= enteros
      }

      if (paginaActual >= cantidadPaginas) {
        setEstadoNext("disabled");
      } else {
        setEstadoNext("");
      }
      
      setIndexInicio(indexInicio+maximo)
      setIndexFin(indexFin+maximo)
    }

    if(paginaActual < indexInicio){
      setIndexInicio(indexInicio-maximo)
      setIndexFin(indexFin-maximo)
    }



    let delayPrevious = 1500
    setEstadoPrevious("disabled");
    setTimeout(() => {
        if (paginaActual < 2) {
          setEstadoPrevious("disabled");
        } else {
          setEstadoPrevious("");
        }  

    }, delayPrevious);

   
    

  }, [paginaActual,cantidadPersonajes,indexFin,indexInicio,limiteIntervalo])
  

  const generarPaginacion = () => {
    const paginacionItems = [];
    let cantidadPaginas = cantidadPersonajes/limiteIntervalo
    let enteros = handleSepararEnteroDecimal(cantidadPaginas)[0]
    let decimal = handleSepararEnteroDecimal(cantidadPaginas)[1]
    if(decimal > 0){
      cantidadPaginas = enteros+1
    }else{
      cantidadPaginas = enteros
    }


    //si 35 >= 33
    if(indexFin >= cantidadPaginas){
      for (let index = indexInicio; index <= cantidadPaginas; index++) {
        if (index === paginaActual) {
          paginacionItems.push(
            <li key={index} className="page-item active">
              <button className="page-link" onClick={() => handlePaginaEleccion(index)} >{index}</button>
            </li>
          );
        } else {
          paginacionItems.push(
            <li key={index} className="page-item zoom-div">
              <button className="page-link" onClick={() => handlePaginaEleccion(index)}>{index}</button>
            </li>
          );
        }
      }
    }else{
      for (let index = indexInicio; index <= indexFin; index++) {
        if (index === paginaActual) {
          paginacionItems.push(
            <li key={index} className="page-item active">
              <button className="page-link" onClick={() => handlePaginaEleccion(index)} >{index}</button>
            </li>
          );
        } else {
          paginacionItems.push(
            <li key={index} className="page-item">
              <button className="page-link" onClick={() => handlePaginaEleccion(index)}>{index}</button>
            </li>
          );
        }
      }
    }


    
   

    return paginacionItems;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <nav aria-label="..." className="mt-4">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${estadoPrevious}`}>
            <button className="page-link" onClick={paginaAnterior}>Previous </button>
          </li>
          {generarPaginacion()}
          <li className={`page-item ${estadoNext}`}>
            <button className="page-link" onClick={paginaSiguiente}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginacion;
