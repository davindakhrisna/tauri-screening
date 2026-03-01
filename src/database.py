import os
from pathlib import Path

from chromadb.config import Settings

import chromadb

# Create data directory if it doesn't exist
CHROMA_PERSIST_DIR = Path("chroma_data")
CHROMA_PERSIST_DIR.mkdir(exist_ok=True)

# Initialize ChromaDB client with persistence
client = chromadb.PersistentClient(
    path=str(CHROMA_PERSIST_DIR),
    settings=Settings(
        anonymized_telemetry=False,
        allow_reset=True,
    ),
)

# Get or create collection
collection = client.get_or_create_collection(
    name="documents",
    metadata={"hnsw:space": "cosine"},
)


def get_collection():
    return collection


def get_client():
    return client


def reset_chroma():
    client.reset()
