from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import coins, defi, whale, onchain, auth

app = FastAPI(
    title="Vistas Partners Crypto API",
    description="Backend API for the Vistas crypto intelligence platform",
    version="1.0.0"
)

# Allow Electron/React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "app://*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,    prefix="/auth",    tags=["auth"])
app.include_router(coins.router,   prefix="/coins",   tags=["coins"])
app.include_router(defi.router,    prefix="/defi",    tags=["defi"])
app.include_router(whale.router,   prefix="/whale",   tags=["whale signals"])
app.include_router(onchain.router, prefix="/onchain", tags=["on-chain"])

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "1.0.0"}
