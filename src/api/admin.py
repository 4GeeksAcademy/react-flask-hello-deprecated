  
import os
from flask_admin import Admin
from .models import Docente, db, User, Materias, DocenteMaterias, Estudiante, EmailAuthorized, Evaluacion, Calificacion, Role, Grados
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(EmailAuthorized, db.session))
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Docente, db.session))
    admin.add_view(ModelView(Estudiante, db.session))
    admin.add_view(ModelView(Materias, db.session))
    admin.add_view(ModelView(Evaluacion, db.session))
    admin.add_view(ModelView(Calificacion, db.session))
    admin.add_view(ModelView(DocenteMaterias, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Grados, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))