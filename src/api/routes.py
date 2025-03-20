"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Hosts, Players, Tournaments, Matches, Participants, Match_participants, Teams
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary
import cloudinary.uploader
import random

api = Blueprint('api', __name__)
jwt = JWTManager()
# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



# _________________________________________USER_________________________________________

@api.route('/signup', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    player = request.json.get ('player', None)
   

    if not email or not password:
        return jsonify({'msg': 'Todos los campos son necesarios'}), 400


    exist = Users.query.filter_by(email=email).first()
    if exist: 
        return jsonify({'success': False, 'msg': 'El correo electronico ya existe'}), 400
    
    hashed_password = generate_password_hash(password)
    print(hashed_password)
    new_user = Users(email=email, password=hashed_password, player=player)

    if player: 
        new_player = Players()
        db.session.add(new_player)
        db.session.flush()
        new_user.player_id = new_player.id
        db.session.add(new_user)
        db.session.commit()
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'user_info': new_user.serialize(), 'player_info': new_player.serialize(), 'token': token}), 200

    if not player: 
        new_host = Hosts()
        db.session.add(new_host)
        db.session.flush()
        new_user.host_id = new_host.id
        db.session.add(new_user)
        db.session.commit()
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'user_info': new_user.serialize(), 'host_info': new_host.serialize(), 'token': token}), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    player_info = ""
    host_info = ""
    if not email or not password:
        return jsonify({'msg': 'Email y contraseña son obligatorios'}), 400
    
    user = Users.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    if not check_password_hash (user.password, password):
        return jsonify ({'msg': 'email/contraseña incorrectos'}), 404

    if user.player_id:
        player_info = Players.query.get(user.player_id)
    
    if user.host_id:
        host_info = Hosts.query.get(user.host_id)
    
    token = create_access_token(identity=str(user.id))
    return jsonify({'user_info': user.serialize(), 'player_info': player_info.serialize() if  player_info else None, 'host_info': host_info.serialize() if  host_info else None, 'token': token}), 200


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    identity = get_jwt_identity()
    users = Users.query.get(identity)   
    if users: 
        print(users.serialize()) 
        return jsonify({'success': True, 'msg': 'OK', 'user': users.serialize()})
    return jsonify({'success': False, 'msg': 'Token erroneo'})


# _________________________________________LOGOUT_________________________________________

blacklisted_tokens = set()

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Obtén el token del usuario actual
    jti = get_jwt()['jti']  # jti es el identificador único del token
    # Añade el token a la lista negra
    blacklisted_tokens.add(jti)
    # Devuelve un mensaje de éxito
    return jsonify({'msg': 'Sesión cerrada exitosamente'}), 200

# Verifica si un token está en la lista negra
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in blacklisted_tokens


# _________________________________________PLAYER_________________________________________

@api.route('/editPlayers', methods=['PUT'])
@jwt_required()
def editPlayer():
    id = get_jwt_identity()
    name = request.json.get('name', None)
    gender = request.json.get('gender', None)
    age = request.json.get('age', None)
    rating = request.json.get('rating', None)
    side = request.json.get('side', None)
    hand = request.json.get('hand', None)
    phone = request.json.get('phone', None)
    image = request.json.get('image', None)


    if not name or not gender or not age or not rating or not side or not hand:
        return jsonify({'msg': 'Todos los campos son necesarios'}), 400

    # Conecta player con user y Buscar al jugador por ID
    player = Players.query.join(Users, Users.player_id == Players.id).filter(Users.id == id).first()

    if not player:
        return jsonify({'msg': 'El jugador no existe'}), 404
    
    if name:
        player.name = name
    if gender:
        player.gender = gender
    if age:
        player.age = age
    if rating:
        player.rating = rating
    if side:
        player.side = side
    if hand:
        player.hand = hand
    if phone:
        player.phone = phone
    if image:
        player.image = image
    
    db.session.commit()
    return jsonify({'msg': 'Jugador actualizado con éxito', 'player': player.serialize()}), 200


