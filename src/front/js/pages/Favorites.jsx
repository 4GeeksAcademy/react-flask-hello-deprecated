import React, { useEffect, useContext, useState } from 'react'

import { Context } from "../store/appContext"

const Favorites = () => {

    const { store, actions } = useContext(Context)
    const [usersFavoritesArray, setUsersFavoritesArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let [isInFavorites, setIsInFavorites] = useState(false)

    useEffect(() => {
        console.log("Will try to get all favorites")

        actions.getAllFavorites()
            .then((res) => {
                console.log(res)
                setUsersFavoritesArray(res.result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])


    const handleFavorite = (e) => {
        console.log(e.target.id)

        actions.addOrRemoveFavorite({
            favorite_id: e.target.id,
            favorite_status: isInFavorites
        }).then((res) => {
            setIsInFavorites(res.result)
        }).catch((e) => { console.log("error", e) })
    }




    if (isLoading) {
        return (
            <div>
                <div>
                    <h1>favoritos aqui</h1>
                    <p>cargando</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>favoritos aqui</h1>
                {usersFavoritesArray.length > 0 ? usersFavoritesArray.map((item) => {
                    return (
                        <div className='border m-2 w-25' key={item.id}>

                            <p>{item.name}</p>
                            <button id={item.id} onClick={(e)=>handleFavorite(e)} className="btn btn-primary">
                                {
                                    isInFavorites ?
                                        <>
                                            <i id={item.id} className="fa-solid fa-heart"></i>
                                            <span id={item.id}> Esta en favoritos</span>
                                        </>
                                        :
                                        <>
                                            <i id={item.id} className="fa-regular fa-heart"></i>
                                            <span id={item.id}> No esta en favoritos</span>
                                        </>
                                }
                            </button>
                        </div>
                    )
                }) : <div>No tienes favoritos agregados</div>}
            </div>
        </div>
    )
}

export default Favorites