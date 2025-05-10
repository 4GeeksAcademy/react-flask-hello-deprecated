  
import os
from flask_admin import Admin
from .models import db, Users, Hosts, Players, Tournaments, Matches, Participants, Match_participants, Teams
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Hosts, db.session))
    admin.add_view(ModelView(Players, db.session))
    admin.add_view(ModelView(Tournaments, db.session))
    admin.add_view(ModelView(Matches, db.session))
    admin.add_view(ModelView(Participants, db.session))
    admin.add_view(ModelView(Match_participants, db.session))
    admin.add_view(ModelView(Teams, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))