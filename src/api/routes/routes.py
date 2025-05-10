"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import requests
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from api.models import Docente, db, User, EmailAuthorized, BlockedTokenList, Role, Messages
from flask_cors import CORS
from api.utils import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from api.schemas.schemas import TeacherSchema, UserSchema, MessagesSchema
from api.services.external_services import send_recovery_email, get_image, upload_image
from api.services.generic_services import update_instance

app = Flask(__name__)


api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

# Definicion de esquemas para su uso

user_schema = UserSchema()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_register():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "No hay body"}),400
    
    try: 
        user = user_schema.load(body)

        email = body['email']

        authorized = EmailAuthorized.query.filter_by(email=email).first()
        user_exists = User.query.filter_by(email=email).first()

        if not authorized or authorized.isRegistered == True or user_exists:
            return jsonify({"msg": "Email no autorizado o ya registrado"}),400
        
        rol = Role.query.get(authorized.role_id)

        if not rol:
            return jsonify({"msg": "Rol no válido"})
        
        user["role_id"] = rol.id
        user["is_active"] = True
        hashed_password = bcrypt.generate_password_hash(user["password"]).decode('utf-8')
        user["password"] = hashed_password
        new_user = User(**user)

        authorized.isRegistered = True
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User registered successfully"}),201

    except ValidationError as err:
        return jsonify(err.messages),400


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()

    if not body or not body["email"] or not body["password"]:
        return jsonify({"msg": "Faltan credenciales"}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if not user:
        return jsonify({"msg": "User not found"}),404
    
    role = Role.query.get(user.role_id)
    
    valid_password = bcrypt.check_password_hash(user.password, body["password"])

    if not valid_password:
        return jsonify({"msg": "Invalid Credentials"}),400
    
    access_token = create_access_token(identity=str(user.id), additional_claims={"role":role.id})

    return jsonify({"token": access_token,
                    "role": role.nombre,
                    "user_id": user.id})


@api.route('/session/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    token = get_jwt()
    blocked_token = BlockedTokenList(jti=token['jti'])
    db.session.add(blocked_token)
    db.session.commit()

    return jsonify({"msg": "Logged Out"}),200


@api.route('/profile/picture', methods=['PUT'])
@jwt_required()
def handle_profile_pic():
    user = User.query.get(get_jwt_identity())
    body = request.files["profilePicture"]
    
    if not user:
        return jsonify({"msg": "User not found"}),404
    
    if not body:
        return jsonify({"msg": "Missing Field"}),400
    
    return upload_image(body, user.id)

@api.route('/profile/picture', methods=['GET'])
@jwt_required()
def get_profile_pic():
    user = User.query.get(get_jwt_identity())
    
    if not user:
        return jsonify({"msg": "User not found"}),404

    
    foto = get_image(user.foto) if user.foto else None
    
    return jsonify({"url": foto})

@api.route('/profile/update', methods=['PUT'])
@jwt_required()
def handle_profile_update():
    teacher_schema = TeacherSchema()
    body = request.get_json()
    
    if not body:
        return jsonify({"msg": "Body is required"}),400
    
    user = User.query.get(get_jwt_identity())
    
    if not user:
        return jsonify({"msg": "User not found"}),404
    
    try:
    
        if user.role.nombre.lower() == "docente":
            return update_instance(Docente, str(user.id),body, teacher_schema)
        
        return update_instance(User, str(user.id), body, user_schema)
    except Exception as e:
        print(str(e))
        return jsonify({"msg": "An error occurred updating the data"}),500
    
@api.route('/info/teachers', methods=['GET'])
def get_teachers_cards():
     teachers = Docente.query.all()
     
     if not teachers:
         return jsonify({"docentes": []}),404
     
     return jsonify( [{"fullName": f"{teacher.nombre} {teacher.apellido}",
                                   "descripcion": teacher.descripcion,
                                   "foto": get_image(teacher.foto) if teacher.foto else ""} for teacher in teachers]),200

@api.route('/password/recovery', methods=['POST'])
def handle_change_password_request():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Missing body"}),400
    email = body.get('email')
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"msg": "User not found"}),400
    
    pwdToken= create_access_token(identity=str(user.id), additional_claims={'type': 'password'})
    
    username = f"{user.nombre} {user.apellido}"
    
    return send_recovery_email(email, pwdToken, username)
    
