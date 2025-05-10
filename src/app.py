import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands
from api import register_routes  # Importa la función que registra todas las rutas
from flask_jwt_extended import JWTManager

# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
app.url_map.strict_slashes = False

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
app.config['JWT_TOKEN_LOCATION'] = ['headers']  # El token se espera en los encabezados

jwt = JWTManager(app)

# Agregar administración
setup_admin(app)

# Agregar comandos
setup_commands(app)

# Registrar rutas utilizando la función register_routes
register_routes(app)

# Ruta genérica para errores 404
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Recurso no encontrado"}), 404

# Configuración para depuración SQL
app.config['SQLALCHEMY_ECHO'] = True

# Manejar errores como un objeto JSON
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar sitemap con todos los endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Manejo de archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    # Evitar que las rutas de la API sean manejadas como archivos estáticos
    if path.startswith("api/"):
        return jsonify({"error": "Ruta no encontrada"}), 404
    
    full_path = os.path.join(static_file_dir, path)
    if not os.path.isfile(full_path):
        return send_from_directory(static_file_dir, 'index.html')
    return send_from_directory(static_file_dir, path)

# Esto solo se ejecuta si $ python src/main.py es ejecutado
if __name__ == '__main__':
    with app.app_context():
        print(app.url_map)
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

# Validar que el identity sea string o número
@jwt.user_identity_loader
def user_identity_lookup(user_id):
    return str(user_id)