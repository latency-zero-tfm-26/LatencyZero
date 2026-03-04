from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List

from ...db.session import get_db
from ...services.admin_service import ban_user_service, get_all_users, toggle_user_role_service
from ...schemas.user import UserAdminDTO
from ...services.auth_service import decode_token
from ...models.user import User

router = APIRouter(prefix="/admin", tags=["admin"])
_bearer = HTTPBearer()

@router.get("/users", response_model=List[UserAdminDTO])
def fetch_all_users(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
    db: Session = Depends(get_db)
):
    """Get all users (admin only)."""
    try:
        payload = decode_token(credentials.credentials)
        user_id = payload.get("sub")
        user = db.query(User).filter(User.id == int(user_id)).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        if user.role != "admin":
            raise HTTPException(status_code=403, detail="Admin privileges required")

        users = get_all_users(db)
        return users  
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    

@router.patch("/users/toggle-role/{user_id}", response_model=UserAdminDTO)
def toggle_user_role(
    user_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
    db: Session = Depends(get_db)
):
    """Toggle a user's role between 'user' and 'admin'. Only admins can do this."""
    token = credentials.credentials
    try:
        payload = decode_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    current_user_id = payload.get("sub")
    if not current_user_id:
        raise HTTPException(status_code=401, detail="Token missing 'sub'")

    current_user = db.query(User).filter(User.id == int(current_user_id)).first()
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")

    try:
        target_user = toggle_user_role_service(db, user_id, current_user)
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except LookupError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return target_user


@router.patch("/users/ban/{user_id}", response_model=UserAdminDTO)
def ban_user(
    user_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
    db: Session = Depends(get_db)
):
    """Ban a user: role='banned' and is_banned=True. Only admins can do this."""
    token = credentials.credentials
    try:
        payload = decode_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    current_user_id = payload.get("sub")
    if not current_user_id:
        raise HTTPException(status_code=401, detail="Token missing 'sub'")

    current_user = db.query(User).filter(User.id == int(current_user_id)).first()
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")

    try:
        target_user = ban_user_service(db, user_id, current_user)
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except LookupError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return target_user