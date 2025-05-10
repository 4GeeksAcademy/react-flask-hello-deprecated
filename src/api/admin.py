import os
from flask_admin import Admin
from .models import db, User, Product, Order, OrderItem, Notification, Category, Cart
from flask_admin.contrib.sqla import ModelView

# Clase personalizada para Product para incluir el campo "categories"
class ProductAdmin(ModelView):
    form_columns = [
        'name', 'description', 'price', 'featured', 'stock', 'imagen_url', 'categories'
    ]
    column_list = ['name', 'price', 'featured', 'stock', 'categories']

    # Configuración del campo "categories" para la relación muchos a muchos
    form_args = {
        'categories': {
            'query_factory': lambda: Category.query.all(),
            'allow_blank': True,  # Permitir que el campo quede vacío si es necesario
        }
    }

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Añadir modelos a la interfaz administrativa
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ProductAdmin(Product, db.session))  # Usa la clase personalizada ProductAdmin
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(OrderItem, db.session))
    admin.add_view(ModelView(Notification, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Cart, db.session))




    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))