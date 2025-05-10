from marshmallow import ValidationError
from api.models import Estudiante, db, Docente, DocenteMaterias, Evaluacion, Calificacion, Materias
from flask import jsonify
from api.schemas.schemas import CalificacionRequestSchema
from api.services.generic_services import create_instance
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

def get_califications(profesor_id):
    calificaciones = db.session.query(Calificacion).join(
        Evaluacion, Calificacion.evaluacion_id == Evaluacion.id
    ).join(
        Materias, Evaluacion.materia_id == Materias.id
    ).join(
        DocenteMaterias, Materias.id == DocenteMaterias.id_materia
    ).filter(
        DocenteMaterias.id_docente == profesor_id
    ).all()

    return calificaciones

def post_update_califications(body, teacher_id):
    schema = CalificacionRequestSchema()
    
    try:
        schema.load(body)
    except ValidationError as e:
        return jsonify({"Error de Validacion": e.messages}),400
    
    
    id_materia = body.get("materia_id", None)
    id_evaluacion = body.get("evaluacion_id", None)
    estudiantes_notas = body.get("estudiantes_notas", [])

    if not estudiantes_notas:
        return jsonify({"msg": "No se proporcionaron estudiantes con sus notas."}), 400
    
    if not (id_materia and id_evaluacion):
        return jsonify({"msg": "Wrong body Structure"}),400
    
    docente = Docente.query.get(teacher_id)
    evaluacion = Evaluacion.query.filter_by(id=id_evaluacion, materia_id=id_materia, profesor_id=teacher_id).first()
    
    if not (docente and evaluacion):
        return jsonify({"msg":"teacher/test/student Not found"}),404
    
    if not evaluacion.finalizada:
        evaluacion.finalizada = True
        
    try:
        
        materia = evaluacion.materia
        grado_materia = materia.grado
        
        for estudiante_data in estudiantes_notas:
            estudiante = Estudiante.query.get(estudiante_data['estudiante_id'])
            
            if not estudiante:
                db.session.rollback() 
                return jsonify({"msg": f"Estudiante {estudiante_data['estudiante_id']} no encontrado"}), 404

            materia = evaluacion.materia
            grado_materia = materia.grado
            grado_estudiante = estudiante.grado

            if grado_materia.id != grado_estudiante.id:
                db.session.rollback()  
                return jsonify({
                    "msg": f"Estudiante {estudiante_data['estudiante_id']} no asignado a la materia",
                    "grado_materia": grado_materia.id,
                    "grado_estudiante": grado_estudiante.id
                }), 400
                
            calificacion_existente = Calificacion.query.filter_by(
                evaluacion_id=evaluacion.id,
                estudiante_id=estudiante_data['estudiante_id']
            ).first()

            # Aqui permitire la actualizacion de la nota en caso de ser enviada tambien
            if calificacion_existente:
                
                calificacion_existente.nota = estudiante_data['nota']
            else:
                
                calificacion = Calificacion(
                    evaluacion_id=evaluacion.id,
                    estudiante_id=estudiante_data['estudiante_id'],
                    nota=estudiante_data['nota']
                )
                db.session.add(calificacion)
            

            
        db.session.commit()
        
        return jsonify({"msg": "Calificaciones creadas exitosamente"}), 201

    except IntegrityError as e:
        db.session.rollback() 
        return jsonify({"msg": "Error de integridad en los datos", "error": str(e)}), 400
    except SQLAlchemyError as e:
        db.session.rollback() 
        return jsonify({"msg": "Error en la base de datos", "error": str(e)}), 500
    except Exception as e:
        db.session.rollback() 
        return jsonify({"msg": "Error inesperado", "error": str(e)}), 500
            
            