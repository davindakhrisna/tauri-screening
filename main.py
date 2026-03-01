from fastapi import FastAPI
from src.routers.vector_store import router as vector_router

app = FastAPI()

app.include_router(vector_router)


@app.get("/")
async def root():
    return {"message": "FastAPI + ChromaDB is running"}
