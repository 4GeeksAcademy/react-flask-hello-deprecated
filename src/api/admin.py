  
import os
from flask_admin import Admin
from .models import db, Users, Groups, Roles, Finances, Categories, Types, Group_Finances
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class adminView(ModelView):
        colum_display_pk = True

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(adminView(Users, db.session))
    admin.add_view(adminView(Groups, db.session))
    admin.add_view(adminView(Roles, db.session))
    admin.add_view(adminView(Finances, db.session))
    admin.add_view(adminView(Categories, db.session))
    admin.add_view(adminView(Types, db.session))
    admin.add_view(adminView(Group_Finances, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))