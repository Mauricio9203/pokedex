import React, { useState, useEffect } from 'react';

const ImagenPokemon = ({ url }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const handleNumeroPokemon = (url) => {
      let numero = url.split("/")[6];
      let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png`;

      fetch(imageUrl, { method: 'HEAD' })
        .then((response) => {
          if (response.status === 404) {
            setImageUrl(`${process.env.PUBLIC_URL}/images/desconocido.png`);
          } else {
            setImageUrl(imageUrl);
          }
        })
        .catch((error) => {
          setImageUrl(`${process.env.PUBLIC_URL}/images/desconocido.png`);
        });
    };

    handleNumeroPokemon(url);
  }, [url]);

  return (
    <>
      <img src={imageUrl} className="img-fluid" alt="pokemon" />
    </>
  );
};

export default ImagenPokemon;
