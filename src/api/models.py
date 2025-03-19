from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    player = db.Column(db.Boolean, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('hosts.id'))
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))


    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "player": self.player,
        }


class Tournaments(db.Model):
    __tablename__ = 'tournaments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    type = db.Column(db.String(), nullable=False)
    inscription_fee = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    schedule = db.Column(db.DateTime, nullable=False)
    award = db.Column(db.String(), nullable=False)
    tournament_winner = db.Column(db.String())
    image = db.Column(db.String())
    participants_amount = db.Column(db.Integer(), nullable=False)
    participants_registered = db.Column(db.Integer())

    host_id = db.Column(db.Integer, db.ForeignKey('hosts.id'), nullable=True)
    
    host = db.relationship('Hosts', backref=('tournaments'),  foreign_keys=[host_id])
    tournament_match = db.relationship('Matches', backref=('tournament_match'))
    participants = db.relationship('Participants', back_populates='tournament_relationship')
    teams = db.relationship('Teams', backref='tournament')
    

    def __repr__(self):
        return '<Tournament %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "inscription_fee": self.inscription_fee,
            "rating": self.rating,
            "schedule": self.schedule,
            "award": self.award,
            "tournament_winner": self.tournament_winner,
            "image": self.image,
            "participants_amount": self.participants_amount,
            "participants_registered": self.participants_registered,
            "host": self.host.serialize() if self.host else None,
            "tournament_match" : [match.serialize() for match in self.tournament_match] if self.tournament_match else None,
            "participants" : [participant.serialize() for participant in self.participants] if self.participants else None,
            "teams" : [team.serialize() for team in self.teams] if self.teams else []
    }


class Hosts(db.Model):
    __tablename__ = 'hosts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
    address = db.Column(db.Text)
    court_type = db.Column(db.String())
    image = db.Column(db.String())
    phone = db.Column(db.String(15))

    def __repr__(self):
        return '<Host %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "court_type": self.court_type,
            "image": self.image,
            "phone": self.phone
    }


class Players(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    gender = db.Column(db.String())
    age = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    side = db.Column(db.String())
    hand = db.Column(db.String())
    image = db.Column(db.String())
    phone = db.Column(db.String(15))
    tournament_participant = db.relationship('Participants', back_populates='player_relationship')
    

    def __repr__(self):
        return '<Player %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "age": self.age,
            "rating": self.rating,
            "hand": self.hand,
            "side": self.side,
            "image": self.image,
            "phone": self.phone,
            "tournament_participant": [player.serialize() for player in self.tournament_participant] if self.tournament_participant else None,
    }


class Matches(db.Model):
    __tablename__ = 'matches'
    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'))
    winner_team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=True)

    round_number = db.Column(db.Integer, nullable=False)

    set_1 = db.Column(db.String(), nullable=False)
    set_2= db.Column(db.String(), nullable=False)
    set_3 = db.Column(db.String(), nullable=False)
    resume = db.Column(db.Text)
    
    participants_match = db.relationship('Match_participants', back_populates='match_relationship')
    winner_team = db.relationship('Teams', foreign_keys=[winner_team_id])

    def __repr__(self):
        return '<Match %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "tournament_id": self.tournament_id,
            "round_number": self.round_number,
            "set_1": self.set_1,
            "set_2": self.set_2,
            "set_3": self.set_3,
            "resume": self.resume,
            "winner_team": self.winner_team.serialize() if self.winner_team else None,
            "participants_match": [participant.serialize() for participant in self.participants_match] if self.participants_match else None
    }


class Teams(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    team_number = db.Column(db.Integer)
    left = db.Column(db.Integer, db.ForeignKey('participants.id'))
    right = db.Column(db.Integer, db.ForeignKey('participants.id'))
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'))
    
    left_participant = db.relationship('Participants', foreign_keys=[left], back_populates='team_left')
    right_participant = db.relationship('Participants', foreign_keys=[right], back_populates='team_right')
    matches_as_team_1 = db.relationship('Match_participants', foreign_keys='Match_participants.team_1', back_populates='team_1_relationship')
    matches_as_team_2 = db.relationship('Match_participants', foreign_keys='Match_participants.team_2', back_populates='team_2_relationship')

    def __repr__(self):
        return '<Team %r>' % self.id
    
    def serialize(self):
        return {
        "id": self.id,
        "team_number": self.team_number,
        "left": self.left_participant.serialize() if self.left_participant else None,
        "right": self.right_participant.serialize() if self.right_participant else None,
        "tournament_id": self.tournament_id,
    }


class Participants(db.Model):
    __tablename__ = 'participants'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'))

    player_relationship = db.relationship('Players', back_populates='tournament_participant')
    tournament_relationship = db.relationship('Tournaments', back_populates='participants')
    team_left = db.relationship('Teams', foreign_keys='Teams.left', back_populates='left_participant')
    team_right = db.relationship('Teams', foreign_keys='Teams.right', back_populates='right_participant')

    def __repr__(self):
         return '<Participants %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "player_id" : self.player_id,
            "tournament_id" : self.tournament_id,
    }


class Match_participants(db.Model):
    __tablename__ = 'match_participants'
    id = db.Column(db.Integer, primary_key=True)

    team_1 = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team_2 = db.Column(db.Integer, db.ForeignKey('teams.id'))
    match_id = db.Column(db.Integer, db.ForeignKey('matches.id'))

    team_1_relationship = db.relationship('Teams', foreign_keys=[team_1], back_populates='matches_as_team_1')
    team_2_relationship = db.relationship('Teams', foreign_keys=[team_2], back_populates='matches_as_team_2')
    match_relationship = db.relationship('Matches', back_populates='participants_match')


    def __repr__(self):
         return '<Match_participants %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "team_1": self.team_1_relationship.serialize() if self.team_1_relationship else None,
            "team_2": self.team_2_relationship.serialize() if self.team_2_relationship else None,
            "match_id" : self.match_id,
    }


