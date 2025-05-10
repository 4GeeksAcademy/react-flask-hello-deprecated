import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS  # Add CORS support
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity  # Add JWT support
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorites, Wallet, Alert
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_mail import Mail, Message






# Determine environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Initialize Flask app first
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable CORS for frontend-backend communication
CORS(app)



# Configure Flask-Mail (after app initialization)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # For Gmail. Replace with your provider's SMTP
app.config['MAIL_PORT'] = 587  # Use 465 for SSL, 587 for TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Set this in your .env or system variables
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Set this in your .env or system variables
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Default sender email address

# Initialize Flask-Mail
mail = Mail(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Replace with your own secret key
jwt = JWTManager(app)  # Initialize JWT manager

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin panel
setup_admin(app)

# Add custom commands
setup_commands(app)

# Register API routes with the "/api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response


# Create a route to authenticate your users and return JWT Token
@app.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print("Username:", username)  # Debugging
    print("Password:", password)  # Debugging

    user = User.query.filter_by(username=username).first()
    print("User found:", user)  # Debugging

    if user is None or user.password != password:  # Check user and password
        print("Invalid credentials")  # Debugging
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id })

# Protect a route with jwt_required
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id, "username": user.username}), 200

@app.route('/favorites/<coin_id>', methods=['POST'])
def add_fav(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    fav_crypto = Favorites(name=name, user_id=user_id, coin_id=coin_id)
    db.session.add(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))
 

@app.route('/favorites/<int:user_id>/<int:favorite_id>', methods=['DELETE'])
def delete_fav(favorite_id, user_id):
    fav_crypto = Favorites.query.get(favorite_id)
    db.session.delete(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))

