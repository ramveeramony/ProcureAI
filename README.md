# ProcureContractAI

An integrated platform that combines intelligent document processing for procurement with AI-powered contract review capabilities.

## Overview

ProcureContractAI enhances the original ProcureAI system by adding comprehensive contract review functionality. This integration creates a unified platform for handling both procurement document processing and contract management within a single system.

## Features

### Core Procurement Features
- Intelligent document processing for Australian Government procurement
- Document classification and extraction
- Risk assessment and compliance checking
- Natural language search across document repository
- Integration with government procurement standards

### Added Contract Review Features
- AI-powered contract review and redlining
- Customizable playbooks for standardizing contract review
- Risk benchmarking and highlighting of non-market provisions
- Support for both first-party and third-party paper
- One-click report generation (issues lists, memos)
- Microsoft Word integration

### Integrated Capabilities
- Unified dashboard for both contract and procurement workflows
- Shared document repository with AI-powered search
- Comprehensive risk analysis across all documents
- Streamlined approval workflows
- Integration with external systems (Slack, Email)

## Repository Structure

```
.
├── src/                # Backend API and server code
│   └── api.py          # FastAPI endpoints for the backend
├── ui/                 # React frontend application
│   ├── src/            # React source code
│   │   ├── api/        # API service modules
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   └── App.jsx     # Main application component
│   ├── package.json    # Frontend dependencies
│   └── README.md       # Frontend documentation
├── document_storage/   # Storage for uploaded documents
├── gov_templates/      # Government contract templates
├── examples/           # Example usage and templates
├── docs/               # Documentation
└── requirements.txt    # Python dependencies
```

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ramveeramony/ProcureAI.git
cd ProcureAI
```

2. Set up the backend:
```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env file with your API keys
```

3. Set up the frontend:
```bash
cd ui
npm install
# or
yarn install
```

4. Start the backend server:
```bash
cd src
python api.py
```

5. Start the frontend:
```bash
cd ui
npm start
# or
yarn start
```

6. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Authentication

For demonstration purposes, the application provides mock authentication with the following credentials:

- Admin user: 
  - Username: `admin`
  - Password: `admin123`

- Regular user:
  - Username: `user`
  - Password: `user123`

In a production environment, this should be replaced with proper authentication mechanisms.

## Deployment

For production deployment, consider:

1. Configuring a production-ready database
2. Setting up proper authentication with OAuth or JWT
3. Enabling HTTPS
4. Configuring CORS settings properly
5. Setting up automated backups for document storage

For detailed deployment instructions, see the [Deployment Guide](docs/DEPLOYMENT_GUIDE.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.

## Acknowledgments

- Based on the original ProcureAI system for Australian Government procurement
- Integrates contract review capabilities inspired by modern legal tech platforms
- Uses OpenAI API for intelligent document processing
