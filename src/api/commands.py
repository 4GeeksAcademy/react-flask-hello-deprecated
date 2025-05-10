
import click
from api.models import DocenteMaterias, Estudiante, Evaluacion, Grados, Materias, db, User, Role, EmailAuthorized, Docente
from api.utils import bcrypt
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import json
import random
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
test_data =  'src/api/services/test_data.json'   

make_hashpwd = lambda s: bcrypt.generate_password_hash(s).decode('utf-8')

def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        print("Creating test data")
        
        print("Roles:")
        try:
            if Role.query.count() == 0:
                admin_role = Role(nombre="Admin")
                teacher_role = Role(nombre="Docente")
                parent_role = Role(nombre="Representante")
                db.session.add_all([admin_role, teacher_role, parent_role])
                db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        db.session.flush()
        
            
        print("Creating admin User")
        try:
            if User.query.count() == 0:
                admin_data = {
                "email": "administrador@test.com",
                "nombre": "Director Miguel",
                "apellido": "Pérez",
                "password": make_hashpwd("adminpass"),
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
            
        except IntegrityError as e:
            db.session.rollback()
            print("Integrity Error")
            print(e.orig)
            return
        
        with open(test_data, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
        
        print("Adding Levels")
        
        try:
            level_objs = [Grados(nombre=level) for level in ["1","2","3","4"]]
            db.session.add_all(level_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        
        print("Adding teachers...")
        try:
            teacher_objs = [Docente(**teacher_info, role_id=teacher_role.id, password=make_hashpwd("12345")) for teacher_info in data["teachers"]]
            db.session.add_all(teacher_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        print("Adding Parents...")
        try:
            parent_objs = [User(**parent_info, password=make_hashpwd("12345"), role_id=parent_role.id) for parent_info in data["parents"]]
            db.session.add_all(parent_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
    
        db.session.flush()
        
        teachers_ids = [teacher.id for teacher in teacher_objs]
        parents_ids = [parent.id for parent in parent_objs]
        levels_ids = [level.id for level in level_objs]
        print("adding Students...")
        try:
            student_objs = [Estudiante(**student_info, representante_id=random.choice(parents_ids), grado_id=random.choice(levels_ids)) for student_info in data["students"]]
            db.session.add_all(student_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        print("Adding Signatures....")
        try:
            signature_objs = [Materias(nombre=name, descripcion="Materia agregada", grado_id=random.choice(levels_ids)) for name in ["Matematica", "Educacion Fisica", "Biologia", "Historia"]]
            db.session.add_all(signature_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        signatures_ids = [signature.id for signature in signature_objs]
        
        db.session.flush()
        
        print("Creating evaluations...")
        try:
            test_objs = [Evaluacion(**test_info, profesor_id=random.choice(teachers_ids), materia_id=random.choice(signatures_ids)) for test_info in data["evaluations"]]
            db.session.add_all(test_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return
        
        
        print("Creating Relations...")
        try:
            relation_objs = [DocenteMaterias(id_docente=test.profesor_id, id_materia=test.materia_id) for test in test_objs]
            db.session.add_all(relation_objs)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            print({"error": str(e)})
            return
        except Exception as e:
            print({"error": str(e)})
            return