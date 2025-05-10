// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaypal } from '@fortawesome/free-brands-svg-icons';


// export const formCarritoPago = () => {
//     // const [newContact, setNewContact] = useState({
   
//     // });
//     const [carrito, setCarrito] = useState([]);
    
//     const productos = [
//         { id: 1, name: 'Producto 1', price: 10 },
//         { id: 2, name: 'Producto 2', price: 20 },
//         { id: 3, name: 'Producto 3', price: 30 },
//     ];

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewContact({
//             ...newContact,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Datos enviados:', newContact);
//     };

//     const handleFormatoChange = (productoId, cantidad) => {
//         const producto = productos.find(p => p.id === productoId);
//         const existingProduct = carrito.find(item => item.id === productoId);
        
//         if (existingProduct) {
//             setCarrito(carrito.map(item =>
//                 item.id === productoId ? { ...item, cantidad } : item
//             ));
//         } else {
//             setCarrito([...carrito, { ...producto, cantidad }]);
//         }
//     };

//     const calcularTotal = () => {
//         const subtotal = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
//         const total = subtotal + (subtotal * 0.21); // Incluyendo IVA
//         const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
//         return { subtotal, total, totalUnidades };
//     };

//     const { subtotal, total, totalUnidades } = calcularTotal();

//     return (
//         <div className="container-fluid justify-content-center mt-1 p-3 text-dark">
//             <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                     <a className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">1. Carrito de compra</a>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <a className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">2. Dirección de envío y pago</a>
//                 </li>
//             </ul>

//             <div className="tab-content" id="myTabContent">
//                 <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
//                     <div className="container-fluid overflow-hidden my-4 d-flex">
//                         <div className="row col-md-6 flex-grow-1">
//                             <h3 className="p-3">Productos en el carrito:</h3>
//                             {productos.map(producto => (
//                                 <div className="col-md-8" key={producto.id}>
//                                     <div className="card mb-3 d-flex flex-column">
//                                         <div className="row card-prueba g-0 flex-fill">
//                                             <div className="col-md-2">
//                                                 <img src="https://era2vrmzk5n.exactdn.com/wp-content/uploads/2022/06/Pienso-Ayurveda-gato-kasaludintegral-1080x1080pix.jpg" className="img-fluid rounded-start m-1" alt="Producto" />
//                                             </div>
//                                             <div className="col-md-8">
//                                                 <div className="card-body d-flex flex-column flex-grow-1">
//                                                     <h5 className="card-title"><strong>{producto.name}</strong></h5>
//                                                 </div>

//                                                 <div className="d-flex justify-content-between align-items-center m-3">
//                                                     <div>
//                                                         <p className="card-text mb-0">Descripción breve del producto.</p>
//                                                         <h2 className="card-text text-sm-start">{producto.price}€</h2>
//                                                     </div>

//                                                     <div className="d-flex align-items-center" style={{ width: '100px' }}>
//                                                         <label htmlFor={`formatoProducto-${producto.id}`} className="form-label visually-hidden">Cantidad:</label>
//                                                         <select className="form-select form-select-sm" id={`formatoProducto-${producto.id}`} onChange={(e) => handleFormatoChange(producto.id, parseInt(e.target.value))}>
//                                                             <option value="">Seleccione cantidad</option>
//                                                             <option value="1">1 udad.</option>
//                                                             <option value="2">2 uds.</option>
//                                                             <option value="3">3 uds.</option>
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="row carrito col-md-3 m-3 p-4 rounded border" style={{ width: "400px", height: "400px" }}>
//                             <h3 className="p-3">Resumen del carrito</h3>
//                             <p>Total de productos: {totalUnidades}</p>
//                             <p>Subtotal: {subtotal}€</p>
//                             <p>IVA (21%): {(subtotal * 0.21).toFixed(2)}€</p>
//                             <h4><strong>Total: {total.toFixed(2)}€</strong></h4>
//                         </div>
//                     </div>

//                     <ul>
//                         {carrito.map(item => (
//                             <li key={item.id}>
//                                 {item.name} - {item.cantidad} unidades
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
//                     <div className="container-fluid overflow-hidden my-3">
//                         <form className="form" onSubmit={handleSubmit}>
//                             <h2 className="text-start">Dirección y método de envío</h2>
//                             <div className="row mb-3">
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputFullName1" className="col-form-label">Nombre</label>
//                                     <input type="text" className="form-control" id="inputFullName1" placeholder="Nombre" onChange={handleChange} name="nombre" value={newContact.nombre} />
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputFullName2" className="col-form-label">Apellidos</label>
//                                     <input type="text" className="form-control" id="inputFullName2" placeholder="Apellidos" onChange={handleChange} name="apellidos" value={newContact.apellidos} />
//                                 </div>
//                             </div>
//                             <div className="row mb-3">
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputPhone" className="col-form-label">Teléfono</label>
//                                     <input type="text" className="form-control" id="inputPhone" placeholder="Teléfono" onChange={handleChange} name="teléfono" value={newContact.teléfono} />
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputEmail" className="col-form-label">Email</label>
//                                     <input type="text" className="form-control" id="inputEmail" placeholder="Email" onChange={handleChange} name="email" value={newContact.email} />
//                                 </div>
//                             </div>
//                             <div className="row mb-3">
//                                 <div className="col-sm-12">
//                                     <label htmlFor="inputAddress" className="col-form-label">Dirección</label>
//                                     <input type="text" className="form-control" id="inputAddress" placeholder="Ingrese dirección" onChange={handleChange} name="dirección" value={newContact.dirección} />
//                                 </div>
//                             </div>
//                             <div className="row mb-3">
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputPostal" className="col-form-label">Código Postal</label>
//                                     <input type="text" className="form-control" id="inputPostal" placeholder="Código Postal" onChange={handleChange} name="códigoPostal" value={newContact.códigoPostal} />
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <label htmlFor="inputCiudad" className="col-form-label">Ciudad</label>
//                                     <input type="text" className="form-control" id="inputCiudad" placeholder="Ciudad" onChange={handleChange} name="ciudad" value={newContact.ciudad} />
//                                 </div>
//                             </div>
//                             <div className="row my-4">
//                                 <div className="col-sm-6">
//                                     <div className="p-3 bg-success text-dark bg-opacity-25 rounded">
//                                         <input className="form-check-input" type="radio" name="envio" id="envioUrgente" value="urgente" />
//                                         <label className="form-check-label" htmlFor="envioUrgente">
//                                             <h5 className="m-0">Envío urgente 4,99€</h5>
//                                             <p>24/48 horas MRW</p>
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <div className="p-3 bg-success text-dark bg-opacity-25 rounded">
//                                         <input className="form-check-input" type="radio" name="envio" id="envioGratuito" value="gratuito" />
//                                         <label className="form-check-label" htmlFor="envioGratuito">
//                                             <h5 className="m-0">Envío gratuito</h5>
//                                             <p>Plazo de 3 a 4 días. Puntos de recogida Mondial Relay</p>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="d-flex justify-content-start gx-2">
//                                 <button type="submit" className="btn btn-primary me-1">Guardar</button>
//                                 <button type="button" className="btn btn-secondary" onClick={() => setNewContact({ nombre: "", apellidos: "", dirección: "", códigoPostal: "", provincia: "", teléfono: "", email: "" })}>Cancelar</button>
//                             </div>
//                         </form>

//                         <form>
//                             <h2 className="mt-4">Método de pago</h2>
//                             <div className="col-sm-8 p-3 mb-3 bg-success text-dark bg-opacity-25 rounded">
//                                 <input className="form-check-input" type="radio" name="metodoPago" id="tarjetaCredito" value="tarjeta" />
//                                 <label className="form-check-label" htmlFor="tarjetaCredito">
//                                     <h5 className="m-0">Tarjeta de crédito</h5>
//                                 </label>
//                                 <div className="row p-3 gx-6">
//                                     <div className="col-md-6">
//                                         <label htmlFor="inputCardNumber" className="form-label">Número de tarjeta</label>
//                                         <input type="text" className="form-control" id="inputCardNumber" placeholder="XXXXXXXXXXXX" />
//                                     </div>
//                                     <div className="col-md-3">
//                                         <label htmlFor="inputCvc" className="form-label">CVC:</label>
//                                         <input type="text" className="form-control" id="inputCvc" placeholder="0000" />
//                                     </div>
//                                     <div className="col-md-3">
//                                         <label htmlFor="inputExpiry" className="form-label">Caducidad:</label>
//                                         <input type="text" className="form-control" id="inputExpiry" placeholder="MM/AA" />
//                                     </div>
//                                     <div className="col-md-12">
//                                         <label htmlFor="inputFirstName" className="form-label">Títular de la tarjeta:</label>
//                                         <input type="text" className="form-control" id="inputFirstName" />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-sm-8 p-3 mb-3 bg-success text-dark bg-opacity-25 rounded">
//                                 <input className="form-check-input" type="radio" name="metodoPago" id="paypal" value="paypal" />
//                                 <label className="form-check-label" htmlFor="paypal">
//                                     <h5 className="m-0">PayPal</h5>
//                                 </label>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <p className="mb-0">Pago con mi cuenta de Paypal</p>
//                                     <FontAwesomeIcon icon={faPaypal} size="3x" />
//                                 </div>
//                             </div>

//                             <div className="d-flex justify-content-start">
//                                 <button type="submit" className="btn btn-primary me-1">Pagar</button>
//                                 <button type="button" className="btn btn-secondary">Cancelar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };