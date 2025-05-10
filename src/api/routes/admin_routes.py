"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from api.models import db, User, EmailAuthorized, Estudiante, Role, Docente, Materias, Grados, DocenteMaterias
from flask_cors import CORS
from api.utils import bcrypt
from flask_jwt_extended import get_jwt, verify_jwt_in_request, get_jwt_identity
from api.schemas.schemas import TeacherSchema, UserSchema, AuthorizedEmailSchema, StudentSchema, MateriasSchema, DocenteMateriaSchema, GradoSchema, RoleSchema
from datetime import datetime
from api.services.generic_services import create_instance, delete_instance, get_all_instances, update_instance, get_instance_by_id
from api.services.external_services import get_image
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

admin_routes = Blueprint('admin_routes', __name__)
# Allow CORS requests to this API
CORS(admin_routes)

@admin_routes.before_request
def get_role():
    if request.method == 'OPTIONS':
        return ' ',203
    
    verify_jwt_in_request()
    claims = get_jwt()
    role = Role.query.get(claims["role"])

    if not role:
        return jsonify({"msg": "Role Not found"}),400
    
    if role.nombre.lower() != "admin":
        return jsonify({"msg":"Access Denied"}),403

#  Asignacion de Schemas
    
teacher_schema = TeacherSchema()
teachers_schema = TeacherSchema(many=True)    

user_schema = UserSchema()
users_schema = UserSchema(many=True)

authorized_email_schema = AuthorizedEmailSchema()
authorized_emails_schema = AuthorizedEmailSchema(many=True)


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
add_student_schema = StudentSchema(exclude=['fecha_nacimiento', 'fecha_ingreso'])


materia_schema = MateriasSchema()
materias_schema = MateriasSchema(many=True)

grado_schema = GradoSchema()
grados_schema = GradoSchema(many=True)

rol_schema = RoleSchema()
roles_schema = RoleSchema(many=True)

# Endpoint para autorizacion de usuarios nuevos (Docentes y representantes)
@admin_routes.route('/user/auth', methods=['POST'])
def email_authorization():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Missig info"}),400
    
    role_exists = Role.query.filter(Role.nombre.ilike('representante')).first()
    if not role_exists:
        return jsonify({"msg": "Role not found"}), 404
    
    body['role_id'] = role_exists.id
    return create_instance(EmailAuthorized,body,authorized_email_schema)

@admin_routes.route('/user/auth', methods=['GET'])
def get_email_authorizations():
    return get_all_instances(EmailAuthorized,authorized_emails_schema)


@admin_routes.route('/users', methods=['GET'])
def get_users():
    return get_all_instances(User, users_schema)


@admin_routes.route('/info', methods=['GET'])
def get_user_info():
    user = User.query.get(get_jwt_identity())
    
    if not user:
        return jsonify({"msg": "User not found"}),401
    
    user_data = user_schema.dump(user)
    user_data.pop("id")
    user_data.pop("is_active")
    user_data.pop("role_id")
    user_data["foto"] = get_image(user.foto) if user.foto else ""
    
    
    return jsonify(user_data),200

# ////////////////////////////// Teachers Endpoints CRUD ////////////////////
@admin_routes.route('/teachers', methods=['POST'])
def add_teacher():
    body = request.get_json()

    if not body:
        return jsonify({"msg":"Error"}),400
    
    role = Role.query.filter(Role.nombre.ilike("docente")).first()
    
    if not role:
        return jsonify({"msg":"Rol de docente no creado"})
    
    email = body.get('email')
    body["role_id"] = role.id
    body['password'] = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"msg": "No authorizado para registro o ya registrado"}),400
    
    return create_instance(Docente, body, teacher_schema)
    
@admin_routes.route('/teachers', methods=['GET'])
def get_teachers():
    return get_all_instances(Docente,teachers_schema)

@admin_routes.route('/teachers/<int:id>', methods=['GET'])
def get_teacher_by_id(id):
    return get_instance_by_id(Docente,teacher_schema,id)

