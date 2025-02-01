import { useState,useEffect } from 'react';
import Select from 'react-select';
import ModalDetalles from './ModalDetalles';

const customStyles = {
  // Ajusta el ancho del componente aquí
  control: (provided) => ({
    ...provided,
    width: '250px' // Puedes ajustar el valor según el ancho deseado
  }),
};

const CustomSelect = (personajes) => {

  const [selectedOption, setSelectedOption] = useState(null);
  let personajesFormateado = personajes["personajes"]
  let select = []
  
  personajesFormateado.forEach((pokemon,index )=> {
    select.push({ value: (index+1), label: `#${(index+1)} - ${pokemon['name']}`, url : pokemon["url"] } )
  });
  
  useEffect(() => {
  }, [selectedOption])
  

  return (
    <div className="d-flex">
      <Select
        options={select} 
        styles={customStyles}  
        placeholder="Search Pokemon" 
        value={selectedOption}
        onChange={setSelectedOption}
      />

      {selectedOption && (
        <ModalDetalles
          nombrePokemon={selectedOption.label}
          urlPokemon={selectedOption.url}
          verBoton={false}
          selectedOption={selectedOption}
          numero={selectedOption.value}
        />
      )}
    
    </div>

    
  );
}
export default CustomSelect;
