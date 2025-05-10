"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint

from api.models import User, Role
from flask_cors import CORS
from flask_jwt_extended import get_jwt, verify_jwt_in_request, get_jwt_identity
from api.services.parent_services import get_students_info
from api.services.generic_services import  get_schedule
from api.services.external_services import get_image
from api.schemas.schemas import UserSchema

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

parent_routes = Blueprint('parent_routes', __name__)
# Allow CORS requests to this API
CORS(parent_routes)

@parent_routes.before_request
def get_role():
    if request.method == 'OPTIONS':
        return ' ',203
    
    verify_jwt_in_request()
    claims = get_jwt()
    role = Role.query.get(claims["role"])

    if not role:
        return jsonify({"msg": "Role Not found"}),400
    
    if role.nombre.lower() != "representante":
        return jsonify({"msg":"Access Denied"}),403
    


@parent_routes.route('/info', methods=['GET'])
def get_parent_info():
    user_schema = UserSchema(exclude=['role_id','id','is_active'])
    parent_id = get_jwt_identity()
    parent = User.query.get(parent_id)
    
    if not parent:
        return jsonify({"msg": "Representante no encontrado"}),404
    parent_data = user_schema.dump(parent)
    parent_data['estudiantes'] = get_students_info(parent_id)
    parent_data["calendario"] = get_schedule()
    parent_data["foto"] = get_image(parent_data["foto"]) if parent_data["foto"] else None
    
    
    return jsonify(parent_data),200