@admin_routes.route('/teachers/<int:id>', methods=['PUT'])
def update_teacher(id):
    body = request.get_json()
    if not body:
        return jsonify({"msg": "request body not found"}),400
    
    body.pop('email', None)
    body.pop('password', None)

    try:
        teacher_schema.load(body, partial=True)
    except ValidationError as err:
        return jsonify(err.messages)

    return update_instance(Docente,id,body, teacher_schema)
    
@admin_routes.route('/teachers/<int:id>', methods=['DELETE'])
def remove_teacher(id):
    return delete_instance(Docente,id)
    
# /////////////////////////////// Students Endpoints CRUD //////////////////////////
@admin_routes.route('/students', methods=['POST'])
def add_student():
    body = request.get_json()
    
    fecha_nacimiento = body.pop('fecha_nacimiento', None)
    fecha_ingreso = body.pop('fecha_ingreso', None)

    representante = User.query.get(body.get('representante_id'))

    if not representante or representante.role.nombre.lower() != "representante":
        return jsonify({"msg": "Representante no encontrado o con rol diferente"})
    
    
    if not fecha_nacimiento:
        return jsonify({"msg": "Fecha de nacimiento requerida"}),400
    
    if not fecha_ingreso:
        fecha_ingreso = datetime.now()
        fecha_ingreso = fecha_ingreso.strftime('%Y-%m-%d')

    try:
        student = add_student_schema.load(body) 
    except ValidationError as err:
        return jsonify(err.messages),400
    
    existing_student = Estudiante.query.filter_by(
        nombre=student["nombre"], 
        apellido=student["apellido"], 
        representante_id=student["representante_id"]
    ).first()

    if existing_student:
        return jsonify({"error": "Student already exists with the same name, surname, and representative"}), 409
    student["fecha_ingreso"] = fecha_ingreso
    student["fecha_nacimiento"] = fecha_nacimiento
    try:
        newStudent = Estudiante(**student)
        db.session.add(newStudent)
        db.session.commit()
    except IntegrityError as e:
        print(str(e))
        return jsonify({"error": "IntegrityError raised"}),500
    except Exception as e:
        print(str(e))
        return jsonify({"error": "IntegrityError raised"}),500
    
    return jsonify({"msg": "Estudiante Creado"}),201

@admin_routes.route('/students', methods=['GET'])
def get_students():
    return get_all_instances(Estudiante, students_schema)

@admin_routes.route('/students/<int:student_id>', methods=['GET'])
def get_student_by_id(student_id):
    return get_instance_by_id(Estudiante, student_schema, student_id)

@admin_routes.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    body = request.get_json()
    if not body:
        return jsonify({"msg": "request body not found"}),400
    
    student = Estudiante.query.get(id)
    if not student:
        return jsonify({"msg": "Student not found"}),404
    
    fecha_nacimiento = body.pop('fecha_nacimiento', None) 
    fecha_ingreso = body.pop('fecha_ingreso', None)
    
    try:
        student_data = add_student_schema.load(body, partial=True)
        
        if fecha_nacimiento:
            student_data["fecha_nacimiento"] = fecha_nacimiento
            
        if fecha_ingreso:
            student_data["fecha_ingreso"] = fecha_ingreso
        
        for key, value in student_data.items():
            setattr(student, key, value) 
        db.session.commit()
        return jsonify({"msg": "Estudiante actualizado con éxito"}), 200
    
    except ValidationError as e:
        db.session.rollback()
        return jsonify({"msg": e.messages}),400
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
    
@admin_routes.route('/students/<int:student_id>', methods=['DELETE'])
def remove_student(student_id):
    return delete_instance(Estudiante,student_id)

# ////////////////////// Materias endpoints CRUD ///////////////
@admin_routes.route('/materias', methods=['GET'])
def get_materias():
    return get_all_instances(Materias, materias_schema)

@admin_routes.route('/materias/<int:materia_id>', methods=['GET'])
def get_materia_by_id(materia_id):
    return get_instance_by_id(Materias, materia_schema, materia_id)

@admin_routes.route("/materias", methods=['POST'])
def add_materia():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Missing Body"})
    
    grado = body.get('grado_id')
    grado_exists = Grados.query.get(grado)
    if not grado_exists:
        return jsonify({"msg": "Grado no encontrado."}),404
    
    return create_instance(Materias, body,materia_schema)

