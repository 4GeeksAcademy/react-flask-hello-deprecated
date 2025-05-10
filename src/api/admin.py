  
import os
from flask_admin import Admin
from .models import db, User, Genre, ArtistProfile,Photo,Video,Song,SavedSong,FollowArtist
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Genre, db.session))
    admin.add_view(ModelView(Photo, db.session))
    admin.add_view(ModelView(Video, db.session))
    admin.add_view(ModelView(Song, db.session))
    admin.add_view(ModelView(SavedSong, db.session))
    admin.add_view(ModelView(FollowArtist, db.session))
    admin.add_view(ModelView(ArtistProfile, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))