from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Usuario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # No serializar la contraseña, es una brecha de seguridad
        }

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    titulo = db.Column(db.String(200), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha = db.Column(db.DateTime, nullable=False)
    clima = db.Column(db.String(50), nullable=False)
    usuario = db.relationship('Usuario', backref='eventos')

    def serialize(self):
        # Convert the 'fecha' datetime object to ISO format for JSON compatibility
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'fecha': self.fecha.isoformat(),  # Convert datetime to ISO format string
            'clima': self.clima,
            # Assuming 'Usuario' model has its own 'serialize' method
            'usuario': self.usuario.serialize() if self.usuario else None
        }