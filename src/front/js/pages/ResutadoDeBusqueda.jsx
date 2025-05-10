import React, { useContext, useState, useEffect } from 'react'
import SearchBar from '../component/SearchBar.jsx'
import FreelanceCard from '../component/FreelanceCard.jsx'
import { Context } from '../store/appContext.js'

const ResutadoDeBusqueda = () => {
  const { store, actions } = useContext(Context)

  useEffect(() => {
    if (!!store.terminoBusqueda) {
      actions.busquedaFreelancers(store.terminoBusqueda)
    }
  }, [])

  return (
    <div className=" d-flex flex-column align-items-start vh-100  p-3" >
      <div>
        <SearchBar />
        <div className='w-100'>
          <h2>Resultado de busqueda</h2>
        </div>
        <div className='w-100 d-flex justify-content-between align-items-center flex-row flex-wrap'>
          {
            store.resutadosBusqueda.length ?
              store.resutadosBusqueda.map((elem) => <FreelanceCard key={elem.id} {...elem} />)
              :

              <div>
              <h3>No hay resultados de busqueda</h3>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResutadoDeBusqueda