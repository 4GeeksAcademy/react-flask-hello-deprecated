import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Collapse from 'react-bootstrap/Collapse';

const StyledProgresBar = styled(ProgressBar)`
height: 45%;
width: 40%;
margin: 0 auto;
border: 1px solid grey;
`



export const Progress = (value = 5, min = 0, max = 10) => {
    let variant = "success"

    if (value < 5) {
        variant = "danger"
    } else if (value < 7) {
        variant = "warning"
    } else if (value < 8) {
        variant = 'info'
    }



    return <StyledProgresBar min={min} max={max} now={value} variant={variant} />

}



const ShowSubjectTests = ({ name, grade, description, date }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="container-fluid ">
            <div className="row mb-2 mt-2">
                <div className="col-4 d-flex justify-content-start align-items-center text-truncate" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`bi bi-caret-${isOpen ? "up" : "down"}-fill me-1 d-none d-md-block`}></i> {name}
                </div>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    {Progress(grade)}
                </div>
                <div className='col-4 d-flex justify-content-end align-items-center'>
                    {grade.toFixed(2)}
                </div>
            </div>
            <Collapse in={isOpen}>
                <div className='row'>
                    <div className='col-8'>
                        <p className="text-light ">
                            Descripcion: <br />
                            <span className='fw-light'>
                                {description}</span>
                        </p>
                    </div>
                    <div className="col-4 text-end fw-light">
                        {date.split(" ").slice(0, 4).join(" ")}
                    </div>
                </div>
            </Collapse>

        </div>
    )
}

export default ShowSubjectTests