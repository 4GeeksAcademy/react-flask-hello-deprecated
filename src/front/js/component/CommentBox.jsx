import React, { useContext, useState, } from 'react'
import { Context } from "../store/appContext.js";
import { useForm } from "react-hook-form"
import ImageLoader from './ImageLoader.jsx';
import { toastExito, toastFallo } from './Toaster/toasterIndex.jsx';
import { useNavigate } from 'react-router-dom';

const StarComponent = ({ value, stars, setStarsState }) => {
    const [hover, setHover] = useState(false)
 
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setStarsState(value)}
            style={{ cursor: "pointer" }}
            className='d-flex justify-content-start align-content-center '>
            <i style={{ fontSize: "25px", color: value > stars ? "black" : "yellow", scale: hover ? "1.50" : "1" }} className="fa-solid fa-star m-1"></i>
        </div>
    )
}

const CommentBox = ({freelance_id,setModalOpen}) => {
    const { store, actions } = useContext(Context)
    const [starsState, setStarsState] = useState(1)
       const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const MAX_CHARACTERS = 200
    const MIN_CHARACTERS = 0
    const msj = watch("text")

    const onSubmit = (data) =>{

        actions.postComment({
            text:data.text,
            stars:starsState,
            freelance_id:freelance_id
        })
        .then((res)=>{
            console.log(res)
            toastExito(res.msj)
            setModalOpen(false)
           
        })
        .catch((err)=>toastFallo(err.msj))
        .finally(()=> navigate("/ordenes"))

    }

    return (
        <div style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}} className="card container-fluid" >
            <div className="card-body">
                <div className='d-flex justify-content-start align-content-center flex-row'>
                    <div className="rounded-circle" style={{ height: "50px", width: "50px", marginRight: "10px" }}>
                        <ImageLoader
                            src={store.userProfile?.img_url}
                            alt='Imagen por defecto'
                            width="100%"
                            height="100%"
                        />

                    </div>

                    <h4 className='m-0 p-0 d-flex justify-content-start align-items-center'>
                        {`${store.userProfile.name} ${store.userProfile.last_name} `}
                    </h4>


                </div>
                <hr />
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-start align-content-center flex-column mb-2'>
                        <div className='d-flex justify-content-start align-content-center flex-row mb-2'>
                            {
                                [1, 2, 3, 4, 5].map((elem) => <StarComponent key={elem} stars={starsState} value={elem} setStarsState={setStarsState} />)
                            }
                        </div>
                        <div style={{ height: "30px" }} className='w-full'>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                Comenta aquí <span className={`${msj?.length >= MAX_CHARACTERS ? "text-danger" : "text-black"}`}>({msj?.length || 0}/200 caracteres)</span>
                            </label>
                            <textarea

                                {...register("text", { required: true, maxLength: MAX_CHARACTERS,pattern: /.+/ })}
                                style={{ resize: 'none' }} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div style={{ height: "30px" }} className='w-full'>
                            {
                                errors.text && errors.text.type === "required" && <span className='text-white bg-danger'>Esto debe de ser incluido.</span>
                            }
                            {
                                errors.text && errors.text.type === "pattern" && <span className='text-white bg-danger'>Minimo un caracter.</span>
                            }
                            {
                                errors.text && errors.text.type === "maxLength" && <span className='text-white bg-danger'>Sobrepasa el limite de carateres.</span>
                            }
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentBox