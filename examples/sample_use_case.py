"""
Sample Use Case for ProcureAI

This script demonstrates a typical workflow using the ProcureAI system:
1. Upload a procurement document
2. Classify the document
3. Extract key information
4. Summarize the document
5. Assess the document's risk level
6. Compare with a standard template

Prerequisites:
- ProcureAI installed and configured
- API keys set in .env file
- Sample documents in the examples/sample_documents directory
"""

import os
import sys
import time
from pathlib import Path
from dotenv import load_dotenv

# Add the parent directory to sys.path to import the ProcureAI module
sys.path.append(str(Path(__file__).parent.parent))
from src.procure_vision_agent import AustralianGovProcurementSystem

# Load environment variables
load_dotenv()

def main():
    print("=== ProcureAI Sample Use Case ===")
    
    # Initialize the ProcureAI system
    print("\n1. Initializing ProcureAI system...")
    procure_system = AustralianGovProcurementSystem(
        openai_api_key=os.environ.get("OPENAI_API_KEY"),
        vision_agent_api_key=os.environ.get("VISION_AGENT_API_KEY"),
        storage_path=os.environ.get("STORAGE_PATH", "./document_storage"),
        government_templates_path=os.environ.get("GOV_TEMPLATES_PATH", "./gov_templates")
    )
    
    # Sample document paths
    sample_proposal = str(Path(__file__).parent / "sample_documents" / "sample_proposal.pdf")
    sample_contract = str(Path(__file__).parent / "sample_documents" / "sample_contract.pdf")
    
    # Check if sample documents exist
    if not os.path.exists(sample_proposal):
        print(f"Sample proposal not found at {sample_proposal}")
        print("Please add sample documents to the examples/sample_documents directory")
        return
    
    # Create a thread for interaction
    thread = procure_system.create_thread()
    print(f"Thread created with ID: {thread.id}")
    
    # Step 1: Upload a procurement document
    print("\n2. Uploading sample proposal document...")
    run, response = procure_system.ask_agent(
        thread.id,
        f"Upload document {sample_proposal} from vendor 'TechSolutions Australia'"
    )
    print(f"Response: {response}")
    
    # Extract file_id from the response
    import re
    file_id_match = re.search(r"ID (\w+-\w+-\w+-\w+-\w+)", response)
    if not file_id_match:
        print("Failed to extract file ID from response")
        return
    
    file_id = file_id_match.group(1)
    print(f"File ID: {file_id}")
    
    # Step 2: Classify the document
    print("\n3. Classifying the document...")
    run, response = procure_system.ask_agent(
        thread.id,
        f"Classify document with ID {file_id}"
    )
    print(f"Classification result: {response}")
    
    # Step 3: Extract key information
    print("\n4. Extracting key information...")
    run, response = procure_system.ask_agent(
        thread.id,
        f"Extract key information from document with ID {file_id}"
    )
    print(f"Extraction result: {response}")
    
    # Step 4: Summarize the document
    print("\n5. Summarizing the document...")
    run, response = procure_system.ask_agent(
        thread.id,
        f"Summarize document with ID {file_id} with maximum length 200 words"
    )
    print(f"Summary: {response}")
    
    # Step 5: Assess the document's risk level
    print("\n6. Assessing risk level...")
    run, response = procure_system.ask_agent(
        thread.id,
        f"Assess the risk level of document with ID {file_id}"
    )
    print(f"Risk assessment: {response}")
    
    # Step 6: Get document dashboard statistics
    print("\n7. Retrieving dashboard statistics...")
    dashboard = procure_system.get_document_dashboard()
    if dashboard["success"]:
        print(f"Total documents: {dashboard['dashboard']['total_documents']}")
        print(f"Document types: {dashboard['dashboard']['document_types']}")
        print(f"Risk levels: {dashboard['dashboard']['risk_levels']}")
    else:
        print(f"Error: {dashboard['message']}")
    
    print("\n=== Sample Use Case Completed ===")

if __name__ == "__main__":
    main()
