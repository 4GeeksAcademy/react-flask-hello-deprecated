from fastapi import FastAPI

from src.backend.api.users.router import router as users_router
from src.backend.api.groups.router import router as groups_router
from src.backend.api.finances.router import router as finances_router
from src.backend.api.roles.router import router as roles_router

app = FastAPI(title="Gestion Financiera")

app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(groups_router, prefix="/groups", tags=["Groups"])
app.include_router(finances_router, prefix="/finances", tags=["Finances"])
app.include_router(roles_router, prefix="/roles", tags=["Roles"])