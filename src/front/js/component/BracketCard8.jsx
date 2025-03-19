import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/bracketsCard.css";

export const BracketCard8 = () => {
    const { store } = useContext(Context);
    const matches = store.torneo?.tournament_match || [];

    const semiFinal1 = matches[0]?.participants_match[0];
    const semiFinal2 = matches[1]?.participants_match[0];

    return (
        <div className="bracketCard__container p-4">
            <div className="row justify-content-between d-flex mx-0">

                {/* ///////////////////////////// SEMI FINALES ///////////////////////////// */}
                <div className="col-md-3 bracketCard__round d-flex flex-column mb-4">

                    <div>
                        <h3 className=" bracketCard__h3 text-center mb-4 bracketCard__bracketCard__roundTitle">Semi Finales</h3>
                        <hr className="text-primary" />
                    </div>

                    <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100 flex-column">

                        {/* ///////////////// Primer Partido ///////////////// */}
                        <div className="w-100 mb-3 pb-md-3">
                            <div>
                                <div className="matchup card mb-2">
                                    <div className="d-flex align-items-center">
                                        <p className="bracketCard__team m-2 m-0">Equipo {semiFinal1?.bracketCard__team_1?.bracketCard__team_number || "hola"}</p>
                                    </div>
                                </div>
                                <div className="matchup card">
                                    <div className="d-flex align-items-center">
                                        <p className="bracketCard__team m-2 m-0">Equipo {semiFinal1?.bracketCard__team_2?.bracketCard__team_number || "hola"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ///////////////// Segundo Partido ///////////////// */}
                        <div className="w-100 mt-md-3 pt-md-3 mt-3">
                            <div>
                                <div className="matchup card mb-2">
                                    <div className="d-flex align-items-center">
                                        <p className="bracketCard__team m-2 m-0">Equipo {semiFinal2?.bracketCard__team_1?.bracketCard__team_number || "hola"}</p>
                                    </div>
                                </div>
                                <div className="matchup card">
                                    <div className="d-flex align-items-center">
                                        <p className="bracketCard__team m-2 m-0">Equipo {semiFinal2?.bracketCard__team_2?.bracketCard__team_number || "hola"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* ///////////////////////////// FINAL ///////////////////////////// */}
                <div className="col-md-3 bracketCard__round d-flex flex-column mb-4">

                    <div>
                        <h3 className=" bracketCard__h3 text-center mb-4 bracketCard__bracketCard__roundTitle">Final</h3>
                        <hr className="text-primary" />
                    </div>

                    <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100 flex-column">

                        <div className="w-100 mb-3 pb-md-4">
                            <div className="matchup card">
                                <p className="bracketCard__team m-2 m-0">Ganador SF 1</p>
                            </div>
                        </div>

                        <div className="w-100 mt-md-3 pt-md-4 mt-4">
                            <div className="matchup card">
                                <p className="bracketCard__team m-2 m-0">Ganador SF 2</p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* ///////////////////////////// GANADOR ///////////////////////////// */}
                <div className="col-md-3 bracketCard__round d-flex flex-column mb-4">

                    <div >
                        <h3 className="bracketCard__h3 text-center mb-4 bracketCard__bracketCard__roundTitle">Ganador</h3>
                        <hr className="text-primary" />
                    </div>

                    <div className="d-flex flex-grow-1 align-items-center w-100">
                        <div className="matchup card mb-2 w-100">
                            <p className="bracketCard__team m-2 m-0">Ganador</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};