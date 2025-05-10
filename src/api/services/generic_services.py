import cloudinary.api
import cloudinary.uploader
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from api.models import db, Evaluacion, Role, User, EmailAuthorized
from marshmallow import ValidationError
from datetime import datetime, date as date_class
import requests
from api.commands import make_hashpwd
from os import getenv

def create_instance(model,body,schema):
    
    try:
        schema.load(body)
        instance = model(**body)
        db.session.add(instance)
        db.session.commit()
        return jsonify(schema.dump(instance)),201
    
    except ValidationError as e:
        db.session.rollback()
        return jsonify({"error":{"validation_error": e.messages}}),400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}),400
    except Exception as e:
        return jsonify({"error": str(e)}),400
    
    
def get_all_instances(model,schema):
    try:
        instances = model.query.all()
        
        if not instances:
            return jsonify({"error": f"{model.__name__} no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)})
    return jsonify(schema.dump(instances)),200

def get_instance_by_id(model, schema, instance_id):
    instance = model.query.get(instance_id)
    if instance:
        return jsonify(schema.dump(instance)), 200
    return jsonify({"error": f"{model.__name__} no encontrado"}), 404

def update_instance(model, id, data, schema):
    instance = model.query.get(id)
    
    if not instance:
        return jsonify({"error": f"{model.__name__} no encontrado"}),404
    try:
        schema.load(data, partial=True)
        
        for key, value in data.items():
            setattr(instance, key, value) 
        db.session.commit()
        return jsonify({"message": f"{model.__name__} actualizado con éxito", "data": data}), 200
    
    except ValidationError as e:
        db.session.rollback()
        return jsonify({"msg": e.messages}),400
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

def delete_instance(model,id):
    instance = model.query.get(id)
    
    if not instance:
        return jsonify({"error": f"{model.__name__} no encontrado"}), 404
    
    try:
        db.session.delete(instance)
        db.session.commit()
        return jsonify({"message": f"{model.__name__} eliminado con éxito"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": str(e)})
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)})
    
    


def get_feriadosAPI():
    API_URL ="https://api.argentinadatos.com/v1/feriados/2024"
    try:
        response = requests.get(API_URL)
        
        body = response.json()
        
        feriados = []
        
        for feriado in body:
            feriado_data = {
                "date": feriado["fecha"],
                "title": feriado["nombre"],
                "holiday": True
            }  
            feriados.append(feriado_data)
        
        
        return feriados
        
    except requests.exceptions.RequestException as e:
        return jsonify({"msg": "Exception getting feriados",
                        "error": str(e)}), 500
    
    
def get_schedule():
    
    try:
        evaluaciones = Evaluacion.query.all()
        
        fechas_evaluaciones = [{"date": format_date(evaluacion.fecha),
                "title": evaluacion.nombre,
                "holiday": False,
                "profesor": f"{evaluacion.profesor.nombre} {evaluacion.profesor.apellido}",
                "materia": evaluacion.materia.nombre,
                "grado": evaluacion.materia.grado.nombre} for evaluacion in evaluaciones]
                
        
        feriados = get_feriadosAPI()
        
        body = {"evaluaciones": fechas_evaluaciones,
                "feriados": feriados}
        
        
    except Exception as e:
        
        print("Error: " + str(e))
        return jsonify({"error": "Exception raised"})
    
    return body

def format_date(date):
    if isinstance(date, datetime):
        fecha_objeto = date
    elif isinstance(date, date_class):
        fecha_objeto = datetime.combine(date, datetime.min.time())
    elif isinstance(date, str):
        try:
            # Intentar parsear el formato ISO 8601 (YYYY-MM-DD)
            fecha_objeto = datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            # Si falla, intentar con el formato largo
            formato_entrada = "%a, %d %b %Y %H:%M:%S %Z"
            fecha_objeto = datetime.strptime(date, formato_entrada)
    else:
        print(type(date))  
        raise TypeError("El argumento debe ser una cadena, un objeto datetime o un objeto date.")

    formato_salida = "%Y-%m-%d"
    return fecha_objeto.strftime(formato_salida)


def create_role_and_admin():
    
    if Role.query.count() == 0:
        admin_role = Role(nombre="Admin")
        teacher_role = Role(nombre="Docente")
        parent_role = Role(nombre="Representante")
        db.session.add_all([admin_role, teacher_role, parent_role])
        db.session.commit()
        
    if User.query.count() == 0:
                admin_data = {
                "email": "administrador@test.com",
                "nombre": "Director Miguel",
                "apellido": "Pérez",
                "password": make_hashpwd(getenv('ADMIN_USER_PASSWORD','adminpass')),
                "is_active": True,
                "role_id": admin_role.id,
                "direccion":"Calle Falsa 123, Ciudad falsa tambien"
            }
                auth = EmailAuthorized()
                auth.email = "administrador@test.com"
                auth.role_id = admin_role.id
                auth.isRegistered = True
                admin_user = User(**admin_data)
                db.session.add(auth)
                db.session.add(admin_user)
                db.session.commit()       
    print("Roles y usuario administrador creados")