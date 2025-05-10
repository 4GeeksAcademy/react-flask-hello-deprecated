import requests
import os
from flask import jsonify
from api.models import db, User
from tempfile import NamedTemporaryFile
import cloudinary


def send_recovery_email(email, token, fullname):
    API_URL = os.getenv('API_URL')
    FRONT_URL = os.getenv('FRONTEND_URL')
    KEY = os.getenv('PRIVATE_KEY')
    data = {
    "service_id": os.getenv('SERVICE_ID'),
    "template_id": os.getenv('TEMPLATE_ID'),
    "user_id": os.getenv('USER_ID'),
        'accessToken' : KEY,
    "template_params": {
        'user_name': fullname,
        'user_email': email,
        'url': FRONT_URL+f"password/reset/?token={token}"
        
    }
    }
    
    headers = {"Content-Type": 'application/json'}

    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error al comunicarse con el serividor: {str(e)}"}),500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}),500
    
    if response.status_code == 200:
        return jsonify({"msg": "Correo de recuperacion enviado."}),200
    else:
        return jsonify({"msg": f"No se ha podido enviar la recuperacion al correo, {response.text}"}),400
    
    
    
def allowed_file(filename):
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def upload_image(file, id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"msg": "User not found"}),404
    
    if (not allowed_file(file.filename)):
        return jsonify({"msg": "Formato de archivo no admitido"}),400
    
    try:
    
        extension = file.filename.split(".")[1]
        temp=NamedTemporaryFile(delete=False)
        file.save(temp.name)
        
        filename ='UsersSchoolhub/' + str(user.id)
        upload_result = cloudinary.uploader.upload(temp.name, public_id=filename, asset_folder='SchoolHub')
        
        asset_id = upload_result['public_id']
        user.foto = asset_id
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({"msg": "error uploading image"}),400
    
    return jsonify({"msg": "Foto Actualizada correctamente"}),200



def get_image(public_id):
    if not public_id:
        return None
    try:
        image_info = cloudinary.api.resource(public_id)
        image_url = image_info["secure_url"]
    except Exception as e:
        print(str(e))
        return None
    
    return image_url
