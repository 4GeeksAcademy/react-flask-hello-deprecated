"""empty message

Revision ID: a657fd9497fb
Revises: d6917e2f6b86
Create Date: 2025-02-07 08:39:18.712636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a657fd9497fb'
down_revision = 'd6917e2f6b86'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tournament_id', sa.Integer(), nullable=True),
    sa.Column('set_1', sa.String(), nullable=False),
    sa.Column('set_2', sa.String(), nullable=False),
    sa.Column('set_3', sa.String(), nullable=False),
    sa.Column('resume', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['tournament_id'], ['tournaments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('participants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.Column('tournament_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.ForeignKeyConstraint(['tournament_id'], ['tournaments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=500), nullable=False),
    sa.Column('player', sa.Boolean(), nullable=False),
    sa.Column('host_id', sa.Integer(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['host_id'], ['hosts.id'], ),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_number', sa.Integer(), nullable=True),
    sa.Column('left', sa.Integer(), nullable=True),
    sa.Column('right', sa.Integer(), nullable=True),
    sa.Column('tournament_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['left'], ['participants.id'], ),
    sa.ForeignKeyConstraint(['right'], ['participants.id'], ),
    sa.ForeignKeyConstraint(['tournament_id'], ['tournaments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('match_participants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_1', sa.Integer(), nullable=True),
    sa.Column('team_2', sa.Integer(), nullable=True),
    sa.Column('match_id', sa.Integer(), nullable=True),
    sa.Column('winner', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['match_id'], ['matches.id'], ),
    sa.ForeignKeyConstraint(['team_1'], ['teams.id'], ),
    sa.ForeignKeyConstraint(['team_2'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('hosts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tournament_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'tournaments', ['tournament_id'], ['id'])

    with op.batch_alter_table('tournaments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('host_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'hosts', ['host_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tournaments', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('host_id')

    with op.batch_alter_table('hosts', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('tournament_id')

    op.drop_table('match_participants')
    op.drop_table('teams')
    op.drop_table('users')
    op.drop_table('participants')
    op.drop_table('matches')
    # ### end Alembic commands ###
