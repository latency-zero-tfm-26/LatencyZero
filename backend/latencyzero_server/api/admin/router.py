from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List

from ...db.session import get_db
from ...services.admin_service import get_all_users
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