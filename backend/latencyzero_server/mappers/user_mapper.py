
from ..models.user import User
from ..schemas.user import UserAdminDTO


def map_user_to_admin_dto(user: User):
  return UserAdminDTO(
    id=user.id,
    username=user.username,
    email=user.email,
    role=user.role,
    create_at=user.create_at.isoformat() if user.create_at else None
  )

def map_users_to_admin_dtos(users: list[User]) -> list[UserAdminDTO]:
  return [map_user_to_admin_dto(user) for user in users]