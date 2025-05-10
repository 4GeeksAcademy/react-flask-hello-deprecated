from flask import Blueprint, request, jsonify
from .models import Evento, Usuario, db
from datetime import datetime

bp = Blueprint('eventos', __name__)

# Create an event
@bp.route('/eventos', methods=['POST'])
def create_evento():
    data = request.json
    usuario_id = data.get('usuario_id')
    titulo = data.get('titulo')
    descripcion = data.get('descripcion')
    fecha = data.get('fecha')
    clima = data.get('clima')
    
    try:
        # Parse the date
        fecha = datetime.fromisoformat(fecha)

        # Check if the user exists
        usuario = Usuario.query.get(usuario_id)
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
        # Create the new event
        evento = Evento(usuario_id=usuario_id, titulo=titulo, descripcion=descripcion, fecha=fecha, clima=clima)
        db.session.add(evento)
        db.session.commit()
        
        return jsonify({'message': 'Evento creado exitosamente', 'evento': evento.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Read all events
@bp.route('/eventos', methods=['GET'])
def get_eventos():
    eventos = Evento.query.all()
    result = []
    for evento in eventos:
        result.append({
            'id': evento.id,
            'usuario_id': evento.usuario_id,
            'titulo': evento.titulo,
            'descripcion': evento.descripcion,
            'fecha': evento.fecha.isoformat(),
            'clima': evento.clima
        })
    return jsonify(result), 200

# Read a specific event by ID
@bp.route('/eventos/<int:id>', methods=['GET'])
def get_evento(id):
    evento = Evento.query.get(id)
    if not evento:
        return jsonify({'error': 'Evento no encontrado'}), 404
    
    return jsonify({
        'id': evento.id,
        'usuario_id': evento.usuario_id,
        'titulo': evento.titulo,
        'descripcion': evento.descripcion,
        'fecha': evento.fecha.isoformat(),
        'clima': evento.clima
    }), 200

# Update an event
@bp.route('/eventos/<int:id>', methods=['PUT'])
def update_evento(id):
    evento = Evento.query.get(id)
    if not evento:
        return jsonify({'error': 'Evento no encontrado'}), 404

    data = request.json
    evento.titulo = data.get('titulo', evento.titulo)
    evento.descripcion = data.get('descripcion', evento.descripcion)
    evento.fecha = datetime.fromisoformat(data.get('fecha', evento.fecha.isoformat()))
    evento.clima = data.get('clima', evento.clima)

    db.session.commit()

    return jsonify({
        'message': 'Evento actualizado exitosamente',
        'evento': {
            'id': evento.id,
            'usuario_id': evento.usuario_id,
            'titulo': evento.titulo,
            'descripcion': evento.descripcion,
            'fecha': evento.fecha.isoformat(),
            'clima': evento.clima
        }
    }), 200

# Delete an event
@bp.route('/eventos/<int:id>', methods=['DELETE'])
def delete_evento(id):
    evento = Evento.query.get(id)
    if not evento:
        return jsonify({'error': 'Evento no encontrado'}), 404

    db.session.delete(evento)
    db.session.commit()

    return jsonify({'message': 'Evento eliminado exitosamente'}), 200
