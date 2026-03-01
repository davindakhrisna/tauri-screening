from fastapi import APIRouter, HTTPException

from src.database import get_collection, reset_chroma, get_client
from src.models import DocumentAdd, DocumentQuery, QueryResponse

router = APIRouter(prefix="/vector", tags=["vector-store"])


@router.post("/add")
async def add_documents(data: DocumentAdd):
    try:
        collection = get_collection()
        collection.add(ids=data.ids, documents=data.documents, metadatas=data.metadatas)
        return {"message": f"Added {len(data.ids)} documents"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query", response_model=QueryResponse)
async def query_documents(data: DocumentQuery):
    try:
        collection = get_collection()
        results = collection.query(
            query_texts=[data.query_text],
            n_results=data.n_results,
            include=["documents", "metadatas", "distances"],
        )
        return QueryResponse(**results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete")
async def delete_documents(ids: list[str]):
    try:
        collection = get_collection()
        collection.delete(ids=ids)
        return {"message": f"Deleted {len(ids)} documents"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/count")
async def get_count():
    collection = get_collection()
    return {"count": collection.count()}


@router.post("/reset")
async def reset_vector_store():
    reset_chroma()
    get_collection()
    return {"message": "✅ ChromaDB reset successfully. Default collection recreated."}
