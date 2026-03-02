from sqlalchemy import text
from src.backend.core.database import engine

with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))
    print("Conexión DB OK:", result.scalar())
