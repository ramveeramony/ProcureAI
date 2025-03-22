"""
API Endpoints for ProcureAI

This module defines the FastAPI endpoints for interacting with the ProcureAI system.
"""

import os
import json
import uuid
import tempfile
import shutil
from datetime import datetime
from typing import Dict, List, Optional, Any
from pathlib import Path

import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from pydantic import BaseModel

# Import the ProcureAI main system
from procure_vision_agent import AustralianGovProcurementSystem

# Load environment variables
load_dotenv()

app = FastAPI(
    title="ProcureAI API",
    description="API for Australian Government Procurement Document Processing",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the ProcureAI system
procure_system = AustralianGovProcurementSystem(
    openai_api_key=os.environ.get("OPENAI_API_KEY"),
    vision_agent_api_key=os.environ.get("VISION_AGENT_API_KEY"),
    storage_path=os.environ.get("STORAGE_PATH", "./document_storage"),
    government_templates_path=os.environ.get("GOV_TEMPLATES_PATH", "./gov_templates")
)

# OAuth2 for simple authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock user database for demo purposes
# In production, replace this with a real authentication system
USERS = {
    "admin": {
        "username": "admin",
        "full_name": "Admin User",
        "email": "admin@example.com",
        "hashed_password": "admin123",  # In production, use proper password hashing
        "role": "admin"
    },
    "procurement_officer": {
        "username": "procurement_officer",
        "full_name": "Procurement Officer",
        "email": "procurement@example.com",
        "hashed_password": "officer123",
        "role": "procurement_officer"
    },
    "legal_advisor": {
        "username": "legal_advisor",
        "full_name": "Legal Advisor",
        "email": "legal@example.com",
        "hashed_password": "legal123",
        "role": "legal_advisor"
    }
}

def get_current_user(token: str = Depends(oauth2_scheme)):
    if token not in USERS:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return USERS[token]

# Models for API request/response
class DocumentUploadResponse(BaseModel):
    success: bool
    message: str
    file_id: Optional[str] = None
    document_type: Optional[str] = None

class DocumentProcessRequest(BaseModel):
    file_id: str
    process_type: str  # classify, extract, summarize, compare, assess_risk
    parameters: Optional[Dict[str, Any]] = None

class DocumentProcessResponse(BaseModel):
    success: bool
    message: str
    file_id: str
    result: Optional[Dict[str, Any]] = None

class SearchRequest(BaseModel):
    query: str
    document_type: Optional[str] = None
    date_range: Optional[str] = None

# API Endpoints
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = USERS.get(form_data.username)
    if not user or form_data.password != user["hashed_password"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user["username"], "token_type": "bearer"}

@app.get("/")
async def root():
    return {"message": "Welcome to ProcureAI - Australian Government Procurement Document Processing System"}

@app.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    document_type: Optional[str] = Form(None),
    vendor_name: Optional[str] = Form(None),
    current_user: dict = Depends(get_current_user)
):
    """
    Upload a document to the system.
    """
    # Save the uploaded file to a temporary location
    try:
        temp_dir = tempfile.mkdtemp()
        temp_file_path = os.path.join(temp_dir, file.filename)
        
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process the document in the background
        upload_result = procure_system.upload_and_process_document(
            file_path=temp_file_path,
            document_type=document_type,
            vendor_name=vendor_name
        )
        
        # Clean up temp file in the background
        background_tasks.add_task(shutil.rmtree, temp_dir)
        
        if upload_result["success"]:
            return {
                "success": True,
                "message": f"Document uploaded and processing initiated",
                "file_id": upload_result["file_id"],
                "document_type": document_type
            }
        else:
            return {
                "success": False,
                "message": upload_result.get("message", "Unknown error occurred during upload")
            }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error processing document: {str(e)}"
        }

