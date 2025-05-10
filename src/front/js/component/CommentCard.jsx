import React, { useContext, useEffect, useState } from 'react'
import ImageLoader from './ImageLoader.jsx'
import { Context } from '../store/appContext.js'
import { toastExito, toastFallo} from './Toaster/toasterIndex.jsx'


const StarComponentShell = ({ value }) => {
    if (value) {
        return (
            <div
                className='d-flex justify-content-start align-content-center '>
                <i style={{ fontSize: "25px", color: "yellow" }} className="fa-solid fa-star m-1"></i>
            </div>
        )
    }
    return (
        <div
            className='d-flex justify-content-start align-content-center '>
            <i style={{ fontSize: "25px", color: "black" }} className="fa-solid fa-star m-1"></i>
        </div>
    )
}

const CommentCard = ({ userName, stars, img_url, text, id, deleteButton,setData }) => {
    const {store,actions}=useContext(Context)
    const miArray2 = Array(5).fill(0);
    const resultado = miArray2.map((_, index) =>
        index < stars ? 1 : 0
    );

    const deleteHandle=(id)=>{
        actions.deleteComment({comment_id:id})
        .then((res)=>{
            toastExito(res.msj)
            actions.getAllCommentsMade().then((res)=>setData(res.result))
        })
        .catch((err)=>toastFallo(err.msj))
    }

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="card container-fluid" >
            <div className="card-body">
                <div className='d-flex justify-content-between align-content-center flex-row'>
                    <div className='d-flex justify-content-start align-content-center flex-row'>
                        <div className="rounded-circle" style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                            <ImageLoader
                                src={img_url}
                                alt='Imagen por defecto'
                                width="100%"
                                height="100%"
                            />
                        </div>

                        <h4 className='m-0 p-0 d-flex justify-content-start align-items-center'>
                            {`${userName}  `}
                        </h4>

                    </div>
                    {
                        deleteButton &&
                        <button 
                        onClick={()=>deleteHandle(id)}
                        className='btn btn-danger'>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    }


                </div>
                <hr />
                <div>
                    <div className='d-flex justify-content-start align-content-center flex-row mb-2'>
                        {
                            resultado.map((elem, index) => <StarComponentShell key={index} value={elem} />)
                        }
                    </div>
                    <p style={{ fontSize: "1.5rem" }} className="w-full ">
                        {text}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default CommentCard