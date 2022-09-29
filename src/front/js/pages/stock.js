import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/adm.css";
import { Context } from "../store/appContext";

export const Stock = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getComida()
    }, []);
    console.log(store.comida)


    return (
        <div className="d-flex body-adm">
      <div id="sidebar-container" className="bg-primary" >
        <div className="logo">
          <h4 className="text-light font-weight-bold">Logo</h4>
        </div>
        <div className="menu">
        <div class="navbar-collapse text-light mr-2 p-3" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">

                  <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                    <i class="icon ion-md-person mr-2 "></i> Perfil
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Mi perfil</a>
                    <a class="dropdown-item" href="#">Configuracion</a>
                    <div class="dropdown-divider"></div>
                    <Link to="/demo">
                    <a class="dropdown-item" href="#">Cerrar sesion</a>
                    </Link>
                  </div>
                </li>
              </ul>

            </div>
            <hr className="loco"></hr>
          <Link to="/adm">
            <a href="#" className="d-block text-light mr-2 p-3" ><i class="icon ion-md-apps mr-2 lead"></i>Tablero</a>
          </Link>
          <Link to="/adm1">
            <a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-people mr-2 lead"></i>Usuarios</a>
          </Link>
          <Link to="/stock"><a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-stats mr-2 lead"></i>Stocks</a></Link>


          


        </div>
        
      </div>
            <div className="w-100">
                <div className="container">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">

                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <form class="form-inline my-2 d-inline-block position-relative">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-search position-absolute" type="submit"><i class="icon ion-md-search"></i></button>
                        </form>

                    </nav>
                    <div className="" id="content">
                        <section className="py-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9">

                                        <p className="lead text-muted">Estas en Stocks De Productos</p>
                                    </div>
                                    <div className="col-lg-3 d-flex">

                                    </div>
                                </div>
                            </div>
                        </section>
                        {store.comidas.map((e,i)=>{
                            return(

                        <section className="tablero-info">

                            <div className="col-md-9">

                            

                                <hr class="my-4" />
                                <section>
                                    <table class="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Nombre</th>
                                                <th scope="col">Email</th>
                       
                                                <th scope="col">Direccion</th>
                                                <th scope="col">Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>{e.name}</td>
                                                <td>Correo@gmail.com</td>
                                                <td>Santiago de chile</td>
                                                <td>15/01/2022</td>
                                            </tr>
                                          
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </section>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>

    );
};


