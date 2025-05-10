from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id_user = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    id_group = db.Column(db.Integer, db.ForeignKey('groups.id_group', ondelete='SET NULL'), nullable=True)
    id_rol = db.Column(db.Integer, db.ForeignKey('roles.id_rol'), nullable=False)

    # Relaciones bidireccionales
    """ group = db.relationship('Groups', backref='users')
    role = db.relationship('Roles', backref='users')
    finance = db.relationship('Finances', backref='users') """

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id_user,
            "name": self.name,
            "email": self.email,
            "id_group": self.id_group,
            "id_rol": self.id_rol
            }

class Groups(db.Model):
    id_group = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=True)

    # Relaciones bidireccionales
    user = db.relationship('Users', backref='groups', passive_deletes=True)
    group_finances = db.relationship('Group_Finances', backref='group', lazy=True)

    def __repr__(self):
        return f'<Group {self.name}>'

    def serialize(self):
        return {
            "id": self.id_group,
            "name": self.name,
            "description": self.description
        }
  
class Roles(db.Model):
    id_rol = db.Column(db.Integer, primary_key=True)
    rol = db.Column(db.String(80), unique=True, nullable=False)

    # Relaciones bidireccionales
    user = db.relationship('Users', backref='roles')

    def __repr__(self):
        return f'<Role {self.rol}>'

    def serialize(self):
        return {
            "id": self.id_rol,
            "rol": self.rol
            }
    
class Finances(db.Model):
    id_finance = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user'), nullable=False)
    id_type = db.Column(db.Integer, db.ForeignKey('types.id_type'), nullable=True)

    # Relaciones bidireccionales
    user = db.relationship('Users', backref='finances')
    category = db.relationship('Categories', backref='finances_category')
    type = db.relationship('Types', backref='finances_type')

    def __repr__(self):
        return f'<Finance {self.name}>'

    def serialize(self):
        return {
            "id": self.id_finance,
            "name": self.name,
            "amount": self.amount,
            "date": self.date,
            "description": self.description,
            "id_category": self.id_category,
            "id_user": self.id_user,
            "id_type": self.id_type
            }

class Categories(db.Model):
    id_category = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(80), unique=True, nullable=False)

    # Relaciones bidireccionales
    finances = db.relationship('Finances', backref='categories')

    def __repr__(self):
        return f'<Category {self.category}>'

    def serialize(self):
        return {
            "id": self.id_category,
            "category": self.category
            }
    
class Types(db.Model):
    id_type = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(80), unique=True, nullable=False)

    # Relaciones bidireccionales
    finances = db.relationship('Finances', backref='types')

    def __repr__(self):
        return f'<Type {self.type}>'

    def serialize(self):
        return {
            "id": self.id_type,
            "type": self.type
            }
    
class Group_Finances(db.Model):
    id_group_finance = db.Column(db.Integer, primary_key=True)
    id_group = db.Column(db.Integer, db.ForeignKey('groups.id_group', ondelete = 'CASCADE'), nullable=True)
    id_finance = db.Column(db.Integer, db.ForeignKey('finances.id_finance', ondelete = 'CASCADE'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user', ondelete = 'CASCADE'), nullable=False)
    date = db.Column(db.Date, nullable=False)

    # Relaciones bidireccionales
    finance = db.relationship('Finances', backref='group_finances_finance')
    user = db.relationship('Users', backref='group_finances_user')

    def __repr__(self):
        return f'<Group_Finance {self.id_group} - {self.id_finance} from {self.id_user}>'

    def serialize(self):
        return {
            "id": self.id_group_finance,
            "id_group": self.id_group,
            "id_finance": self.id_finance,
            "id_user": self.id_user,
            "date": self.date
        }
