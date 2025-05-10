import React from 'react'
import ReactLoading from 'react-loading'
import '../../styles/Loader.css'

export function Loader() {
  return (
    <div className='loading-spin'>
      <ReactLoading type="spin" color="black" height={50} width={50} />
    </div>
  )
}
