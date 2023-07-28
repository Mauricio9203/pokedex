import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CardPokemon from "./components/CardPokemon";
import Paginacion from "./components/Paginacion";
import BotonFlotante from "./components/BotonFlotante";



function App() {
  const limiteMaximo = 10000;
  const limiteIntervalo = 40;
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=" + limiteMaximo;

  const [personajes, setPersonajes] = useState([]);
  const [cantidadPersonajes, setCantidadDePersonajes] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);

  const [intervaloPokemon, setIntervaloPokemon] = useState(limiteIntervalo);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(intervaloPokemon - 1);
  const [subconjunto, setSubconjunto] = useState([]);

  const paginaSiguiente = () => {
    handlePaginaEleccion(paginaActual+1)
  };

  const paginaAnterior = () => {
    handlePaginaEleccion(paginaActual-1)
  };

  const handlePaginaEleccion = (paginaSeleccionada) => {
    let nuevoStart = (limiteIntervalo*paginaSeleccionada)-limiteIntervalo
    let nuevoEnd = (paginaSeleccionada*limiteIntervalo)-1
    setStart(nuevoStart)
    setEnd(nuevoEnd)
    setPaginaActual(paginaSeleccionada)    
  }

  const fetchPokemon = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data.results);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };

  useEffect(() => {
    fetchPokemon(url);
  }, [url]);

  useEffect(() => {
    const subconjuntoPersonajes = personajes.slice(start, end + 1);
    setSubconjunto(subconjuntoPersonajes);
    setCantidadDePersonajes(personajes.length);
    if(subconjunto.length === 0){
      setPaginaActual(1)
    }
  }, [personajes, start, end]);

  return (
    <>
      <Navbar personajes={personajes} />
     
      <Paginacion
        paginaActual={paginaActual}
        paginaSiguiente={paginaSiguiente}
        paginaAnterior={paginaAnterior}
        cantidadPersonajes={cantidadPersonajes}
        limiteIntervalo={limiteIntervalo}
        setPaginaActual={setPaginaActual}
        handlePaginaEleccion = {handlePaginaEleccion}
      />
      <CardPokemon subconjunto={subconjunto} paginaActual={paginaActual} limiteIntervalo={limiteIntervalo} />
      <BotonFlotante/>
    </>
  );
}

export default App;
