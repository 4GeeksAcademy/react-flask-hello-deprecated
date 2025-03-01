"""empty message

Revision ID: d2e65d632be5
Revises: 3c8bf7fb6862
Create Date: 2025-02-28 14:43:08.628406

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2e65d632be5'
down_revision = '3c8bf7fb6862'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('account_details', schema=None) as batch_op:
        batch_op.alter_column('amount',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=False)

    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.alter_column('balance',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.alter_column('balance',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('account_details', schema=None) as batch_op:
        batch_op.alter_column('amount',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
