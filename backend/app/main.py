from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import crypto,defi,whale,onchain,auth
app=FastAPI(title="Vistas Partners Crypto API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","app://*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(crypto.router,prefix="/api/crypto",tags=["crypto"])
app.include_router(defi.router,prefix="/api/defi",tags=["defi"])
app.include_router(whale.router,prefix="/api/whale",tags=["whale"])
app.include_router(onchain.router,prefix="/api/onchain",tags=["onchain"])
app.include_router(auth.router,prefix="/api/auth",tags=["auth"])
@app.get("/health")
def health():return{"status":"ok"}
# Swagger auto-docs at /docs, ReDoc at /redoc
