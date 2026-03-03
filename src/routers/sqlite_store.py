from fastapi import APIRouter, HTTPException

from src.sqlite_db import get_settings, update_settings
from src.models import Settings, SettingsUpdate

router = APIRouter(prefix="/sqlite", tags=["sqlite"])


@router.get("/settings", response_model=Settings)
async def get_sqlite_settings():
    """Get current settings."""
    settings = get_settings()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings


@router.put("/settings", response_model=Settings)
async def update_sqlite_settings(data: SettingsUpdate):
    if data.ocr_engine not in ["gpu", "cpu"]:
        raise HTTPException(status_code=400, detail="ocr_engine must be 'gpu' or 'cpu'")
    if data.stt_engine not in ["gpu", "cpu"]:
        raise HTTPException(status_code=400, detail="stt_engine must be 'gpu' or 'cpu'")
    if data.stt_size not in ["tiny", "base", "small"]:
        raise HTTPException(
            status_code=400, detail="stt_size must be 'tiny', 'base', or 'small'"
        )

    settings = update_settings(
        ocr_engine=data.ocr_engine,
        stt_engine=data.stt_engine,
        stt_size=data.stt_size,
        api_key=data.api_key,
    )
    return settings
