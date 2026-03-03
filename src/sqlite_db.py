import sqlite3
from pathlib import Path

DB_PATH = Path("screentunnel.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS items")

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ocr_engine TEXT NOT NULL DEFAULT 'cpu',
            stt_engine TEXT NOT NULL DEFAULT 'cpu',
            stt_size TEXT NOT NULL DEFAULT 'tiny',
            api_key TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        INSERT INTO settings (ocr_engine, stt_engine, stt_size, api_key) 
        VALUES ('cpu', 'cpu', 'tiny', '')
    """)

    conn.commit()
    conn.close()


init_db()


def get_settings() -> dict:
    """Get current settings."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM settings ORDER BY id DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row)


def update_settings(
    ocr_engine: str, stt_engine: str, stt_size: str, api_key: str
) -> dict:
    """Update settings. Returns the updated settings."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM settings")
    cursor.execute(
        """
        INSERT INTO settings (ocr_engine, stt_engine, stt_size, api_key) 
        VALUES (?, ?, ?, ?)
    """,
        (ocr_engine, stt_engine, stt_size, api_key),
    )

    conn.commit()

    cursor.execute("SELECT * FROM settings LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row)
