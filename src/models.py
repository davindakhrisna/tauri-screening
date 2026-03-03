from typing import Optional

from pydantic import BaseModel


class DocumentAdd(BaseModel):
    ids: list[str]
    documents: list[str]
    metadatas: Optional[list[dict]] = None


class DocumentQuery(BaseModel):
    query_text: str
    n_results: int = 5


class QueryResponse(BaseModel):
    ids: list[list[str]]
    documents: list[list[str]]
    distances: list[list[float]]
    metadatas: list[list[dict]]


# SQLite models
class Settings(BaseModel):
    id: int
    ocr_engine: str
    stt_engine: str
    stt_size: str
    api_key: str


class SettingsUpdate(BaseModel):
    ocr_engine: str
    stt_engine: str
    stt_size: str
    api_key: str
