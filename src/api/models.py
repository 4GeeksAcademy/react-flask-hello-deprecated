from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

# Clase User
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)  
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)  
    is_admin = db.Column(db.Boolean(), nullable=False, default=False)  
    address = db.Column(db.String(250), nullable=True) 
    phone = db.Column(db.String(20), nullable=True)  
    is_deleted = db.Column(db.Boolean, default=False)
    cart_items = db.relationship('Cart', backref='user', lazy=True, cascade="all, delete-orphan")
    orders = db.relationship('Order', backref='user', lazy=True, cascade="all, delete-orphan")
    notifications = db.relationship('Notification', backref='user', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active,
            "is_admin": self.is_admin,  
            "address": self.address,
            "phone": self.phone,
            "orders": [order.serialize() for order in self.orders],
            "notifications": [notification.serialize() for notification in self.notifications]
        }

# Clase intermedia Product-Category
product_category = db.Table(
    'product_category',
    db.Column('product_id', db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('category.id', ondelete='CASCADE'), primary_key=True)
)

# Clase Category
class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    # Relación con Product (muchos a muchos)
    products = db.relationship('Product', secondary=product_category, back_populates='categories')

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
        }

# Clase Product
class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    featured = db.Column(db.Boolean, default=False, index=True)
    stock = db.Column(db.Integer, nullable=False)
    imagen_url = db.Column(db.String(250), nullable=True)

    # Relación con OrderItem (uno a muchos)
    order_items = db.relationship('OrderItem', backref='product', lazy=True, cascade="all, delete-orphan")
    
    # Relación con Category (muchos a muchos)
    categories = db.relationship('Category', secondary=product_category, back_populates='products')

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "featured": self.featured,
            "stock": self.stock,
            "categories": [category.serialize() for category in self.categories],
            "imagen_url": self.imagen_url,
        }

# Clase Cart
class Cart(db.Model):
    __tablename__ = 'cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=True, onupdate=db.func.current_timestamp())

    def __repr__(self):
        return f'<Cart user_id={self.user_id} product_id={self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

# Clase Order
class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": self.total_amount,
            "status": self.status,
            "created_at": self.created_at,
            "order_items": [item.serialize() for item in self.order_items]
        }

# Clase OrderItem
class OrderItem(db.Model):
    __tablename__ = 'order_item'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id', ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<OrderItem {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price": self.price,
        }

# Clase Notification
class Notification(db.Model):
    __tablename__ = 'notification'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    message = db.Column(db.String(250), nullable=False)
    is_read = db.Column(db.Boolean(), nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Notification {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "message": self.message,
            "is_read": self.is_read,
            "created_at": self.created_at,
        }

class OrderStatus(Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