def get_favs(id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return favorites

@app.route('/users/<int:id>/favorites', methods=['GET']) 
def get_favorites(id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return jsonify(favorites)




@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    email = data.get('email')  # Get the email from the frontend form submission
    message = data.get('message')

    if not email or not message:
        return jsonify({'success': False, 'message': 'Email and message are required'}), 400
    try:
        # Send the email from the user's email address
        msg = Message(
            subject="New Contact Us Message",
            recipients=[os.getenv('RECIPIENT_EMAIL')],  # The recipient's email address
            body=f"Message from {email}:\n\n{message}",
            sender=email  # The sender's email will be the user's email address
        )
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Email sent successfully!'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'success': False, 'message': 'Failed to send email.'}), 500



 
@app.route('/wallet/<coin_id>', methods=['POST'])
def buy_coin(coin_id):
    print(request.json)
    user_id = request.json['user_id']
    name = request.json['name']
    purchase_price= request.json['purchase_price']
    purchase_quantity = request.json['purchase_quantity']
    purchase_date = request.json['purchase_date']
    buy_crypto = Wallet(name=name, user_id=user_id, coin_id=coin_id, purchase_price=purchase_price, purchase_date=purchase_date, quantity_owned=purchase_quantity)
    db.session.add(buy_crypto)
    db.session.commit() 
    return jsonify(get_wallets(user_id))

@app.route('/wallet/<coin_id>', methods=['PATCH'])
def sell_some_coin(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    remaining_quantity = request.json['remaining_quantity']
    sold_crypto = Wallet.query.filter_by(coin_id = coin_id).first()
    sold_crypto.quantity_owned = remaining_quantity
    db.session.commit() 
    return jsonify(get_wallets(user_id))

@app.route('/wallet/<int:user_id>/<coin_id>', methods=['DELETE'])
def sell_coin(coin_id, user_id):
    sold_crypto = Wallet.query.filter_by(coin_id = coin_id).first()
    db.session.delete(sold_crypto)
    db.session.commit() 
    return jsonify(get_wallets(user_id))

# @app.route('/wallet/<int:user_id>/<int:wallet_id>', methods=['DELETE'])
# def delete_wallet(wallet_id, user_id):
#     wallet_crypto = Wallet.query.get(wallet_id)
#     db.session.delete(wallet_crypto)
#     db.session.commit()
#     return jsonify(get_wallets(user_id))

def get_wallets(id):
    wallet = Wallet.query.filter_by(user_id=id)
    wallet = list(map(lambda x: x.serialize(), wallet))
    #print("wallet-------"+wallet)
    return wallet

@app.route('/users/<int:id>/wallet', methods=['GET']) 
def get_wallet(id):
    wallet = Wallet.query.filter_by(user_id=id)
    wallet = list(map(lambda x: x.serialize(), wallet))
    return jsonify(wallet)


@app.route("/alerts", methods=["POST"])
def add_alert():
    data = request.get_json()
    user_id = data.get("user_id")
    coin_id = data.get("coin_id")
    coin_name = data.get("coin_name")
    target_price = data.get("target_price")
    above_below = data.get("above_below")

    if not user_id or not coin_id or coin_name is None or target_price is None:
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new alert object
    new_alert = Alert(
        user_id=user_id,
        coin_id=coin_id,
        coin_name=coin_name,
        target_price=target_price,
        above_below = above_below
    )

    # Add and commit to the database
    db.session.add(new_alert)
    db.session.commit()

    user_alerts = Alert.query.filter_by(user_id=user_id).all()
    user_alerts = list(map(lambda alert: alert.serialize(), user_alerts))

    return jsonify({
        "message": "Alert added successfully", 
        "alert": new_alert.serialize(),
        "alerts_array": user_alerts
        }), 201


@app.route("/alerts/<user_id>", methods=["GET"])
def get_alerts(user_id):
    user_alerts = Alert.query.filter_by(user_id=user_id).all()
    user_alerts = list(map(lambda alert: alert.serialize(), user_alerts))
    return jsonify(user_alerts), 200



@app.route("/alerts/<user_id>/<int:alert_id>", methods=["DELETE"])
def delete_alert(user_id, alert_id):
    removed_alert = Alert.query.get(alert_id)
    db.session.delete(removed_alert)
    db.session.commit()

    user_alerts = Alert.query.filter_by(user_id=user_id).all()
    user_alerts = list(map(lambda alert: alert.serialize(), user_alerts))

    return jsonify({"message": "Alert deleted successfully", "alerts_array": user_alerts}), 200

@app.route('/users/funds', methods=['PATCH'])
def add_funds():
    user_id = request.json['user_id']
    funds = request.json['funds']
    updateRow = User.query.filter_by(id=user_id).first()
    updateRow.funds = funds
    db.session.commit()
    return jsonify(get_funds(user_id))

def get_funds(id):
    user = User.query.filter_by(id=id).first()
    print ('-----------------',user)
    return user.funds

@app.route('/users/<int:id>/funds', methods=['GET'])
def get_funds1(id):
    user = User.query.filter_by(id=id).first()
    if user:
        print ('-----------------',user.funds)
        return jsonify(user.funds)
    else: 
        print ('-----------------',user)
        return jsonify("user does not exist")



# without jwt
@app.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    user = User.query.filter_by(id=user_id).first()
    return jsonify({"user": user.serialize()}), 200
    

# Update Profile Endpoint without jwt
@app.route("/profile/<user_id>", methods=["PUT"])
def update_profile(user_id):
    user = User.query.get(user_id)

    # if not user:
    #     return jsonify({"error": "User not found"}), 404

    # Parse request data
    data = request.get_json()

    # if not data:
    #     return jsonify({"error": "Invalid input"}), 400

    # Update fields if provided
    if "username" in data:
        # if User.query.filter_by(username=data["username"]).first(): 
            # return jsonify({"error": "Username already taken"}), 400
        user.username = data["username"]

    if "first_name" in data:
        user.first_name = data["first_name"]

    if "last_name" in data:
        user.last_name = data["last_name"]

    if "address" in data:
        user.address = data["address"]

    if "city" in data:
        user.city = data["city"]

    if "state" in data:
        user.state = data["state"]

    if "zip" in data:
        user.zip = data["zip"]

    db.session.commit()

    user = User.query.get(user_id)
    print("UserProfile", user)
    
    return jsonify(
        {"message": "Profile updated successfully", "profile": user.serialize()}
        ), 200


# # Update Profile Endpoint
# @app.route("/profile", methods=["PUT"])
# @jwt_required()
# def update_profile():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     # Parse request data
#     data = request.get_json()
#     if not data:
#         return jsonify({"error": "Invalid input"}), 400

#     # Update fields if provided
#     if "username" in data:
#         if User.query.filter_by(username=data["username"]).first():
#             return jsonify({"error": "Username already taken"}), 400
#         user.username = data["username"]

#     if "first_name" in data:
#         user.first_name = data["first_name"]

#     if "last_name" in data:
#         user.last_name = data["last_name"]

#     if "address" in data:
#         user.address = data["address"]

#     if "city" in data:
#         user.city = data["city"]

#     if "state" in data:
#         user.state = data["state"]

#     if "zip" in data:
#         user.zip = data["zip"]

#     # Commit updates to the database
#     try:
#         db.session.commit()
#         return jsonify({"message": "Profile updated successfully"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500




# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
