from datetime import datetime, timedelta
from typing import Optional

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from ..core.config import settings
from ..core.exceptions import InvalidCredentialsException, UserAlreadyExistsException
from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserDTO

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
  return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str) -> User:
  repo = UserRepository(db)
  user = repo.get_by_username(username)
  if not user or not verify_password(password, user.password):
    raise InvalidCredentialsException()
  return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
  return encoded_jwt

def register_user(db: Session, username: str, email: str, password: str) -> User:
  """Register a new user. Validates that username and email don't exist."""
  repo = UserRepository(db)
  
  if repo.get_by_username(username):
    raise UserAlreadyExistsException(field="username")
  if repo.get_by_email(email):
    raise UserAlreadyExistsException(field="email")
  
  hashed = get_password_hash(password)
  return repo.create_user(username=username, email=email, hashed_password=hashed)


def create_user(db: Session, username: str, email: str, password: str) -> User:
  repo = UserRepository(db)
  hashed = get_password_hash(password)
  return repo.create_user(username=username, email=email, hashed_password=hashed)


def login_user(db: Session, username: str, password: str) -> UserDTO:
  """Authenticate and return UserDTO with token."""
  user = authenticate_user(db, username, password)
  access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
  return UserDTO(username=user.username, token=token, role=user.role, image=user.image)