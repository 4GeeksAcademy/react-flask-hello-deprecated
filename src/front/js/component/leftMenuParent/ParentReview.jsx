import React, { useEffect, useState, useContext } from 'react'
import { Container } from '../ProfileForm.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext.js'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import ShowSubjectTests from '../ShowSubject.jsx'


const Wrapper = styled.div`
margin: 0 auto;
width: 95%;
border: 1px solid white;
border-radius: 28px;
background-color: rgba(100, 149, 237, 0.4);
`

const InfoWrapper = styled.p`
border-radius: 15px;
padding: 1rem;
background: red;
`


const getBaseSubjectInfo = (calificaciones, subject_id) => {
    const minGrade = 10


    if (!calificaciones.length || !subject_id) {
        return {
            teacher: "",
            generalAvg: 0,
            totalTests: 0,
            approvedTests: 0,
            failedTests: 0

        }
    }

    let grades = calificaciones.filter(test => test.id_materia == subject_id).map((calificacion) => calificacion.nota)
    let avg = grades.reduce((a, b) => a + b, 0) / grades.length || 0
    let approved = grades.filter(nota => nota >= minGrade).length

    let teacher = calificaciones[0].profesor

    return {
        teacher: teacher,
        generalAvg: avg.toFixed(2),
        totalTests: grades.length,
        approvedTests: approved,
        failedTests: grades.length - approved

    }
}






