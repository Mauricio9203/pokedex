import React from 'react'
import BuscadorPokemon from './BuscadorPokemon'


const Navbar = ({personajes}) => {
  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Pokedex</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                  <form className="d-flex" role="search">
                      <BuscadorPokemon personajes={personajes}/>
                  </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
