# ProcureAI Setup Guide

This guide provides step-by-step instructions for setting up and running the ProcureAI system on your local machine or server.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8 or higher
- Node.js 14 or higher (for the UI)
- npm or yarn (for the UI)
- Git

You will also need API keys for:
- OpenAI API
- Vision Agent API

## Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ramveeramony/ProcureAI.git
   cd ProcureAI
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```

5. Edit the `.env` file with your API keys and configuration:
   ```
   OPENAI_API_KEY=your_openai_api_key
   VISION_AGENT_API_KEY=your_vision_agent_api_key
   ```

6. Create the necessary directories for document storage:
   ```bash
   mkdir -p document_storage
   mkdir -p gov_templates/standard_contracts
   mkdir -p gov_templates/procurement_forms
   ```

7. Start the API server:
   ```bash
   cd src
   python api.py
   ```
   
   The API server will be available at `http://localhost:8000`. You can access the API documentation at `http://localhost:8000/docs`.

## Frontend Setup

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Install the required Node.js dependencies:
   ```bash
   npm install
   # or if you're using yarn
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or if you're using yarn
   yarn start
   ```

   The UI will be available at `http://localhost:3000`.

## Sample Document Integration

To test the system with sample procurement documents:

1. Add some sample documents to the `gov_templates` directory:
   - Download standard Australian Government contract templates
   - Save them to `gov_templates/standard_contracts/`

2. Test the system by uploading a sample document through the UI or API:
   - API: `POST http://localhost:8000/documents/upload`
   - UI: Go to `http://localhost:3000` and use the upload interface

## Configuration Options

### Security and Access Control

For production deployments, you should configure proper authentication:

1. Edit the mock user database in `src/api.py` or connect to a real authentication system
2. Configure CORS settings to restrict access to trusted domains
3. Set up proper password hashing for user credentials

### Document Storage

By default, documents are stored in the local filesystem. For production:

1. Configure S3 or equivalent object storage
2. Update the storage paths in the `.env` file
3. Set up automated backups for document metadata

### Integration with Australian Government Systems

To integrate with government systems:

1. Obtain API credentials for AusTender and other required systems
2. Update the integration settings in the `.env` file
3. Configure SSO with myGovID or Azure AD for authentication

## Troubleshooting

### API Connection Issues

If you encounter issues connecting to the API:

1. Check that the API server is running
2. Verify your API keys in the `.env` file
3. Check for any firewall or network restrictions

### Document Processing Errors

If documents fail to process correctly:

1. Check the API logs for detailed error messages
2. Verify the document format is supported (PDF, DOCX, etc.)
3. Ensure the document is not password-protected or corrupted

## Next Steps

After setting up the basic system, consider:

1. Customizing the document extraction fields for your specific requirements
2. Adding more Australian Government contract templates to improve comparison accuracy
3. Setting up scheduled tasks for document expiration alerts and dashboard updates

For more detailed information on deployment and configuration, refer to the [Deployment Guide](docs/DEPLOYMENT_GUIDE.md).