@api.route('/getPlayers', methods=['GET'])
def get_players():
    try:
        # Consultar todos los jugadores de la base de datos
        players = Players.query.all()
        
        # Verificar si hay jugadores en la base de datos
        if not players:
            return jsonify({'msg': 'No hay jugadores registrados'}), 404
        
        # Serializar y retornar la lista de jugadores
        return jsonify({'players': [player.serialize() for player in players]}), 200
    except Exception as e:
        # Manejo de errores
        return jsonify({'msg': 'Error al obtener los jugadores', 'error': str(e)}), 500
    

@api.route('/getPlayers/', methods=['GET'])
def get_player():

    player = Players.query.get()
    if not player:    
        return jsonify({'msg': 'Player no encontrado'}), 404
    return jsonify({'player': player.serialize()}), 200     # Devuelve la información serializada del host



# _________________________________________HOST_________________________________________

@api.route('/getHost', methods=['GET'])    # Mostrar lista de perfiles de todos los hosts
def get_hosts():
    try:
        hosts = Hosts.query.all()

        if not hosts:
            return jsonify({'msg': 'Hosts no encontrados'}), 404

        return jsonify({'hosts': [host.serialize() for host in hosts]}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener los hosts', 'error': str(e)}), 500


@api.route('/getHost/<int:id>', methods=['GET'])   # Mostrar el perfil del host seleccionado
def get_host(id):
    try:
        host = Hosts.query.get(id)   
        if not host:
            return jsonify({'msg': 'Host no encontrado'}), 404 
        
        return jsonify({'host': host.serialize()}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener los hosts', 'error': str(e)}), 500


@api.route('/editHost', methods=['PUT'])    #Editar el perfil del host seleccionado
@jwt_required()
def edit_host():
    try:
        id = get_jwt_identity()
        name = request.json.get('name', None)
        address = request.json.get('address', None)
        court_type = request.json.get('court_type', None)
        phone = request.json.get('phone', None)
        image = request.json.get('image', None)

        host = Hosts.query.join(Users, Users.host_id == Hosts.id).filter(Users.id == id).first()
        
        if not host:
            return jsonify({'msg': 'Host no encontrado'}), 404
        
        if name:
            host.name = name
        if address:
            host.address = address
        if court_type:
            host.court_type = court_type
        if phone:
            host.phone = phone
        if image:
            host.image = image

        db.session.commit()

        return jsonify({'msg': 'Host actualizado con éxito', 'host': host.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


# //_________________________________________CHECK TIPO USUARIO_________________________________________

@api.route('/check', methods=['GET'])
@jwt_required()
def checkUser():
    id = get_jwt_identity()

    user = Users.query.get(id)

    if  not user:
            return jsonify({'msg': 'Usuario no encontrado.'}), 404
    
    return jsonify({'player': user.player }), 200
    
    

# //_________________________________________TOURNAMENT_________________________________________

@api.route('/tournaments', methods=['POST'])
@jwt_required()
def create_tournament():
    try:
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)

        if user.player:
            return jsonify({'msg': 'Los Players no están autorizados para crear torneos.'}), 403

        name = request.json.get('name')  # Usar request.json para obtener el JSON
        type = request.json.get('type')
        inscription_fee = request.json.get('inscription_fee')
        rating = request.json.get('rating')
        schedule = request.json.get('schedule')
        award = request.json.get('award')
        participants_amount = request.json.get('participants_amount')
        image = request.json.get('image')  # Aquí es donde recibes la URL de la imagen


        new_tournament = Tournaments(
            name=name,
            type=type,
            inscription_fee=inscription_fee,
            rating=rating,
            schedule=schedule,
            award=award,
            image=image,
            participants_amount=participants_amount,
            host_id=user.host_id
        )

        db.session.add(new_tournament)
        db.session.commit()

        return jsonify({'msg': 'Torneo creado con éxito', 'tournament': new_tournament.serialize()}), 201

    except Exception as e:
        return jsonify({"msg": "Error al crear el torneo", "error": str(e)}), 500


@api.route('/tournaments', methods=['GET'])    # Mostrar lista torneos
def all_tournaments():
    try:
        all_tournaments = Tournaments.query.all()

        if not all_tournaments:
            return jsonify({'msg': 'Torneos no encontrados'}), 404
        
        serialized_tournaments = [tournament.serialize() for tournament in all_tournaments]

        return jsonify({'tournaments': serialized_tournaments}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener los torneos', 'error': str(e)}), 500
    

@api.route('/tournaments/<int:id>', methods=['GET'])    # Mostrar un torneo

def one_tournament(id):
    try:
        tournament = Tournaments.query.get(id)   
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404 
        
        return jsonify({'torneo': tournament.serialize()}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener el torneo', 'error': str(e)}), 500


@api.route('/tournaments/<int:id>', methods=['PUT'])    #Editar el torneo seleccionado
def edit_tournament(id):
    try:
        data = request.json

        tournament = Tournaments.query.get(id)
        
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404
 
        tournament.name = data.get('name', tournament.name)
        tournament.type = data.get('type', tournament.type)
        tournament.inscription_fee = data.get('inscription_fee', tournament.inscription_fee)
        tournament.rating = data.get('rating', tournament.rating)
        tournament.schedule = data.get('schedule', tournament.schedule)
        tournament.award = data.get('award', tournament.award)
        tournament.tournament_winner = data.get('tournament_winner', tournament.tournament_winner)
        tournament.image = data.get('image', tournament.image)

        db.session.commit()

        return jsonify({'msg': 'Torneo actualizado con éxito', 'torneo': tournament.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/tournaments/<int:id>', methods=['DELETE'])
def delete_tournament(id):

    data = Tournaments.query.get(id)

    db.session.delete(data)
    db.session.commit()

    return jsonify({"msg": "Torneo eliminado con id " + str(id)}), 200



# //_________________________________________PARTICIPANTS_________________________________________

@api.route('/tournaments/<int:tournament_id>/participate', methods=['POST'])        #POST todos los participantes de un torneo
@jwt_required()
def participate_in_tournament(tournament_id):
    try:
        # Obtener el ID del jugador autenticado
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)

        if not user or not user.player:
            return jsonify({'msg': 'Solo los Players registrados pueden participar en torneos'}), 403

        # Verificamos si el Player existe
        player_id = user.player_id
        if not player_id:
            return jsonify({'msg': 'Player no encontrado'}), 404

        # Verificamos si el torneo existe
        tournament = Tournaments.query.get(tournament_id)
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404

        # Verificamos si el jugador ya está participando en el torneo
        existing_participation = Participants.query.filter_by(
            player_id=player_id,
            tournament_id=tournament_id
        ).first()

        if existing_participation:
            return jsonify({'msg': 'Ya estás participando en este torneo'}), 400
        
        # Verificamos si el torneo ha alcanzado su capacidad máxima de jugadores
        current_participants = Participants.query.filter_by(tournament_id=tournament_id).count()

        if current_participants >= tournament.participants_amount:
            return jsonify({'msg': 'El torneo ha alcanzado su capacidad máxima de jugadores'}), 400

        new_participant = Participants(
            player_id=player_id,
            tournament_id=tournament_id
        )

        db.session.add(new_participant)
        db.session.commit()
        
        # Comprobamos la cantidad de participantes en el torneo y lo registramos en la variable participants_registered
        tournament.participants_registered = Participants.query.filter_by(tournament_id=tournament.id).count()

        db.session.commit()

        manage_teams(tournament_id)

        return jsonify({
            'msg': 'Participación registrada con éxito', 
            'participant': new_participant.serialize(),
            'participants_registered': tournament.participants_registered
        }), 201

    except Exception as e:
        db.session.rollback() #Rollback por si hay algun error
        return jsonify({'msg': 'Error al registrar la participación', 'error': str(e)}), 500
    

@api.route('/tournaments/<int:tournament_id>/participants', methods=['GET'])    #GET todos los participantes de un torneo
@jwt_required()
def get_participants(tournament_id):
    try:
        # Obtener los participantes del torneo
        participants = Participants.query.filter_by(tournament_id=tournament_id).all()

        if not participants:
            return jsonify({'msg': 'No hay participantes en este torneo'}), 404
        
        users=[]

        for participant in participants:
            users.append(Players.query.get(participant.player_id))

        users = [user.serialize() for user in users]

        # Lista con los datos de los participantes
        return jsonify({'participants': users}), 200

    except Exception as e:
        return jsonify({'msg': 'Error al obtener los participantes', 'error': str(e)}), 500


@api.route('/tournaments/<int:tournament_id>/participants/<int:player_id>', methods=['GET'])    #GET un participante de un torneo
@jwt_required()
def get_participant(tournament_id, player_id):
    try:
        # Buscar si el jugador está registrado en este torneo
        participant = Participants.query.filter_by(tournament_id=tournament_id, player_id=player_id).first()

        if not participant:
            return jsonify({'msg': 'El jugador no está registrado en este torneo'}), 404

        player = Users.query.get(player_id)

        if not player:
            return jsonify({'msg': 'Jugador no encontrado'}), 404

        # Retornar detalles del participante
        participant_data = {
            'player_id': player.id,
            'name': player.name,
            'email': player.email,
            'rank': player.rank,
        }

        return jsonify({'participant': participant_data}), 200

    except Exception as e:
        return jsonify({'msg': 'Error al obtener el participante', 'error': str(e)}), 500

    
@api.route('/tournaments/<int:tournament_id>/remove_player/<int:player_id>', methods=['DELETE'])     #DELETE un participante de un torneo
@jwt_required()
def remove_participant(tournament_id, player_id):
    try:

        # Verificar si el participante esta registrado en el torneo
        participant = Participants.query.filter_by(tournament_id=tournament_id, player_id=player_id).first()
        if not participant:
            return jsonify({'msg': 'El jugador no está registrado en este torneo'}), 404

        db.session.delete(participant)
        db.session.commit()

        # Actualizar el número de participantes registrados en el torneo
        tournament = Tournaments.query.get(tournament_id)
        tournament.participants_registered = Participants.query.filter_by(tournament_id=tournament.id).count()
        
        db.session.commit()

        return jsonify({'msg': 'Jugador eliminado del torneo:', 'participants_registered': tournament.participants_registered}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al eliminar el jugador', 'error': str(e)}), 500
    


# __________________________________________________TEAMS__________________________________________________

@api.route('/tournaments/<int:tournament_id>/manage_teams', methods=['GET'])     #Verificamos el estado de los equipos.
@jwt_required()
def manage_teams (tournament_id):
    try:
        # Obtener el torneo
        tournament = Tournaments.query.get(tournament_id)
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404

        #Obtener los participantes del torneo sin equipo
        participants_unassigned = Participants.query.filter(
            Participants.tournament_id == tournament_id,
            ~Participants.id.in_(db.session.query(Teams.left).filter(Teams.tournament_id == tournament_id, Teams.left.isnot(None))),
            ~Participants.id.in_(db.session.query(Teams.right).filter(Teams.tournament_id == tournament_id, Teams.right.isnot(None)))
        ).all()
        
        # Buscar equipos sin participantes y los eliminamos
        empty_teams = Teams.query.filter(
            Teams.tournament_id == tournament_id,
            (Teams.left == None) & (Teams.right == None)
        ).all()
        
        for team in empty_teams:
            remove_team(tournament_id, team.id)

        # Buscamos equipos a los que les falte un participante.
        incomplete_teams = Teams.query.filter(
            Teams.tournament_id == tournament_id,
            (Teams.left == None) | (Teams.right == None)
        ).all()

        #Mientras haya equipos incompletos se ejecuta. Si hay participantes libres llamamos a edit_team (PUT), si no terminamos función
        for team in incomplete_teams:
            if participants_unassigned:
                participant = participants_unassigned.pop(0)
                edit_team(team.id, participant.id)
            else:
                return jsonify({'msg': 'No hay más participantes disponibles para asignar a equipos incompletos'}), 200

        #Mientras aun queden participantes libres, pero todos los equipos creados están completos. LLamamos a create_team (POST)
        while participants_unassigned:
            participant_1 = participants_unassigned.pop(0)
            participant_2 = participants_unassigned.pop(0) if participants_unassigned else None
            create_team(tournament_id, participant_1.id, participant_2.id if participant_2 else None)

        #Obtenemos datos de todos los equipos del torneo y su cantidad esperada para crear un match.
        teams = Teams.query.filter_by(tournament_id=tournament_id).all()
        expected_teams = tournament.participants_amount // 2

        #Si la cantidad de equipos actuales es igual a la esperada y no hay equipos incompletos. Creamos los Matches
        if len(teams) == expected_teams and not incomplete_teams:
            create_matches(tournament_id)
        else:
            return jsonify({'msg': 'Equipos aún no completos o número de equipos incorrecto'}), 400

    except Exception as e:
        return jsonify({'msg': 'Error en la administración de los Teams', 'error': str(e)}), 500


@api.route('/tournaments/<int:tournament_id>/create_team', methods=['POST'])        #POST equipo de un torneo
@jwt_required()
def create_team(tournament_id, participant_1_id, participant_2_id=None):
    try:
        # Obtener el nombre de los particiapantes  en caso de que no sea None para crear el nombre del equipo
        participant1 = Participants.query.get(participant_1_id)
        name1 = participant1.player_relationship.name if participant1.player_relationship else " "

        if participant_2_id is not None:
            participant2 = Participants.query.get(participant_2_id)
            if participant2:
                name2 = participant2.player_relationship.name if participant2.player_relationship else " "

        team_name = f"{name1} & {name2}"

        # Crear el equipo
        new_team = Teams(
            tournament_id=tournament_id,
            name=team_name,
            left=participant_1_id,
            right=participant_2_id
        )

        db.session.add(new_team)
        db.session.commit()

        create_matches(tournament_id)

        return jsonify({
            'msg': 'Equipo creado con éxito',
            'team_id': new_team.id,
            'tournament_id': tournament_id,
            'team_name': team_name,
            'participant_1_id': participant_1_id,
            'participant_2_id': participant_2_id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear un equipo', 'error': str(e)}), 500


@api.route('/tournaments/<int:tournament_id>/edit_team/<int:team_id>', methods=['PUT'])        #PUT equipo de un torneo
@jwt_required()
def edit_team(team_id, participant_id):
    try:
        # Obtener el equipo desde la base de datos
        team = Teams.query.get(team_id)

        # Obtener el nombre del participante a añadir
        participant = Participants.query.get(participant_id)
        participant_name = participant.player_relationship.name

         # Obtener el nombre actual de ambos miembros del equipo (uno será None)
        left_name = Participants.query.get(team.left).player_relationship.name if team.left else ""
        right_name = Participants.query.get(team.right).player_relationship.name if team.right else ""

        # Asignar el ID del participante a la parte del equipo que esta libre
        # Al miembro del equipo cuyo nombre sea None se le asignará su nombre de player (participant_name)
        if team.left is None:
            team.left = participant_id
            left_name = participant_name
        elif team.right is None:
            team.right = participant_id
            right_name = participant_name
        else:
            return jsonify({'msg': 'El equipo ya está completo'}), 400
        
        # Actualizar el nombre del equipo
        team.name = f"{left_name} & {right_name}"

        db.session.commit()

        return jsonify({
            'msg': f'Jugador {participant_id} agregado al equipo {team.id}',
            'team_id': team.id,
            'team_name': team.name,
            'participant_id': participant_id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al postera un equipo', 'error': str(e)}), 500
    

@api.route('/tournaments/<int:tournament_id>/remove_team/<int:team_id>', methods=['DELETE'])    #DELETE equipo de un torneo
@jwt_required()
def remove_team(tournament_id, team_id):
    try:

        team = Teams.query.get(team_id)

        db.session.delete(team)
        db.session.commit()

        manage_teams (tournament_id)

        return jsonify({'msg': f'Equipo {team_id} eliminado con éxito'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al eliminar el equipo', 'error': str(e)}), 500


@api.route('/tournaments/<int:tournament_id>/teams', methods=['GET'])        #GET todos los equipos de un torneo
@jwt_required()
def get_teams_by_tournament(tournament_id):
    try:
        # Verificar si el torneo existe
        tournament = Tournaments.query.get(tournament_id)
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404

        # Obtener todos los equipos de ese torneo
        teams = Teams.query.filter_by(tournament_id=tournament_id).all()

        if not teams:
            return jsonify({'msg': 'No hay equipos registrados en este torneo'}), 404

        # Devolver los equipos en formato JSON
        return jsonify({
            'msg': 'Equipos obtenidos correctamente',
            'teams': [team.serialize() for team in teams]
        }), 200

    except Exception as e:
        return jsonify({'msg': 'Error al obtener los equipos', 'error': str(e)}), 500



# //_________________________________________CREATE MATCH & MATCH_PARTICIPANTS_________________________________________

@api.route('/tournaments/<int:tournament_id>/matches', methods=['POST'])  # POST de las tablas de match de un torneo
@jwt_required()
def create_matches(tournament_id):
    try:
        # Obtener datos del torneo
        tournament = Tournaments.query.get(tournament_id)
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404

        # Obtener los equipos del torneo
        teams = Teams.query.filter_by(tournament_id=tournament_id).all()

        random.shuffle(teams)

        for i in range(0, len(teams), 2):
            match = Matches(
                tournament_id=tournament_id,
                round_number=1,
                winner_team_id=None,
                set_1="0-0", 
                set_2="0-0", 
                set_3="0-0",
                resume="Partido en espera"
            )

            db.session.add(match)
            db.session.commit()

            match_participants = Match_participants(
                match_id=match.id,
                team_1=teams[i].id,
                team_2=teams[i+1].id,
            )
            db.session.add(match_participants)
            db.session.commit()


        return jsonify({'msg': 'Matches creados con éxito'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear matches', 'error': str(e)}), 500
    
@api.route('/tournaments/<int:tournament_id>/matches', methods=['GET'])        #GET todos los matches de un torneo
def get_matches_by_tournament(tournament_id):
    try:
        # Verificar si el torneo existe
        tournament = Tournaments.query.get(tournament_id)
        if not tournament:
            return jsonify({'msg': 'Torneo no encontrado'}), 404

        # Obtener todos los matches de este torneo
        matches = Matches.query.filter_by(tournament_id=tournament_id).all()

        if not matches:
            return jsonify({'msg': 'No hay matches creados en este torneo'}), 404

        # Devolver los matches en formato JSON
        return jsonify({
            'msg': 'Matches obtenidos correctamente',
            'matches': [match.serialize() for match in matches]
        }), 200

    except Exception as e:
        return jsonify({'msg': 'Error al obtener los matches', 'error': str(e)}), 500



# _________________________________________Start_tournament_________________________________________

@api.route('/tournaments/<int:tournament_id>/generate_first_round', methods=['POST'])
@jwt_required()
def start_tournament(tournament_id):
    try:
        # Obtener el torneo
        tournament = Tournaments.query.get(tournament_id)

        # Verificar si todos los participantes están registrados
        if tournament.participants_registered != tournament.participants_amount:
            return jsonify({'msg': 'No hay suficientes participantes para iniciar el torneo'}), 400

        # Verificar que el número de equipos es correcto
        expected_teams = tournament.participants_amount // 2  # La mitad de los participantes
        teams = Teams.query.filter_by(tournament_id=tournament_id).all()

        if len(teams) != expected_teams:
            return jsonify({'msg': f'Se esperaban {expected_teams} equipos, pero hay {len(teams)} registrados'}), 400

        # Mezclar aleatoriamente los equipos
        random.shuffle(teams)

        # Crear los partidos de la primera ronda
        matches = []
        for i in range(0, len(teams), 2):
            if i + 1 < len(teams):  # Si hay un par de equipos
                match = Matches(
                    tournament_id=tournament_id,
                    round_number=1,
                    winner_team_id=None,  # Aún no hay ganador
                    set_1="0-0", set_2="0-0", set_3="0-0",
                    resume="Partido en espera"
                )
                db.session.add(match)
                db.session.commit()  # Guardamos el partido para obtener su ID

                match_participants = Match_participants(
                    match_id=match.id,
                    team_1=teams[i].id,
                    team_2=teams[i + 1].id
                )
                db.session.add(match_participants)
                matches.append(match_participants)

        db.session.commit()

        return jsonify({'msg': 'Ronda 1 generada con éxito', 'matches': [m.serialize() for m in matches]}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al generar la primera ronda', 'error': str(e)}), 500



# _________________________________________CLOUDINARY_________________________________________

@api.route('/upload', methods=['POST'])
def upload():
    file_to_upload = request.files['file']
    if file_to_upload:
        upload = cloudinary.uploader.upload(file_to_upload)
        print('-------------la url donde esta la imagen-------------', upload)
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400
