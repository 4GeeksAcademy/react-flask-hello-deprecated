from marshmallow_sqlalchemy import SQLAlchemySchema, SQLAlchemyAutoSchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from marshmallow import Schema, fields, validate
from ..models import Calificacion, db, User, Estudiante, Docente, EmailAuthorized, Materias, Evaluacion, Grados, DocenteMaterias, Role, Messages
from marshmallow import post_load

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

    password = auto_field(load_only=True)
    role_id = auto_field(dump_only=True)
    is_active = auto_field(dump_only=True)
    id = auto_field(dump_only=True)

    @post_load
    def filter_fields(self, data, **kwargs):
        # Eliminar campos extra que no pertenecen a User
        data.pop("foto", None)
        data.pop("descripcion", None)
        return data

class TeacherSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Docente
        sqla_session = db.session
        include_fk= True

        
    password = auto_field(load_only=True)
    id = auto_field(dump_only=True)
    role_id = auto_field(load_only=True)

class StudentSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = Estudiante
        sqla_session = db.session
        
    id = auto_field(dump_only=True)
    nombre = auto_field()
    apellido = auto_field()
    fecha_nacimiento = fields.Date(input_formats=['%Y-%m-%d'], format='%Y-%m-%d')
    representante_id = auto_field(load_only=True)
    fecha_ingreso = fields.Date(input_formats=['%Y-%m-%d'], format='%Y-%m-%d')
    is_active= auto_field(missing=True)
    grado_id = auto_field(required=True)
    
    
    representante = Nested(UserSchema, dump_only=True, exclude=['role_id','id', 'is_active'])
    grado = Nested('GradoSchema', dump_only=True)
class AuthorizedEmailSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = EmailAuthorized
        sqla_session = db.session
        dump_only = ('id','isRegistered')
        include_fk = True
        
class GradoSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Grados
        sqla_session = db.session
        dump_only = ('id',)

class MateriasSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Materias
        sqla_session = db.session
        dump_only = ('id',)

    grado_id = auto_field(required=True, load_only=True)
    grado = Nested(GradoSchema, dump_only=True)
        
class EvaluacionSchema(SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = Evaluacion
        sqla_session = db.session
        dump_only = ('id',)
        load_only =('profesor_id','materia_id')

    materia = Nested(MateriasSchema, dump_only=True, exclude=['descripcion'])
    docente = Nested(TeacherSchema, dump_only=True)
    finalizada= auto_field(required=False, missing=False)

class DocenteMateriaSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = DocenteMaterias
        sqla_session = db.session
        dump_only = ('id',)
        exclude = ('id',)
        
    id_docente = auto_field(required=True, load_only=True)
    id_materia = auto_field(required=True, load_only=True)
    
    docente = Nested(TeacherSchema, dump_only=True, exclude=['role_id'])
    materia = Nested(MateriasSchema, dump_only=True)

class GradoSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Grados
        sqla_session = db.session
        dump_only = ('id',)
        
class RoleSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Role
        sqla_session = db.session
        dump_only = ('id',)

class CalificacionSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Calificacion
        sqla_session = db.session
        dump_only = ('id',)
        include_fk = True
        
    estudiante = Nested(StudentSchema, dump_only=True, exclude=['representante', 'is_active','fecha_ingreso','fecha_nacimiento', 'grado'])
    evaluacion = Nested(EvaluacionSchema, dump_only=True, exclude=['materia_id', 'profesor_id','descripcion'])
    nota = auto_field(validate=validate.Range(min_inclusive=0,))
    
class EstudianteNotaRequestSchema(Schema):
    estudiante_id = fields.Integer(required=True, strict=True)
    nota = fields.Float(required=True, validate=validate.Range(min=0, max=10))  
    
class CalificacionRequestSchema(Schema):
    evaluacion_id = fields.Integer(required=True, strict=True)
    materia_id = fields.Integer(required=True, strict=True)
    estudiantes_notas = fields.List(Nested(EstudianteNotaRequestSchema), required=True, strict=True)
    
    
class MessagesSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Messages
        sqla_session = db.session
        load_only = ('receiver_id','sender_id')
        include_fk = True
    