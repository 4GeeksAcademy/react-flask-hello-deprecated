from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

upload_routes = Blueprint('upload_routes', __name__)

# Configuración para la subida de archivos
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Asegurarse de que el directorio de subida existe
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Función para verificar la extensión del archivo
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ruta para subir imágenes
@upload_routes.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        # Retornar la URL de la imagen subida
        image_url = f"/{UPLOAD_FOLDER}/{filename}"
        return jsonify({"url": image_url}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400
