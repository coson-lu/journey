import logging
from typing import Optional
from google.cloud import firestore
import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore

cred = credentials.Certificate('./key.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

class FireStore:
    def stream_collection(filter=None, limit: int = -1) -> dict:
        try:
            doc_ref = db.collection('data')
            if filter:
                doc_ref = doc_ref.where(filter=filter)
            if limit != -1:
                doc_ref = doc_ref.limit(limit)

            docs = {doc.id: doc.to_dict() for doc in doc_ref.stream()}

            if docs:
                logging.info(
                    f"Streamed collection {'data'}"
                )
                return docs
            else:
                logging.warning(
                    f"Collection {'data'} does not exist in collection {'data'}"
                )
                return {}
        except Exception as e:
            logging.error(
                f"An error occurred during collection streaming: {e}", exc_info=True
            )
            raise

    def upsert_document(document_id: str, data: dict) -> None:
        try:
            doc_ref = db.collection('data').document(document_id)
            doc_ref.set(data, merge=False)
            logging.info(
                f"Document {document_id} upserted in collection {'data'}"
            )
        except Exception as e:
            logging.error(
                f"An error occurred during document creation: {e}", exc_info=True
            )
            raise

    def merge_document(document_id: str, data: dict) -> None:
        try:
            doc_ref = db.collection('data').document(document_id)
            doc_ref.set(data, merge=True)
            logging.info(
                f"Document {document_id} merged in collection {'data'}"
            )
        except Exception as e:
            logging.error(
                f"An error occurred during document creation: {e}", exc_info=True
            )
            raise

    def read_document(document_id: str) -> Optional[dict]:
        try:
            doc_ref = (
                db.collection('data').document(document_id)
            )
            doc = doc_ref.get()
            if doc.exists:
                logging.info(
                    f"Document {document_id} read from collection {'data'}"
                )
                return doc.to_dict()
            else:
                logging.warning(
                    f"Document {document_id} does not exist in collection {'data'}"
                )
                return None
        except Exception as e:
            logging.error(
                f"An error occurred during document reading: {e}", exc_info=True
            )
            raise

    def update_document(document_id: str, data: dict) -> None:
        try:
            doc_ref = db.collection('data').document(document_id)
            doc_ref.update(data)
            logging.info(
                f"Document {document_id} updated in collection {'data'}"
            )
        except Exception as e:
            logging.error(
                f"An error occurred during document updating: {e}", exc_info=True
            )
            raise

    def delete_document(document_id: str) -> None:
        try:
            doc_ref = db.collection('data').document(document_id)
            doc_ref.delete()
            logging.info(
                f"Document {document_id} deleted from collection {'data'}"
            )
        except Exception as e:
            logging.error(
                f"An error occurred during document deletion: {e}", exc_info=True
            )
            raise