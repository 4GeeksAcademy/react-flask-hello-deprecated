import React from "react";
import CreateProductForm from "../component/CreateProductForm";

const CreateProduct = () => {
  const handleSuccess = () => {
    console.log("Producto creado con éxito.");
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <CreateProductForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateProduct;
