from sqlalchemy.orm import Session
from ..repositories.user_repository import UserRepository
from ..mappers.user_mapper import map_users_to_admin_dtos

def get_all_users(db: Session):
    """
    Retorna todos los usuarios mapeados a DTOs de admin.
    No valida roles; eso se hace en el controlador.
    """
    repo = UserRepository(db)
    users = repo.get_users()
    users_dtos = map_users_to_admin_dtos(users)
    return users_dtos