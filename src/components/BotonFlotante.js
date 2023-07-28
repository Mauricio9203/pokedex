import React from 'react';
import '../App.css'; // Asegúrate de tener un archivo CSS para aplicar estilos

const BotonFlotante = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="scroll-to-top rounded-circle bg-danger text-white" onClick={scrollToTop}>
       <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default BotonFlotante;
