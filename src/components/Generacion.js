import React from 'react'

const Generacion = ({numero}) => {
    let numeroPokemon = parseInt(numero);
    let generacion;
    let color;
  
    if (numeroPokemon >= 1 && numeroPokemon <= 151) {
      generacion = 'Generación 1';
      color = '#FF0000'; // Rojo
    } else if (numeroPokemon >= 152 && numeroPokemon <= 251) {
      generacion = 'Generación 2';
      color = '#FFD700'; // Oro
    } else if (numeroPokemon >= 252 && numeroPokemon <= 386) {
      generacion = 'Generación 3';
      color = '#008080'; // Verde/Azul oscuro
    } else if (numeroPokemon >= 387 && numeroPokemon <= 493) {
      generacion = 'Generación 4';
      color = '#A0A0A0'; // Platino
    } else if (numeroPokemon >= 494 && numeroPokemon <= 649) {
      generacion = 'Generación 5';
      color = '#000000'; // Negro/Blanco
    } else if (numeroPokemon >= 650 && numeroPokemon <= 721) {
      generacion = 'Generación 6';
      color = '#FF4500'; // Naranja utilizado para X/Y
    } else if (numeroPokemon >= 722 && numeroPokemon <= 809) {
      generacion = 'Generación 7';
      color = '#FDB813'; // Amarillo utilizado para Sol/Luna
    } else if (numeroPokemon >= 810 && numeroPokemon <= 898) {
      generacion = 'Generación 8';
      color = '#708090'; // Gris utilizado para Espada/Escudo
    } else {
      generacion = 'Generación desconocida';
      color = '#000000'; // Color blanco por defecto para otras generaciones desconocidas
    }

   
  
    return (
      <>
        <h6 style={{backgroundColor : color}}><span className="badge badge-dark">{generacion}</span></h6>
      </>
    );
  };
 
  

export default Generacion
