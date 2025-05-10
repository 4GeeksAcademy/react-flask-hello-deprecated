from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    funds = db.Column(db.Numeric(10,3), default=0)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)  
    address = db.Column(db.String(200), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    zip = db.Column(db.String(10), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "funds": self.funds,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "address":self.address,
            "city":self.city,
            "state":self.state,
            "zip":self.zip,
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coin_id = db.Column(db.String(30))
    name = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    symbol = db.Column(db.String(20))
    user = db.relationship(User)

    def __repr__(self):
        return f'<Favorites {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "coin_id": self.coin_id,
            "name": self.name,
            "user_id": self.user_id,
            "symbol": self.symbol
        }


class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80))
    coin_id = db.Column(db.String(120))
    symbol = db.Column(db.String(20))
    purchase_price = db.Column(db.Numeric(10,3))
    quantity_owned = db.Column(db.Numeric(10,3))
    purchase_date = db.Column(db.BigInteger)
    user = db.relationship(User)

    def __repr__(self):
        return f'<Wallet {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "coin_id": self.coin_id,
            "symbol": self.symbol,
            "purchase_price": self.purchase_price,
            "quantity_owned": self.quantity_owned,
            "purchase_date": self.purchase_date,
        }
    
class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for the alert
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Link to the user
    coin_id = db.Column(db.String(50), nullable=False)  # ID of the coin
    coin_name = db.Column(db.String(100), nullable=False)  # Name of the coin
    above_below = db.Column(db.String(100), nullable=False)  # above the target or below the target
    target_price = db.Column(db.Float, nullable=False)  # Target price for the alert
    # created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())  # Timestamp for creation
    user = db.relationship(User)
    
    def __repr__(self):
            return f'<Alert {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "coin_id": self.coin_id,
            "coin_name": self.coin_name,
            "target_price": self.target_price,
            "above_below": self.above_below
        }
    

    