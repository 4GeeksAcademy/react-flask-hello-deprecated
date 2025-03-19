import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/bracketsCard.css";

export const BracketCard16 = () => {

    return (
            <div className="tournament-bracket container p-4">
                <div className="row justify-content-between d-flex mx-0">

                    {/* ///////////////////////////// CUARTOS DE FINAL ///////////////////////////// */}
                    <div className="col-md-3 round mb-4">

                        <div>
                            <h3 className="text-center mb-4 round-title">Cuartos de Final</h3>
                            <hr className="text-primary"/>
                        </div>

                        <div className="align-items-center">
                            {/* ///////////////// Primer Partido ///////////////// */}
                            <div>
                                <div className="mb-5">
                                    {/* ///////// Equipo 1 ///////// */}
                                    <div className="matchup card mb-2">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 1</p>
                                        </div>
                                    </div>
                                    {/* ///////// Equipo 2 ///////// */}
                                    <div className="matchup card">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ///////////////// SEGUNDO Partido ///////////////// */}
                            <div>
                                <div className="mb-5">
                                    {/* ///////// Equipo 3 ///////// */}
                                    <div className="matchup card mb-2">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 3</p>
                                        </div>
                                    </div>
                                    {/* ///////// Equipo 4 ///////// */}
                                    <div className="matchup card">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ///////////////// TERCER Partido ///////////////// */}
                            <div>
                                <div className="mb-5">
                                    {/* ///////// Equipo 5 ///////// */}
                                    <div className="matchup card mb-2">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 5</p>
                                        </div>
                                    </div>
                                    {/* ///////// Equipo 6 ///////// */}
                                    <div className="matchup card">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 6</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ///////////////// CUARTO Partido ///////////////// */}
                            <div>
                                <div>
                                    {/* ///////// Equipo 7 ///////// */}
                                    <div className="matchup card mb-2">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 7</p>
                                        </div>
                                    </div>
                                    {/* ///////// Equipo 8 ///////// */}
                                    <div className="matchup card">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Equipo 8</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ///////////////////////////// SEMI FINALES ///////////////////////////// */}
                    <div className="col-md-3 round d-flex flex-column mb-4">

                        <div>
                            <h3 className="text-center mb-4 round-title">Semi Finales</h3>
                            <hr className="text-primary"/>
                        </div>

                        <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100 flex-column">

                            {/* ///////////////// Primer Partido ///////////////// */}
                            <div className="w-100 mb-5 pb-md-5">
                                <div>
                                    <div className="matchup card mb-2">
                                        <div className="d-flex align-items-center">
                                            <p className="team m-2 m-0">Ganador QF 1</p>
                                        </div>
                                    </div>
                                    <div className="matchup card">
                                        <div className="d-flex align-items-center">
                                            <p className="team m-2 m-0">Ganador QF 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ///////////////// Segundo Partido ///////////////// */}
                            <div className="w-100 mt-md-5 pt-md-5 mt-5">
                                <div>
                                    <div className="matchup card mb-2">
                                        <div className="d-flex align-items-center">
                                            <p className="team m-2 m-0">Ganador QF 3</p>
                                        </div>
                                    </div>
                                    <div className="matchup card">
                                        <div className="d-flex align-items-center">
                                            <p className="team m-2 m-0">Ganador QF 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ///////////////////////////// FINAL ///////////////////////////// */}
                    <div className="col-md-3 round d-flex flex-column mb-4">

                        <div >
                            <h3 className="text-center mb-4 round-title">Final</h3>
                            <hr className="text-primary"/>
                        </div>

                        {/* ///////////////// Partido Final ///////////////// */}
                        <div className="d-flex flex-grow-1 align-items-center">
                            <div className="w-100">
                                <div className="mb-2">
                                    {/* ///////// Ganador SF 1 ///////// */}
                                    <div className="matchup card mb-2">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Ganador SF 1</p>
                                        </div>
                                    </div>
                                    {/* ///////// Ganador SF 2 ///////// */}
                                    <div className="matchup card">
                                        <div className="align-items-center">
                                            <p className="team m-2 m-0">Ganador SF 2</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* ///////////////////////////// GANADOR ///////////////////////////// */}
                <div className="col-md-3 round d-flex flex-column mb-4 w-100">
                    <h3 className="text-center mb-4 round-title">Ganador</h3>
                    <hr className="text-primary"/>

                    <div className="d-flex flex-grow-1 align-items-center matchup card mb-2">
                        <p className="team m-2 m-0">Ganador del Torneo</p>
                    </div>
                </div>

            </div>
    );
};