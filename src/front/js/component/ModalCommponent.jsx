import React from 'react'
import CommentBox from "./CommentBox.jsx"
import { useNavigate } from 'react-router-dom';

const ModalCommponent = ({modalOpen,setModalOpen,freelance_id}) => {
   const navigate=useNavigate()

    const styleModal={
        position:  "absolute",
        display: modalOpen?"flex": "none",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        boxSizing:"content-box",
        zIndex:100,
        justifyContent:"center",
        alignItems:"center"
    }
    const styleButton={
        position:"absolute",
        width: "50px",
        height: "50px",
        backgroundColor:"rgb(68, 64, 64)",
        top:20,
        right:20
    }

  return (
    <div  style={styleModal} >
        <div  style={{width:"700px",height:"auto"}}>
          <button 
          onClick={()=>{
            setModalOpen((prev)=>!prev)
           navigate("/ordenes")
          }}
          
          className='btn rounded-circle   d-flex justify-content-center align-items-center' style={styleButton}>
            <i className="fa-solid fa-xmark text-white"></i>
          </button>
          <div className='d-flex  justify-content-center align-items-center flex-column'>
            <h5 className='text-white' >Agrega un comentario.</h5>
                      <CommentBox freelance_id={freelance_id} setModalOpen={setModalOpen}/>
          </div>
        </div>


    </div>
  )
}

export default ModalCommponent