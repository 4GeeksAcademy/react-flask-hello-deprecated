import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Cardnote } from "../component/cardnote";
import { FormNote } from "../component/formNote";


export const Notes = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container" style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="container text-center mt-5">
                <h1>Notes</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">

                    <Cardnote />
                    <Cardnote />
                    <Cardnote />
                    <Cardnote />



                </div>
            </div>
            <div className="fixed-bottom d-flex justify-content-end p-4">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal2">New note</button>
            </div>

            <div className="modal" id="modal2" tabindex="-1" aria-labelledby="modal2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal2Label"> Hi Arnold!, what idea do you want to save?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <FormNote />

                        </div>
                        <div className="modal-footer">
            
                                {/* lista de categorias */}
                                <div class="dropdown-center">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Label
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Health</a></li>
                                        <li><a class="dropdown-item" href="#">Sport</a></li>
                                        <li><a class="dropdown-item" href="#">Education</a></li>
                                        <li><a class="dropdown-item" href="#">Finance</a></li>
                                    </ul>
                                </div>

                            <button type="button" className="btn btn-primary">Create note</button>
                        </div>
                    </div>
                </div>
            </div>
















            {/* <div className="modal fade" id="modal2" tabIndex="-1" aria-labelledby="modal2Label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modal2Label">new note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Create note</button>
                            </div>
                        </div>
                    </div>
                </div> */}

        </div >
    );
};










// return (
//     <div className="container mt-5 w-50">
//         <div className="d-flex justify-content-center fs-2 mb-2"><input className="w-75 border-2 rounded-pill text-center" type="text" placeholder="What do you need to do?" onKeyDown={agregarLista} value={tarea} onChange={agregarTarea} /></div>
//         <ul className="my-2 p-0 d-flex justify-content-between">
//             {/* Crear con map lista */}
//             <div className="list-group">
//                 {listaTareas.length > 0 ? listaTareas.map((item) => <li className="list-group-item list-group-item-dark" key={item.id}>{item.label}<button type="button" className="btn btn-light position end-0" onClick={() => eliminarTarea(item.id)}>x</button></li>) : null}
//             </div>
//         </ul>
//         {listaTareas.length + ` Task left`}
//     </div>
// );