import React from "react"
import toast from "react-hot-toast";

export const toastExito=(mensaje)=>toast.success(mensaje,{duration:4000}); 
export const toastFallo=(mensaje)=>toast.error(mensaje,{duration:4000}); 