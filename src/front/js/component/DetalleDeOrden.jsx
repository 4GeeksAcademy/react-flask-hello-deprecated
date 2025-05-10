import React from "react"

const DetalleDeOrden = ({service,price,fullName,description}) => {


    const handlePago = ()=>{
        alert("Continuaremos con su pago, por favor espere un momento....")
    }

    return (
        <div className="w-75 rounded p-4 border">
                <h1 className="text-danger">Detallado de orden</h1>
                <div className="border-top border-bottom">
                    
                    <h2>Cliente: {fullName}</h2>
                    <h2>Freelance: {service}</h2>
                    <h3>Descripcion de Orden : {description}</h3>
                    <div className="border-top border-bottom">
                        {/* <p>Producto:</p>
                        <p>Pagina web</p> */}
                    </div>
                    <div className="border-top border-bottom">
                        {/* <p>Estado: <span className="text-warning">pending</span></p> */}
                        <p className="h3">Precio: <span className="h2">{`$ ${price}`}</span></p>
                    </div>
                    {/* <div className="d-flex justify-content-end order-top border-bottom p-2">
                        <button onClick={handlePago} className="btn btn-primary">Continuar con el pago</button>
                    </div> */}
                </div>
            </div>
    )
}

export default DetalleDeOrden