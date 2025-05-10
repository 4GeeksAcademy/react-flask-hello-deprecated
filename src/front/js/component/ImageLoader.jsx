import React, { useState, useEffect } from 'react';

// Hook personalizado para manejar la carga de imágenes
const useImageLoader = (src) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
      setError(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoading, error };
};

// Componente principal
const ImageLoader = ({ 
  src,
  alt = 'Imagen por defecto',
  width = '100%',
  height = 'auto'
}) => {
  const { isLoading, error } = useImageLoader(src);

  if (error) {
    return (
      <div style={{ width, height }} className="bg-secondary rounded-circle">
   
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      {isLoading && (
        <div className="bg-secondary rounded-circle">
   
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={` ${isLoading ? 'opacity-0' : 'opacity-100'} rounded-circle`}
        style={{ width, height ,objectFit: "cover"}}
      />
    </div>
  );
};

export default ImageLoader;