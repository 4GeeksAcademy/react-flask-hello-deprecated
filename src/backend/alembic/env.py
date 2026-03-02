import sys
import pathlib
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Añadir la raíz del proyecto al path para que 'src' sea visible
sys.path.append(str(pathlib.Path(__file__).resolve().parents[3]))

# Importar Base y settings
from src.backend.core.database import Base
from src.backend.core.config import settings

# Importar modelos existentes (solo los que estén listos)
from src.backend.api.users.models.user import User
# from src.backend.api.groups.models.group import Group
# from src.backend.api/roles/models/role import Role
# from src/backend.api/finances/models/finance import Finance

# Configuración de Alembic
config = context.config
config.set_main_option('sqlalchemy.url', settings.DATABASE_URL)

# Metadata para autogenerate
target_metadata = Base.metadata

# Configuración de logging
fileConfig(config.config_file_name)

# Evitar error de template missing
config.set_main_option('template', 'generic')


def run_migrations_offline():
    """Ejecuta migraciones sin conexión a la DB (offline)"""
    url = config.get_main_option('sqlalchemy.url')
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"}
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Ejecuta migraciones con conexión a la DB (online)"""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()