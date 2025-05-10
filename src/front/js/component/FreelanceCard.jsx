import React from 'react'
import { useNavigate } from 'react-router-dom'

const FreelanceCard = ({user_name,title,id}) => {
    const navigate=useNavigate()
    return (
        <div className="card" style={{width: "18rem"}}>
            <img src="https://dummyimage.com/350x200/000/fff.jpg" className="card-img-top" alt="alt image"/>
                <div className="card-body">
                    <h5>{user_name}</h5>
                    <p className="card-text">
                        {
                            title
                        }
                    </p>
                    <button className='btn btn-primary' onClick={()=>navigate(`/freelancePerfil/${id}`)}>
                        Detalles del Freelance

                    </button>

                </div>
        </div>
    )
}

export default FreelanceCard