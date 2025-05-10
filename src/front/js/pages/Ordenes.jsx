import React,{useContext, useEffect, useState} from 'react'
import Tabla from '../component/Tabla.jsx'
import { Context } from '../store/appContext.js'
import {  useLocation } from 'react-router-dom';




const Ordenes = () => {
  const location = useLocation();
  const {store,actions}=useContext(Context)
  const [ordenes,setOrdenes]=useState([])
  
  useEffect(()=>{
    actions.getOrders()
    .then((res)=>{
      console.log(res.result)
      setOrdenes(res.result)
    })
    .catch((err)=>console.log(err))
  },[location.pathname])
  return (
    <div style={{height:"100vh"}} className='container-fluid d-flex align-items-start justify-content-start flex-column gap-2'>
      <h1>Tabla de ordenes</h1>
        <Tabla lista={ordenes}/>
    </div>
  )
}

export default Ordenes