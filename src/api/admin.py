  
import os
from flask_admin import Admin
from .models import db, User, Notes, Habits, Goals, Projects
from flask_admin.contrib.sqla import ModelView

class NotesView(ModelView):
    column_list = ('title', 'description','category', 'user_id', 'projects_id')
    form_columns = ('title', 'description','category', 'user_id', 'projects_id')

class HabitsView(ModelView):
    column_list = ('name', 'description', 'category', 'user_id', 'goals_id')
    form_columns = ('name', 'description', 'category', 'user_id', 'goals_id')

class GoalsView(ModelView):
    column_list = ('target', 'description', 'user_id', 'projects_id')
    form_columns = ('target', 'description', 'user_id', 'projects_id')

class ProjectsView(ModelView):
    column_list = ('name', 'description', 'category', 'user_id')
    form_columns = ('name', 'description', 'category', 'user_id')


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(NotesView(Notes, db.session))
    admin.add_view(HabitsView(Habits, db.session))
    admin.add_view(GoalsView(Goals, db.session))
    admin.add_view(ProjectsView(Projects, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))