"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint

from api.models import Calificacion, Estudiante, Materias, db, Role, Docente, Evaluacion
from flask_cors import CORS
from flask_jwt_extended import get_jwt, verify_jwt_in_request, get_jwt_identity
from api.schemas.schemas import TeacherSchema, MateriasSchema, EvaluacionSchema, GradoSchema, StudentSchema, CalificacionSchema
from api.services.generic_services import create_instance, update_instance, delete_instance
from api.services.teacher_services import get_califications, post_update_califications
from api.services.external_services import get_image

app = Flask(__name__)


teacher_routes = Blueprint('teacher_routes', __name__)
# Allow CORS requests to this API
CORS(teacher_routes)

@teacher_routes.before_request
def get_role():
    if request.method == 'OPTIONS':
        return ' ',203
    
    verify_jwt_in_request()
    claims = get_jwt()
    role = Role.query.get(claims["role"])

    if not role:
        return jsonify({"msg": "Role Not found"}),400
    
    if role.nombre.lower() != "docente":
        return jsonify({"msg":"Access Denied"}),403

# //////////////////// Definicion de esquemas ////////

teacher_schema = TeacherSchema()

materias_schema = MateriasSchema(many=True)

evaluaciones_schema = EvaluacionSchema()

student_schema = StudentSchema(exclude=['representante'])

grados_schema = GradoSchema(many=True)

calificacion_schema = CalificacionSchema()

@teacher_routes.route('/info', methods=['GET'])
def get_personal_info():
    docente_id = get_jwt_identity()
    docente = Docente.query.get(docente_id)
    materias = [materia_asociada.materia for materia_asociada in docente.materias_enseñadas]
    grados = [materia.grado for materia in materias]
    docente_info = teacher_schema.dump(docente)
    docente_info["materias"] = materias_schema.dump(materias)
    docente_info["grados"] = grados_schema.dump(grados)
    docente_info["foto"] = get_image(docente.foto) if docente.foto else ""
    
    return jsonify(docente_info),200
    
    #Añadir evaluaciones
    

@teacher_routes.route('/estudiantes/<int:grado_id>', methods=['GET'])
def get_estudiantes_by_grado(grado_id):
    estudiantes = Estudiante.query.filter_by(grado_id=grado_id)
    
    return jsonify(student_schema.dump(estudiantes, many=True))

@teacher_routes.route('/materias/grado/<int:grado_id>', methods=['GET'])
def get_materias_by_grado(grado_id):
    materias = Materias.query.filter_by(grado_id=grado_id)
    
    return jsonify(materias_schema.dump(materias))
    
    
@teacher_routes.route('/evaluaciones/materia/<int:materia_id>', methods=['GET'])
def get_evaluaciones_materia(materia_id):
    materia = Materias.query.get(materia_id)
    
    if not materia:
        return jsonify({"msg":"Materia no encontrada"}),404
    
    evaluaciones = materia.evaluaciones
    
    if not evaluaciones:
        return jsonify({"msg": "No se encontraron evaluaciones"}),404
    
    return jsonify(evaluaciones_schema.dump(evaluaciones, many=True))

@teacher_routes.route('/evaluaciones', methods=['POST'])
def add_test():
    body = request.get_json()
    
    if not body:
        return jsonify({"msg":"Missing Body"}),400
    
    materia = body.get('materia_id')
    
    if not Materias.query.get(materia):
        return jsonify({"msg": "Materia no encontrada"}),404
    
    body['profesor_id'] = get_jwt_identity()
    
    return create_instance(Evaluacion, body, evaluaciones_schema)

@teacher_routes.route('/evaluaciones', methods=['GET'])
def get_tests():
    docente = Docente.query.get(get_jwt_identity())
    
    return jsonify(evaluaciones_schema.dump(docente.evaluaciones, many=True))

@teacher_routes.route('/evaluaciones/<int:test_id>', methods=['PUT'])
def update_test(test_id):
    body = request.get_json()
    
    if not body:
        return jsonify({"msg": "Missing body"}),400
    
    return update_instance(Evaluacion, test_id, body, evaluaciones_schema)

@teacher_routes.route('/evaluaciones/<int:test_id>', methods=['DELETE'])
def delete_test(test_id):
    
    return delete_instance(Evaluacion, test_id)

# Calificaciones

@teacher_routes.route('/calificaciones', methods=['GET'])
def get_teacher_califications():
    calificaciones = get_califications(get_jwt_identity())
    
    return jsonify(calificacion_schema.dump(calificaciones, many=True))

@teacher_routes.route('/calificaciones', methods=['POST','PUT'])
def add_update_calification():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Missing Body"}),400
    
    return post_update_califications(body, get_jwt_identity())

@teacher_routes.route('/calificaciones/<int:calificacion_id>', methods=['DELETE'])
def delete_calification(calificacion_id):
    return delete_instance(Calificacion,calificacion_id)
