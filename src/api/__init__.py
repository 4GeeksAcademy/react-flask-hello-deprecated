from flask import Flask, jsonify
from .auth_routes import auth_routes
from .user_routes import user_routes_v2
from .product_routes import product_routes  # Importa las rutas de productos
from .category_routes import category_routes
from .routes import api   
from .cart_routes import cart_routes

"""
Este módulo inicializa y registra las rutas del API en la aplicación Flask.
"""

def register_routes(app: Flask):
    # Rutas de autenticación
    app.register_blueprint(auth_routes, url_prefix='/auth')
    
    # Rutas de usuario
    app.register_blueprint(user_routes_v2, url_prefix='/api/user')
    
    # Rutas de productos
    app.register_blueprint(product_routes, url_prefix='/api/products')
    
    # Ruta Categoria
    app.register_blueprint(category_routes, url_prefix='/api/categories')

    # Rutas generales
    app.register_blueprint(api, url_prefix='/api')

    # Rutas de carrito
    app.register_blueprint(cart_routes, url_prefix='/api')  # Asegúrate de que esta ruta esté correctamente registrada
    
    # Manejo de errores global
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Ruta no encontrada"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Error interno del servidor"}), 500
