import React, { useContext, useState, useEffect } from "react"
import CommentCard from '../component/CommentCard.jsx'
import { Context } from "../store/appContext.js";

const CommentsMade = ({deleteButton}) => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        actions.getAllCommentsMade()
            .then((res) => {
                setData(res.result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


    if (isLoading == false) {

        return (<div className='my-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
            <h4>
                Comentarios.
            </h4>
            {
                data?.length !== 0 ?
                    data?.map(({ author_full_name, id, stars, author_img_url, text }) => <CommentCard key={id} text={text} userName={author_full_name} img_url={author_img_url} stars={stars} deleteButton  id={id} setData={setData}/>)
                    :
                    <h5>No hay comentarios</h5>
            }

        </div>)

    } else {
        return (
            <div className='my-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
                <h4>
                    Comentarios.
                </h4>
                <h5>No hay comentarios</h5>

            </div>
        )

    }
}

export default CommentsMade