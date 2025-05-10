from marshmallow_sqlalchemy import SQLAlchemySchema, SQLAlchemyAutoSchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from marshmallow import Schema, fields, validate
from ..models import Calificacion, db, User, Estudiante, Docente, EmailAuthorized, Materias, Evaluacion, Grados, DocenteMaterias, Role
from marshmallow import post_load, post_dump
from .schemas import StudentSchema, EvaluacionSchema






class StudentCalificacionSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Calificacion
        sqla_session = db.session
        dump_only = ('id',)
        exclude = ('estudiante_id',)
        include_fk = True
        ordered = True
        
        
    estudiante = Nested(StudentSchema, dump_only=True, exclude=['representante', 'is_active','fecha_ingreso','fecha_nacimiento', 'grado'])
    evaluacion = Nested(EvaluacionSchema, dump_only=True, exclude=['materia_id', 'profesor_id','descripcion'])
    nota = auto_field(validate=validate.Range(min_inclusive=0,))
    
    @post_dump
    def clean_data(self, data, **kwargs):
        if 'evaluacion' in data:
           info_grado = data['evaluacion']['materia'].pop("grado", None)
           data['evaluacion']['materia'] = info_grado["nombre"]
            
            
        return data