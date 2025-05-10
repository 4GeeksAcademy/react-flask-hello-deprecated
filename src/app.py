"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import timedelta
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from api.utils import APIException, generate_sitemap
from api.models import db, BlockedTokenList
from api.routes.routes import api
from api.routes.admin_routes import admin_routes
from api.routes.teacher_routes import teacher_routes
from api.routes.parent_routes import parent_routes
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
import cloudinary   
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == 1 else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

    
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)


app.config["JWT_SECRET_KEY"] = os.getenv("JWT_API_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)


cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD'),
    api_key= os.getenv('CLOUDINARY_KEY'),
    api_secret = os.getenv('CLOUDINARY_SECRET'),
    secure=True)
#Check revoked Token
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    is_pwd_type = jwt_payload["type"] == "password"  and request.path == '/api/resetpassword'

    if is_pwd_type:
        
        return True
    
    jti = jwt_payload["jti"]
    
    token = BlockedTokenList.query.filter_by(jti=jti).first()
    return token is not None

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(admin_routes, url_prefix='/api/admin')
app.register_blueprint(teacher_routes, url_prefix='/api/teacher')
app.register_blueprint(parent_routes, url_prefix='/api/parent')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
