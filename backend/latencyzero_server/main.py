from fastapi import FastAPI

from .core.config import settings 
from .db.session import engine, Base
from . import models
from .api.auth.router import router as auth_router
from .core.exception_handlers import setup_exception_handlers

app = FastAPI(title="LatencyZero Server")

setup_exception_handlers(app)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/")
def root():
  return {
    "LatencyZero backend 🤖"
  }
