import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { useNavigate } from 'react-router-dom';

import "/workspaces/Fs-Spain_85-AllGamesDB/src/front/styles/gamesearchlist.css";


export const GameSearchList = () => {
    const [tags, setTags] = useState([])
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const handleGameClick = (game) => {
        actions.setSpecificVideogameSteamId(game)
        navigate(`/game/${game.id}`);
    };

    useEffect(() => {
        const fetchTagsData = async () => {
            const tags = await actions.fetchTags();
            setTags(tags);
        };
        fetchTagsData();
    }, []);

    return (
        <div className="d-flex">
            <div className="search-editor border d-flex row p-2">
                <h4>Tags: </h4>
                <div className="d-flex align-content-center row justify-content-around">
                    {store.tags.length > 0 ? store.tags.slice(0, 20).map((tag, index) => (
                        <div key={index} className="col-xl-3 col-md-6 border">
                            <p>{tag}</p>
                        </div>
                    ))

                        :
                        <p> Loading Tags... </p>}
                </div>
            </div>
            <div className="games-search-table">
                {Array.isArray(store.videogamesSearch) && store.videogamesSearch.length > 0 ? (
                    store.videogamesSearch.map((game) => (
                        <div key={game.id} className="game-row" onClick={() => handleGameClick(game)}>
                            <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/capsule_231x87.jpg`} alt={game.name} className="game-image" />
                            <div className="game-info">
                                <h4 className='game-title'>{game.name}</h4>
                                <p className='tags'>{game.game_tags.slice(0, 3).map((tag) => tag.tag_name).join(', ')}</p>
                            </div>
                            {/* <button className="favorite-btn">❤️</button> */}
                            <button className="price-btn">{game.steam_price > game.g2a_price ? game.g2a_price : game.steam_price} €</button>
                        </div>
                    ))

                ) : (
                    <p>No hay videojuegos disponibles</p>
                )}
                <nav aria-label="..." className="float-end ">
                    <ul className="pagination align-middle my-2">
                        <li className={`page-item ${store.currentSearchPage <= 1 ? "disabled" : ""}`} >
                            <a className="page-link" onClick={() => actions.handlePagination(store.currentSearchPage - 1)} href="#">Previous</a>
                        </li>

                        {store.currentSearchPage > 5 && (
                            <li className="page-item" onClick={() => actions.handlePagination(1)}>
                                <a className="page-link" href="#">1</a>
                            </li>
                        )}

                        {store.currentSearchPage > 6 && (
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        )}

                        {Array.from(
                            { length: 8 },
                            (_, index) => store.currentSearchPage - 4 + index)
                            .filter(page => page >= 1 && page <= store.numberOfPagesFromSearch)
                            .map(page => (
                                <li key={page} className={`page-item ${store.currentSearchPage === page ? "active" : ""}`} onClick={() => actions.handlePagination(page)}>
                                    <a className="page-link" href="#">{page}</a>
                                </li>
                            ))}

                        {store.currentSearchPage < store.numberOfPagesFromSearch - 4 && (
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        )}

                        {store.currentSearchPage < store.numberOfPagesFromSearch - 3 && (
                            <li className="page-item" onClick={() => actions.handlePagination(store.numberOfPagesFromSearch)}>
                                <a className="page-link" href="#">{store.numberOfPagesFromSearch}</a>
                            </li>
                        )}
                        <li className={`page-item ${store.currentSearchPage >= store.numberOfPagesFromSearch ? "disabled" : ""}`}>
                            <a className="page-link" onClick={() => actions.handlePagination(store.currentSearchPage + 1)} href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};
