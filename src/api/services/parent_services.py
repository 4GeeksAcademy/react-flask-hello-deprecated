from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from api.models import Docente, DocenteMaterias, User, Estudiante, Materias
from marshmallow import ValidationError


def get_student_resume(parent_id):
    
    children = Estudiante.query.filter_by(representante_id=parent_id).all()
    
    
    data = []
    try:
        for child in children:
            student_info = {
                "nombre": f"{child.nombre} {child.apellido}",
                "grado": child.grado.nombre,
                "materias": [materia.nombre for materia in child.grado.materias],
                "evaluaciones": [
                    {
                        "evaluacion": calificacion.evaluacion.nombre,
                        "materia": calificacion.evaluacion.materia.nombre,
                        "nota": calificacion.nota,
                        "fecha": calificacion.evaluacion.fecha,
                        "profesor": f"{calificacion.evaluacion.profesor.nombre} {calificacion.evaluacion.profesor.apellido}"
                    }
                    for calificacion in child.calificaciones
                ]
            }
            data.append(student_info)
    except Exception as e:
        print(str(e))
        return jsonify({"msg": "Error collecting student data"}), 500
        
    return data


def get_student_review(student_id,materia):
    
    student = Estudiante.query.get(student_id, materia)
    
    student = Estudiante.query.get(student_id)
    materia = Materias.query.filter(Materias.nombre.ilike(materia)).first()
    
    if not (student and materia):
        return jsonify({"msg": "Not Found"}),404
    
    evaluaciones = [
                    {
                        "evaluacion": calificacion.evaluacion.nombre,
                        "descripcion": calificacion.evaluacion.descripcion,
                        "nota": calificacion.nota,
                        "fecha": calificacion.evaluacion.fecha,
                        "profesor": f"{calificacion.evaluacion.profesor.nombre} {calificacion.evaluacion.profesor.apellido}"
                    }
                    for calificacion in student.calificaciones if calificacion.evaluacion.materia_id == materia.id
                ]
    
    data = []
    try:
        for child in student:
            student_info = {
                "nombre": f"{child.nombre} {child.apellido}",
                "grado": child.grado.nombre,
                "materias": [materia.nombre for materia in child.grado.materias],
                "evaluaciones": [
                    {
                        "evaluacion": calificacion.evaluacion.nombre,
                        "descripcion": calificacion.evaluacion.descripcion,
                        "nota": calificacion.nota,
                        "fecha": calificacion.evaluacion.fecha,
                        "profesor": f"{calificacion.evaluacion.profesor.nombre} {calificacion.evaluacion.profesor.apellido}"
                    }
                    for calificacion in child.calificaciones
                ]
            }
            data.append(student_info)
    except Exception as e:
        print(str(e))
        return jsonify({"msg": "Error collecting student data"}), 500
        
    return evaluaciones





def get_students_info(parent_id):
    
    children = Estudiante.query.filter_by(representante_id=parent_id).all()
    
    
    data = []
    try:
        for child in children:
            student_info = {
                "id": child.id,
                "nombre": f"{child.nombre} {child.apellido}",
                "fecha_nacimiento": child.fecha_nacimiento,
                "grado": child.grado.nombre,
                "materias": [[materia.nombre, materia.id] for materia in child.grado.materias],
                "calificaciones": [
                    {
                        "evaluacion": calificacion.evaluacion.nombre,
                        "materia": calificacion.evaluacion.materia.nombre,
                        "id_materia":calificacion.evaluacion.materia.id,
                        "descripcion": calificacion.evaluacion.descripcion,
                        "nota": calificacion.nota,
                        "fecha": calificacion.evaluacion.fecha,
                        "profesor": f"{calificacion.evaluacion.profesor.nombre} {calificacion.evaluacion.profesor.apellido}"
                    }
                    for calificacion in child.calificaciones
                ]
            }
            data.append(student_info)
    except Exception as e:
        print(str(e))
        return jsonify({"msg": "Error collecting student data"}), 500
        
    return data
