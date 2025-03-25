# ProcureContractAI Frontend

This directory contains the React-based frontend for the integrated ProcureContractAI platform, which combines contract review capabilities with procurement document processing.

## Overview

ProcureContractAI merges the contract review features with the procurement document processing capabilities of ProcureAI. This creates a comprehensive solution for handling both contract management and procurement workflows in a single, unified platform.

## Features

### Contract Review Features
- AI-powered contract review and redlining
- Customizable playbooks for standardizing contract review
- Risk benchmarking and highlighting of non-market provisions
- Support for both first-party and third-party paper
- One-click report generation (issues lists, memos)
- Microsoft Word integration

### Procurement Features
- Document upload and processing for procurement documents
- Intelligent document classification and extraction
- Risk assessment and compliance checking
- Natural language search across document repository
- Integration with Australian Government procurement standards

### Integrated Capabilities
- Unified dashboard for both contract and procurement workflows
- Shared document repository with AI-powered search
- Comprehensive risk analysis across all documents
- Streamlined approval workflows
- Integration with external systems (Slack, Email)

## Directory Structure

```
ui/src/
├── api/                # API service modules
│   ├── contractAPI.js  # Contract review API services
│   ├── dashboardAPI.js # Dashboard data API services
│   └── procurementAPI.js # Procurement API services
├── components/         # React components
│   ├── auth/           # Authentication components
│   ├── contracts/      # Contract review components
│   ├── dashboard/      # Dashboard components
│   ├── procurement/    # Procurement components
│   ├── reports/        # Reporting components
│   ├── search/         # Search components
│   └── settings/       # Settings components
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main application component
└── index.js            # Application entry point
```

## Setup and Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation
1. Navigate to the `ui` directory:
```bash
cd ui
```

2. Install dependencies:
```bash
npm install
# or with yarn
yarn install
```

3. Create an environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API endpoint:
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

5. Start the development server:
```bash
npm start
# or with yarn
yarn start
```

The application will be available at http://localhost:3000.

## Authentication

For demonstration purposes, the application provides mock authentication with the following credentials:

- Admin user: 
  - Username: `admin`
  - Password: `admin123`

- Regular user:
  - Username: `user`
  - Password: `user123`

In a production environment, this should be replaced with proper authentication mechanisms.

## Backend Integration

This frontend is designed to work with the ProcureAI backend. The API services are configured to use the backend API endpoints from the main ProcureAI system.

## Development

### Adding New Components

1. Create a new component file in the appropriate directory.
2. Export the component as default.
3. Import and use the component where needed.

### API Services

All API calls are centralized in the `api` directory, making it easy to modify endpoints or switch between mock and real API calls.

## Building for Production

To build the application for production:

```bash
npm run build
# or with yarn
yarn build
```

This will create a `build` directory with optimized files ready for deployment.

## Deployment

The built application can be served from the main ProcureAI server or deployed to any static hosting service.

To integrate with the ProcureAI backend, ensure the API endpoint is correctly set in the environment variables or during the build process.

## License

This project is licensed under the Apache 2.0 License.