import React, { use, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Context } from "../store/appContext.js";

// function deshabilitarScroll() {
//     document.body.style.overflowX = 'hidden';
// }

// function habilitarScroll() {
//     document.body.style.overflowX = 'auto';
// }

const Sidebar = () => {
    const location = useLocation()
    const { store, actions } = useContext(Context)
    const sideBar = store.sidebarOpen
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            const timer = setTimeout(() => {
    
      setLoading(false)
      console.log('¡Terminado!');
    }, 1000);

    return () => clearTimeout(timer);
    }, [])

    const userLinks = [
        {
            id: 1,
            name: "Ordenes",
            pathName: "/ordenes"
        },
        {
            id: 2,
            name: "Busqueda",
            pathName: "/busqueda"
        },
    ]
    const freelanceLinks = [
        {
            id: 1,
            name: "Freeelance 1",
            pathName: "/ordenes"
        },
        {
            id: 2,
            name: "Freelance 2",
            pathName: "/busqueda"
        },
    ]






    const handleSidebar = () => {
        actions.toggleSideBar()
    }
    // useEffect(()=>{
    //     if(sideBar==true){
    //         deshabilitarScroll()
    //     }else{
    //         habilitarScroll()
    //     }
    // },[
    //     store.sidebarOpen
    // ])



    const styleSidebar = {
        width: "300px",
        // height:"auto",
        // minHeight:"100vh",
        position: "absolute",
        zIndex: 99,
        left: sideBar ? 0 : -300,
        bottom: 0,
        top: 0
    }

    if (loading==true) {
        return (
            <aside style={styleSidebar} className="bg-primary">
                <h3>Cargando...</h3>
            </aside>
        )
    }

    return (
        <aside style={styleSidebar} className="bg-primary">
            <button onClick={handleSidebar} style={{ width: "40px" }} className="btn btn-secondary">
                {
                    store.sidebarOpen === false ?
                        <i className="fa-solid fa-bars"></i>
                        :
                        <i className="fa-solid fa-xmark"></i>
                }
                {
                    store.userProfile?.rol == "user" && userLinks?.map((elem) => <p key={elem.id}>{elem.name}</p>)
             
                }
                {
                    store.userProfile?.rol == "freelance" && freelanceLinks?.map((elem) => <p key={elem.id}>{elem.name}</p>)
                }
            </button>
          
        </aside>
    )


}
export default Sidebar