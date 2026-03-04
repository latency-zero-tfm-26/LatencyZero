from ..schemas.user import UserAdminDTO
from sqlalchemy.orm import Session
from ..repositories.user_repository import UserRepository
from ..mappers.user_mapper import map_user_to_admin_dto, map_users_to_admin_dtos
from ..models.user import User

def get_all_users(db: Session):
    repo = UserRepository(db)
    users = repo.get_users()
    users_dtos = map_users_to_admin_dtos(users)
    return users_dtos

def toggle_user_role_service(db: Session, target_user_id: int, current_user: User) -> UserAdminDTO:
    if current_user.role != "admin":
        raise PermissionError("Admin privileges required")

    if current_user.id == target_user_id:
        raise ValueError("Cannot change your own role")

    target_user = db.query(User).filter(User.id == target_user_id).first()
    if not target_user:
        raise LookupError("Target user not found")

    if current_user.id == target_user_id:
        raise ValueError("Cannot change your own role")

    target_user.role = "user" if target_user.role == "admin" else "admin"
    db.commit()
    db.refresh(target_user)

    return map_user_to_admin_dto(target_user)

def ban_user_service(db: Session, target_user_id: int, current_user: User) -> UserAdminDTO:
    if current_user.role != "admin":
        raise PermissionError("Admin privileges required")

    if current_user.id == target_user_id:
        raise ValueError("Cannot ban yourself")

    target_user = db.query(User).filter(User.id == target_user_id).first()
    if not target_user:
        raise LookupError("Target user not found")

    # Toggle ban/unban
    if target_user.role == "banned":
        target_user.role = "user"
        target_user.is_banned = False
    else:
        target_user.role = "banned"
        target_user.is_banned = True

    db.commit()
    db.refresh(target_user)

    return map_user_to_admin_dto(target_user)