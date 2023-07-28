import { useEffect, useState } from "react"
import DatosPokemonStats from "./DatosPokemonStats"
import DatosPokemonMovimientos from "./DatosPokemonMovimientos"
import "../App.css"



const DatosPokemon = (infoPokemon = []) => {

    const [stats, setStats] = useState("active")
    const [movimientos, setMovimientos] = useState("")
    const [habilidad, setHabilidad] = useState("")

    const [statsPestana, setStatsPestana] = useState(true)
    const [movimientosPestana, setMovimientosPestana] = useState(false)
    const [habilidadPestana, setHabilidadPestana] = useState(false)

    const [datosProcesadosHtml, setDatosProcesadosHtml] = useState("<p style={{fontSize: '17px'}}>Cargando información...</p>")


    const handleCambiarPestana = (numeroPestana) => {
        switch (numeroPestana) {
            case 1:
                setHabilidad("")
                setMovimientos("")
                setStats("active")
                setStatsPestana(true)
                setHabilidadPestana(false)
                setMovimientosPestana(false)
                break;
            case 2:
                setHabilidad("")
                setMovimientos("active")
                setStats("")
                setStatsPestana(false)
                setHabilidadPestana(false)
                setMovimientosPestana(true)
                break;
            case 3:
                setHabilidad("active")
                setMovimientos("")
                setStats("")
                setStatsPestana(false)
                setHabilidadPestana(true)
                setMovimientosPestana(false)
                handleInformacionHabilidad()
                break;
        }
    }

    const handleInformacionHabilidad = async () => {
        let url = infoPokemon["infoPokemon"]["abilities"][0]["ability"]["url"]
        let listaUrl = infoPokemon["infoPokemon"]["abilities"]
        let datosProcesados = []
    
        // Función para obtener datos de la habilidad
        const obtenerDatosHabilidad = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return handleEncontrarHabilidadEspanol(data.names, data.flavor_text_entries);
            } catch (error) {
                // Manejo del error, si es necesario
                // Puedes devolver un valor predeterminado o lanzar una excepción si lo deseas
                return "No existe información.";
            }
        };
    
        // Utilizamos un ciclo for...of con la palabra clave await para esperar cada solicitud
        for (const element of listaUrl) {
            let urlTemporal = element["ability"]["url"];
            const resultado = await obtenerDatosHabilidad(urlTemporal);
            datosProcesados.push(resultado);
        }

        let habilidadesHtml = ""

        datosProcesados.forEach(element => {
            let nom = element[0]["nombre"]
            let desc =  element[0]["descripcion"]
            habilidadesHtml = `${habilidadesHtml}<div><b style="font-size: 13px">${nom}</b><br/><p style="font-size: 13px"}}>${desc}</p></div>` 
        });
        
        setDatosProcesadosHtml(habilidadesHtml)
        
    };

    const handleEncontrarHabilidadEspanol = (traduccionNombre, traduccionDescripcion) =>{
        let nombreHabilidad = ""
        let descripcion = ""

        traduccionNombre.forEach(element => {
            let nombreLenguajeNombre = element.language.name
            if(nombreLenguajeNombre === "es"){
                nombreHabilidad = element.name
                //setNombreHabilidad(element.name)
            }
        });
        traduccionDescripcion.forEach(element => {
            let nombreLenguajeDescripcion = element.language.name
            if(nombreLenguajeDescripcion === "es"){
                descripcion = element.flavor_text
                //setDescripcionHabilidad(element.flavor_text)
            }
        });
        return [{"nombre": nombreHabilidad, "descripcion": descripcion}]
    }
    
  return (
    <>
        <ul className="nav nav-tabs" >
            <li className="nav-item" onClick={() => handleCambiarPestana(1)} style={{maxWidth: "100px", fontSize: "11px"}}>
                <button className={`nav-link ${stats}`}  >Stats</button>
            </li>
            <li className="nav-item" onClick={() => handleCambiarPestana(2)} style={{maxWidth: "100px", fontSize: "11px"}}>
                <button className={`nav-link ${movimientos}`}>Movimientos</button>
            </li>
            <li className="nav-item" onClick={() => handleCambiarPestana(3)} style={{maxWidth: "100px", fontSize: "11px"}}>
                <button className={`nav-link ${habilidad}`}>Habilidad</button>
            </li>
        </ul>
        {statsPestana &&
            <div className="container mt-1 fade-in-element">
                <div className="row">
                    <div className="col-6"><b  style={{fontSize: "15px"}}>Peso: {(((infoPokemon["infoPokemon"]["weight"]/4.53))*0.453592).toFixed(2)}<a style={{fontSize: "10px"}}> kg</a></b></div>
                    <div className="col-6"><b  style={{fontSize: "15px"}}>Altura: {(infoPokemon["infoPokemon"]["height"]*0.1).toFixed(2)}<a style={{fontSize: "10px"}}> m</a></b> </div>
                </div>
                <hr className="bg-primary"/>
                <div className="row ">
                    <div className="col-3"><b style={{fontSize: "11px"}}>HP </b></div>
                    <div className="col-9 mt-2 "><DatosPokemonStats color={"success"} valor={infoPokemon["infoPokemon"]["stats"][0]["base_stat"]} valorMaximo={255}/></div>
                </div>
                <div className="row">
                    <div className="col-3"><b style={{fontSize: "11px"}}>ATK</b></div>
                    <div className="col-9 mt-2"><DatosPokemonStats color={"danger"} valor={infoPokemon["infoPokemon"]["stats"][1]["base_stat"]} valorMaximo={190}/></div>
                </div>
                <div className="row">
                    <div className="col-3"><b style={{fontSize: "11px"}}>DEF</b></div>
                    <div className="col-9 mt-2"><DatosPokemonStats color={"warning"} valor={infoPokemon["infoPokemon"]["stats"][2]["base_stat"]} valorMaximo={230}/></div>
                </div>
                <div className="row">
                    <div className="col-3"><b style={{fontSize: "11px"}}>SP ATK</b></div>
                    <div className="col-9 mt-2"><DatosPokemonStats color={"secondary"} valor={infoPokemon["infoPokemon"]["stats"][3]["base_stat"]} valorMaximo={194}/></div>
                </div>
                <div className="row">
                    <div className="col-3"><b style={{fontSize: "11px"}}>SP DEF</b></div>
                    <div className="col-9 mt-2"><DatosPokemonStats color={"info"} valor={infoPokemon["infoPokemon"]["stats"][4]["base_stat"]} valorMaximo={230}/></div>
                </div>
                <div className="row">
                    <div className="col-3"><b style={{fontSize: "11px"}}>SPD</b></div>
                    <div className="col-9 mt-2"><DatosPokemonStats color={"primary"} valor={infoPokemon["infoPokemon"]["stats"][5]["base_stat"]} valorMaximo={160}/></div>
                </div>

        
            </div>      
        }

        {movimientosPestana && 
            <div className="container mt-1 fade-in-element">
                <div className="row">
                    <DatosPokemonMovimientos movimientos={infoPokemon["infoPokemon"]["moves"]}/>
                </div>
            </div>
        }

        {habilidadPestana && 
            <div className="container mt-1 fade-in-element">
                <div className="row">
                    <div dangerouslySetInnerHTML={{ __html: datosProcesadosHtml }} />
                </div>
            </div>
        }
        



    </>
  )


  
}

export default DatosPokemon
