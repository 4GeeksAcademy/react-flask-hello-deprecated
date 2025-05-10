from flask import Flask, jsonify
from flask_cors import CORS
from .auth_routes import auth_routes
from .user_routes import user_routes
from .product_routes import product_routes
from .category_routes import category_routes

def create_app():
    app = Flask(__name__)

    # Configurar CORS globalmente para todas las rutas bajo /api/*
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar blueprints
    register_routes(app)

    # Manejo global de excepciones
    @app.errorhandler(Exception)
    def handle_exception(e):
        return jsonify({"error": str(e)}), 500

    return app

def register_routes(app: Flask):
    # Registrar rutas con prefijos consistentes
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(user_routes, url_prefix='/api/user')
    app.register_blueprint(product_routes, url_prefix='/api/products')
    app.register_blueprint(category_routes, url_prefix='/api/categories')