const ParentReview = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { studentId, subject } = useParams()
    const [students, setStudents] = useState(null)
    const [studentData, setStudentData] = useState(null)
    const [selectsValue, setSelectsValue] = useState({
        estudiante: "",
        materia: ""
    })
    const [personalRecord, setPersonalRecord] = useState(null)
    const [filters, setFilters] = useState({
        type: "all"
    })

    const handleFilterChange = (e) => {
        setFilters({
            type: e.target.name
        })
    }

    const filterTests = (tests) => {
        tests = tests.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

        if (filters.type == "all") {
            return tests
        }

        if (filters.type == "approved") {
            return tests.filter((test) => test.nota >= 10)
        }

        if (filters.type == "failed") {
            return tests.filter((test) => test.nota < 10)
        }
    }
    const handleSelect = (e) => {
        let selectInput = e.target
        let value = selectInput.value
        if (selectInput.name == "estudiante") {
            setStudentData(students.find((obj) => obj.id == value))
            navigate(`/dashboard/parent/review/${value}`);
            setSelectsValue({ ...selectsValue, [selectInput.name]: value, materia: "" })
            setPersonalRecord(null)
        } else {
            setSelectsValue({ ...selectsValue, [selectInput.name]: value })
            setFilters({type: "all"})
            setPersonalRecord(getBaseSubjectInfo(studentData.calificaciones, value))
            navigate(`/dashboard/parent/review/${studentId}/${value}`)
        }


    }

    useEffect(() => {
        const studentsList = actions.getStudents();
        setStudents(studentsList);
        try {
            if (studentId) {
                let data = actions.getStudentData(studentId)
                setStudentData(data)
                setSelectsValue({ ...selectsValue, estudiante: studentId })
                if (subject) {
                    setSelectsValue({ estudiante: studentId, materia: subject })

                }

            }


        } catch (error) {
            console.error(error)

            Swal.fire({ title: "Ha ocurrido un error", icon: "error", text: error.message })
            setSelectsValue({ ...selectsValue, estudiante: "", materia: "" })
            navigate(`/dashboard/parent/review/`);
        }



    }, [studentId, subject, store.personalInfo])


    useEffect(() => {
        if (studentData) {
            setPersonalRecord(getBaseSubjectInfo(studentData.calificaciones, subject || selectsValue["materia"]))
        }
    }, [studentData, subject])



    return (
        <Container className='container-fluid'>
            <div className='row'>
                <h1 className='text-center'>Revision</h1>
                <hr className='dropdown-divider' />
            </div>
            <div className="row mt-3">
                <div className="col-md-4 col-sm-12">
                    <div className='container-fluid m-0 p-0'>
                        <div className="row mb-3">
                            <div className='col-12'>
                                <label htmlFor="estudiante" className='ms-2'>Estudiante:</label>
                                <div className='container-fluid'>

                                    <select name="estudiante" id="selectEstudiante" className='custom-select rounded-pill w-100' value={selectsValue["estudiante"]} onChange={(e) => handleSelect(e)}>
                                        <option value="" disabled >Opciones...</option>
                                        {students ? students.map((estudiante) => (<option key={`${estudiante.nombre}-${estudiante.id}`} value={estudiante.id}>{estudiante.nombre}</option>)
                                        ) : ""}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                studentData ? (<div className='col-12 '>
                                    <div className='container-fluid m-0 p-0'>
                                        <h4 className='text-start'>{studentData.nombre}</h4>
                                        <div className='row fw-light'>
                                            <div className="col-md-6 justify-content-center d-flex flex-column align-items-start ">

                                                <p>Fecha de Nacimiento: {new Date(studentData.fecha_nacimiento).toISOString().split("T")[0]}</p>
                                                <p >Grado: {studentData.grado}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>) : ""}

                        </div>


                    </div>
                </div>
                <div className="col-md-8 col-sm-12">
                    {studentData ?
                        (<div className='row mb-5'>
                            <div className='col-md-4 col-sm-12'>
                                <label htmlFor="materia" className='ms-2'>Materia:</label>
                                <div className='container-fluid'>

                                    <select name="materia" id="selectEstudiante" className='custom-select rounded-pill' value={selectsValue["materia"]} onChange={(e) => handleSelect(e)}>
                                        <option value="" disabled >Opciones...</option>
                                        {studentData.materias.map((materia, index) => (<option value={materia[1]} key={`${materia}-${index}`}>{materia[0]}</option>))}

                                    </select>
                                </div>
                            </div>
                            {personalRecord ? (<><div className="col-md-4 col-sm-12 d-flex justify-content-center gap-2 align-items-center">
                                <i className="bi bi-award-fill fs-5" ></i>  <p className="m-0"> Profesor/a: {personalRecord.teacher}</p>
                            </div>
                                <div className="col-md-4 col-sm-12 d-flex justify-content-center gap-2 align-items-center">

                                    <i className="bi bi-body-text fs-5"></i> <p className="m-0">Examenes: {personalRecord.totalTests}</p>
                                </div></>) : ""}

                        </div>) : ""}

                    <div className="row">

                        {personalRecord ?
                            <div className="col-12">

                                <div className="row mb-4">
                                    <div className="col-12 d-flex justify-content-center gap-2 align-items-center">
                                        <i className="bi bi-calculator-fill fs-5"></i><p className="m-0">Promedio: {personalRecord.generalAvg}  / 20</p>

                                    </div>

                                </div>

                                <div className="row mb-4">

                                    <div className="col-6 d-flex justify-content-center gap-2 align-items-center">

                                        <i className="bi bi-check-circle-fill fs-5" style={{ color: "#37ff37" }}></i><p className="m-0">Examenes Aprobados: {personalRecord.approvedTests}</p>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center gap-2 align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger fs-5"></i><p className="m-0">Examenes reprobados: {personalRecord.failedTests}</p>

                                    </div>
                                </div>
                            </div>
                            : ""}


                    </div>



                </div>
                {selectsValue["materia"] ? <div className='row'>
                    <div className="col-12">
                        <h5>Filtros: </h5>

                        <div className='btn-group w-50 ms-auto me-auto mb-3'>
                            <button name='all' className='btn btn-light' onClick={(e) => handleFilterChange(e)}>📊 Todos</button>
                            <button name='approved' className='btn btn-light' onClick={(e) => handleFilterChange(e)} >📈 Aprobados</button>
                            <button name='failed' className='btn btn-light' onClick={(e) => handleFilterChange(e)} >📉 Reprobados</button>
                        </div>
                    </div>
                </div> : ""}
                <hr className='dropdown-divider' />

            </div>

            {
                selectsValue["materia"] && personalRecord ? <>


                    <Wrapper className='mb-4 mt-3'>
                        <div className='container-fluid'>

                            <div className='row d-flex justify-content-between m-3 fw-bold'>
                                <div className='col-4 text-truncate text-start'>Evaluacion</div>
                                <div className='col-4 text-truncate text-center'>Avance</div>
                                <div className='col-4 text-truncate text-end'>Nota</div>
                            </div>

                            {
                                filterTests(studentData.calificaciones.filter((evaluacion) => evaluacion.id_materia == selectsValue["materia"]))?.map((test, index) => {
                                    return <div className="col-12" key={`${index}-${test.evaluacion}`}>
                                        <hr className='dropdown-divider' />
                                        <ShowSubjectTests name={test.evaluacion} grade={test.nota} date={test.fecha} description={test.descripcion} key={`${test.evaluacion}-${index}`} />
                                    </div>
                                })
                            }

                        </div>
                    </Wrapper>


                </> : ""
            }


        </Container>
    )
}

export default ParentReview