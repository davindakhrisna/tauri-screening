from fastapi import FastAPI
from src.routers.vector_store import router as vector_router
from src.routers.sqlite_store import router as sqlite_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(vector_router)
app.include_router(sqlite_router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "FastAPI + ChromaDB is running"}