@app.post("/documents/process", response_model=DocumentProcessResponse)
async def process_document(
    request: DocumentProcessRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Process a document with a specific operation (classify, extract, summarize, etc.).
    """
    try:
        # Create a thread for this operation
        thread = procure_system.create_thread()
        
        # Prepare the processing command based on the request
        if request.process_type == "classify":
            command = f"Classify document with ID {request.file_id}"
        elif request.process_type == "extract":
            command = f"Extract key information from document with ID {request.file_id}"
        elif request.process_type == "summarize":
            max_length = request.parameters.get("max_length", 250) if request.parameters else 250
            command = f"Summarize document with ID {request.file_id} with maximum length {max_length} words"
        elif request.process_type == "compare":
            comparison_id = request.parameters.get("comparison_file_id") if request.parameters else None
            template = request.parameters.get("template_name") if request.parameters else None
            
            if comparison_id:
                command = f"Compare document with ID {request.file_id} against document with ID {comparison_id}"
            elif template:
                command = f"Compare document with ID {request.file_id} against template {template}"
            else:
                return {
                    "success": False,
                    "message": "Either comparison_file_id or template_name must be provided for comparison",
                    "file_id": request.file_id
                }
        elif request.process_type == "assess_risk":
            command = f"Assess the risk level of document with ID {request.file_id}"
        else:
            return {
                "success": False,
                "message": f"Unknown process type: {request.process_type}",
                "file_id": request.file_id
            }
        
        # Execute the command
        _, response = procure_system.ask_agent(thread.id, command)
        
        return {
            "success": True,
            "message": "Document processed successfully",
            "file_id": request.file_id,
            "result": {
                "process_type": request.process_type,
                "response": response,
                "thread_id": thread.id
            }
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error processing document: {str(e)}",
            "file_id": request.file_id
        }

@app.post("/documents/search")
async def search_documents(
    request: SearchRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Search for documents by query, document type, or date range.
    """
    try:
        # Create a thread for this operation
        thread = procure_system.create_thread()
        
        # Prepare the search command
        command = f"Search for documents with query: {request.query}"
        if request.document_type:
            command += f", document type: {request.document_type}"
        if request.date_range:
            command += f", date range: {request.date_range}"
        
        # Execute the command
        _, response = procure_system.ask_agent(thread.id, command)
        
        # Also get direct search results from the tool
        search_result = procure_system.tools[5](request.query, request.document_type, request.date_range)
        
        return {
            "success": True,
            "message": "Search completed",
            "query": request.query,
            "response": response,
            "results": search_result.get("results", []) if search_result.get("success", False) else [],
            "result_count": search_result.get("result_count", 0) if search_result.get("success", False) else 0
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error searching documents: {str(e)}"
        }

@app.get("/dashboard")
async def get_dashboard(current_user: dict = Depends(get_current_user)):
    """
    Get dashboard statistics for the procurement system.
    """
    try:
        dashboard_result = procure_system.get_document_dashboard()
        
        if dashboard_result["success"]:
            return {
                "success": True,
                "dashboard": dashboard_result["dashboard"]
            }
        else:
            return {
                "success": False,
                "message": dashboard_result.get("message", "Error retrieving dashboard")
            }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error retrieving dashboard: {str(e)}"
        }

@app.get("/documents/{file_id}")
async def get_document_details(
    file_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get details for a specific document.
    """
    try:
        import glob
        import json
        
        # Find the document by file_id
        meta_files = glob.glob(os.path.join(procure_system.storage_path, f"*_{file_id}_*.meta.json"))
        
        if not meta_files:
            return {
                "success": False,
                "message": f"No document found with ID {file_id}"
            }
        
        # Load metadata
        with open(meta_files[0], 'r') as f:
            metadata = json.load(f)
        
        return {
            "success": True,
            "file_id": file_id,
            "metadata": metadata
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error retrieving document details: {str(e)}"
        }

if __name__ == "__main__":
    # Run the API server
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    uvicorn.run("api:app", host=host, port=port, reload=True)
