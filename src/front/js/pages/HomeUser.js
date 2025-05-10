import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/genre.css"

export const HomeUser = () => {

    const { store, actions } = useContext(Context);

    // const newArtistFollowed = (item) => {
    //     actions.followArtist(item)
    // } ----- This would be with store/actions 


    useEffect(() => {
        actions.loadGenres(); // Fetch genres when component mounts
    }, []);


    const artist = [
        { name: 'Artista 1', genre: 'Rock', image: 'https://placehold.co/50' },
        { name: 'Artista 2', genre: 'Rock', image: 'https://placehold.co/50' },

        { name: 'Artista 3', genre: 'Pop', image: 'https://placehold.co/50' },
        { name: 'Artista 4', genre: 'Pop', image: 'https://placehold.co/50' },

        { name: 'Artista 5', genre: 'Jazz', image: 'https://placehold.co/50' },
        { name: 'Artista 6', genre: 'Jazz', image: 'https://placehold.co/50' },
        // More artists...
    ]


    return (
        <div className="container">

            {store.genres?.map((g, index) => {
                return (
                    <div key={index}>
                        <h1 className="genretitle mt-3">{g.name}</h1><br />
                        <div className="artists row row-cols-1 row-cols-md-3 g-4">

                            {artist?.map((artist, artistIndex) => {

                                return (
                                    <div key={artistIndex} className="artistcard">
                                        <div className="card">
                                            <img src={artist.image} className="card-img-top" alt={artist.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{artist.name}</h5>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3">
                                                <button type="button" className="followbtn btn-outline-purple">
                                                    {/* onClick={() => newArtistFollowed(artist.name)} */}
                                                    Seguir artista
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
