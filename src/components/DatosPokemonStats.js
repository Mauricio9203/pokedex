import React, { useState, useEffect } from 'react';

const DatosPokemonStats = ({ color, valor, valorMaximo }) => {
  const [porcentajeStat, setPorcentajeStat] = useState(0); // Estado para el porcentaje de la barra

  const widthMaximo = valorMaximo;

  useEffect(() => {
    // Función para actualizar el porcentaje después de 3 segundos
    const updatePorcentajeStat = () => {
      const porcentaje = (valor / widthMaximo) * 100;
      setPorcentajeStat(porcentaje);
    };

    // Establecer un retraso de 3 segundos antes de actualizar visualmente las barras
    const timeout = setTimeout(() => {
      updatePorcentajeStat();
    }, 200);

    // Limpia el timeout cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [valor, widthMaximo]);

  return (
    <>
      <div className="progress " style={{ height: "13px" }}>
        <div
          className={`progress-bar bg-${color} progress-bar-striped `}
          role="progressbar"
          style={{ width: porcentajeStat + "%" }}
          aria-valuenow={valor}
          aria-valuemin="0"
          aria-valuemax={valorMaximo}
        >
          <b>{valor}</b>
        </div>
      </div>
    </>
  );
};

export default DatosPokemonStats;