@api.route('/password/reset', methods=['PUT'])
@jwt_required()
def handle_password_change():
    claims = get_jwt()
    token_type = claims["type"]
    body = request.get_json()
    user = User.query.get(get_jwt_identity())
    if not body:
        return jsonify({"msg": "Missing body"}),400
      
    if not user:
        return jsonify({"msg": "User not found"}),404
    
    newPassword = body.get("newPassword")
    
    if not newPassword:
        return jsonify({"msg":"Missing required field"}),400
    
    user.password = bcrypt.generate_password_hash(newPassword).decode('utf-8')
    
    if token_type == "password":
        token = BlockedTokenList(jti=claims["jti"])
        db.session.add(token)
    
    
    db.session.commit()
    return jsonify({"msg": "Password reset successfully"}),200



@api.route("/session/schedule", methods=['GET'])
@jwt_required()
def get_calendar_info():
    pass

@api.route("/session/check", methods=['GET'])
@jwt_required()
def check_token_expired():
    return jsonify({"msg":"Valid session"}),200


# Comunicacion
@api.route("/messages/contacts")
@jwt_required()
def get_user_contacts():
    user = User.query.get(get_jwt_identity())
    user_role = user.role
    if not user:
        return jsonify({"msg":"User not found"}),404
    
    print(user_role.nombre)
    
    try:
        if user_role.nombre.lower() == "representante":
            contactos = User.query.filter(User.role_id !=  user_role.id).all()
        else:
            contactos = User.query.filter(User.id != user.id).all()
        contactos_serializados = [
            {
                "nombre": f"{contacto.nombre} {contacto.apellido}",
                "user_id": contacto.id,
                "rol": contacto.role.nombre
            }
            for contacto in contactos
        ]
        
        return jsonify(contactos_serializados),200
    except Exception as e:
        print(str(e))
        return jsonify({"msg": "Something Happened"}),400


@api.route("/messages/send", methods=['POST'])
@jwt_required()
def send_message():
    schema = MessagesSchema()
    body = request.get_json()
    sender = User.query.get(get_jwt_identity())
    
    if not body:
        return jsonify({"msg": "Missing Body"}),400
    
    if not sender:
        return jsonify({"msg": "User not found"}),404
    
    body["sender_id"] = sender.id
    
    try:
        data = schema.load(body)
        message = Messages(**data)
        db.session.add(message)
        db.session.commit()
    except ValidationError as e:
        db.session.rollback()
        return jsonify(e.messages),400
    
    return jsonify({"msg": "Message sent successfully"})
    
    
@api.route("/messages/get", methods=['GET'])
@jwt_required()
def get_messages():
    schema = MessagesSchema()
    receiver_id = get_jwt_identity()
    
    user = User.query.get(receiver_id)
    
    if not user:
        return jsonify({"msg": "User not found"}),404
    
    messages = Messages.query.filter_by(receiver_id=receiver_id).all()
    
    messages_data = []
    
    for mensaje in messages:
        message_data = schema.dump(mensaje)
        
        message_data["remitente"] = f"{mensaje.sender.nombre} {mensaje.sender.apellido}"
        message_data["remitente_rol"] = mensaje.sender.role.nombre

        messages_data.append(message_data)
    
    
    return jsonify(messages_data)
    

@api.route("/messages/read", methods=['PUT'])
@jwt_required()
def read_messages():
    body = request.get_json()
    
    if not body:
        return jsonify({"msg": "Missing body"}),400
    
    message_id = body.get("message_id", None)
    
    if not message_id:
        return jsonify({"msg":"Id field not found"}),400
    mensaje = Messages.query.get(message_id)
    
    if not mensaje:
        return jsonify({"msg": "Message not found"}),404
    
    if  mensaje.read == False:
        mensaje.read = True
        db.session.commit()
        return jsonify({"msg": "Ok"}),200
    
    return jsonify({"msg":"Already Read"}),200