@admin_routes.route('/materias/<int:materia_id>', methods=['PUT'])
def update_materia(materia_id):
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Body not found"}),400

    return update_instance(Materias, materia_id, body, materia_schema)

@admin_routes.route('/materias/<int:materia_id>', methods=['DELETE'])
def delete_materia(materia_id):
    return delete_instance(Materias,materia_id)
    
# ////////////////// Rol Endpoints CRUD //////////////////////
@admin_routes.route('/roles', methods=['GET'])
def get_roles():
    return get_all_instances(Role, roles_schema)

@admin_routes.route('/roles/<int:role_id>', methods=['GET'])
def get_role_by_id(role_id):
    return get_instance_by_id(Role, roles_schema, role_id)

# /////////////////// Grados Endpoints CRUD //////////////////
@admin_routes.route('/grados', methods=['POST'])
def add_grado():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Missing body"}),400
    
    try:
        grado = grado_schema.load(body)
    except ValidationError  as e:
        return jsonify(e.messages)
    
    return create_instance(Grados, grado, grado_schema)
    
@admin_routes.route('/grados', methods=['GET'])
def get_grados():
    return get_all_instances(Grados, grados_schema)


@admin_routes.route('/grados/<int:grado_id>', methods=['GET'])
def get_grados_by_id(grado_id):
    return get_instance_by_id(Grados, grados_schema, grado_id)


@admin_routes.route('/grados/<int:grado_id>', methods=['PUT'])
def upgrade_grado(grado_id):
    body = request.get_json()
    
    if not body:
        return jsonify({"msg": "Missing body"}),400
    
    grado  = Grados.query.get(id)
    
    if not grado:
        return jsonify({"msg": "Grado no encontrado"}),404
    
    return update_instance(Grados,grado_id, body)

@admin_routes.route('/grados/<int:grado_id>', methods=['DELETE'])
def delete_grado(grado_id):
    return delete_instance(Grados,grado_id)

# ///////////////////// Asociar Materias con docentes ///////////////
@admin_routes.route('/docentes/<int:docente_id>/materias', methods=['GET'])
def get_materias_docente(docente_id):
    docente = Docente.query.get(docente_id)
    
    if not docente:
        return jsonify({"msg": "Teacher not found"}),404
    
    materias = [materia_asociada.materia for materia_asociada in docente.materias_enseñadas]
    
    return jsonify({"Docente": docente.nombre,
                    "id": docente.id,
                    "materias": materias_schema.dump(materias)})
    
@admin_routes.route('/docentes/materias', methods=['GET'])
def get_all_materias_docente():
    asignaciones = DocenteMaterias.query.all()
    schema = DocenteMateriaSchema(many=True)
    if not asignaciones:
        return jsonify({"msg": "Not Found"}),404

    
    return jsonify(schema.dump(asignaciones))


@admin_routes.route('/docentes/materias', methods=['POST'])
def add_materia_docente():
    schema = DocenteMateriaSchema()
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Body not found."}),400

    materia = Materias.query.get(body.get('id_materia'))
    docente = Docente.query.get(body.get('id_docente'))

    if not materia or not docente:
        return jsonify({"msg":"Materia o docente no encontrado"}),404
    
    relation_exists = DocenteMaterias.query.filter_by(id_docente=docente.id, id_materia=materia.id).first()

    if relation_exists:
        return jsonify({"msg": "Teacher already assigned"}),400
    
    return create_instance(DocenteMaterias, body, schema)
    
@admin_routes.route('/docente/<int:docente_id>/materia/<int:materia_id>', methods=['DELETE'])
def delete_docente_materia(docente_id, materia_id):

    materia = Materias.query.get(materia_id)
    docente = Docente.query.get(docente_id)

    if not materia or not docente:
        return jsonify({"msg":"Materia o docente no encontrado"}),404
    
    relation = DocenteMaterias.query.filter_by(id_docente=docente.id, id_materia=materia.id).first()

    if not relation:
        return jsonify({"msg": "relation not found"}),404
    
    try:
        db.session.delete(relation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return jsonify({"msg": "Database Integrity Error"})

    return jsonify({"msg": "Relation Deleted"}),204
    