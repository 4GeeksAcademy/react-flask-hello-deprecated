"""empty message

Revision ID: a735996f8bec
Revises: 2d6ef2429a3c
Create Date: 2025-02-02 11:21:37.058484

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a735996f8bec'
down_revision = '2d6ef2429a3c'
branch_labels = None
depends_on = None


def upgrade():
    
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nombre', sa.String(length=50), nullable=False, server_default='Desconocido'))
        batch_op.add_column(sa.Column('apellidos', sa.String(length=50), nullable=False, server_default='Desconocido'))

    
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('nombre', server_default=None)
        batch_op.alter_column('apellidos', server_default=None)


def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('nombre')
        batch_op.drop_column('apellidos')