
endpoint crear torneo

0:el post de torneo se van a crear la mitad de la cantidad de participantes como equipos en la tabla de equipos
cuando se vaya a asignar un jugador a un equipo: 

endopint crear participante

1: jugador registrarse en el torneo

2: en el post de participant se va a buscar todos los equipos registrados, que salen del punto 0

3: se va a buscar en cada equipo hasta que se encuentre una posicion vacia, de manera organizada (bucle)

4: checkear si el torneo tiene todas las plazas ocupadas (tournament.participants_registered)

5: si el jugador ya se registro en el torneo (chequeo)

si se rompe la base de datos con las migraciones, reset_db y copiamos en la migracion que se creo 

def upgrade():
    # Crear la tabla hosts primero
    op.create_table('hosts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('court_type', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('phone', sa.String(length=15), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )

    # Luego crear la tabla tournaments
    op.create_table('tournaments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('inscription_fee', sa.Integer(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('schedule', sa.DateTime(), nullable=False),
        sa.Column('award', sa.String(), nullable=False),
        sa.Column('tournament_winner', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('participants_amount', sa.Integer(), nullable=False),
        sa.Column('participants_registered', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Crear las demás tablas
    op.create_table('players',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('gender', sa.String(), nullable=True),
        sa.Column('age', sa.Integer(), nullable=True),
        sa.Column('rating', sa.Integer(), nullable=True),
        sa.Column('side', sa.String(), nullable=True),
        sa.Column('hand', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('phone', sa.String(length=15), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    #...

def downgrade():
    # Eliminar las tablas en orden inverso
    op.drop_table('players')
    op.drop_table('tournaments')
    op.drop_table('hosts')


despues hacermos pipenv run upgrade, migrate y upgrade




