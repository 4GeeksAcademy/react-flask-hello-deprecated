export function clean_materia_data(materia, calificacionesArr) {
    let notas = calificacionesArr.filter(
        (calificacion) => calificacion.materia === materia[0]).map((calificacion) => calificacion.nota)
    return {
        "materia": materia,
        "evaluaciones": calificacionesArr.filter((calificacion) => calificacion.materia == materia[0]).length,
        "notas": notas,
        "promedio": notas.length ? notas.reduce((a, b) => a + b) / notas.length : 0
    }
}
export function clean_student_data(obj) {
    let body = {
        id: obj.id,
        nombre: obj.nombre,
        grado: obj.grado,
        materias: obj.materias.map((materia) =>
            clean_materia_data(materia, obj.calificaciones)
        ),
    };

    return body;
}



export const get_student_avg = (student) => {

    let avg = student.materias.length ? student.materias.map((materia) => {
        return materia.promedio
    }).reduce((a, b) => a + b) / student.materias.length : 0

    return {
        "nombre": student.nombre,
        "promedio": avg
    }
}