/**
 * API module for contract review functionality
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Fetch all contracts
 * @param {Object} filters - Optional filters for the contracts
 * @returns {Promise} Promise that resolves to contracts data
 */
export const fetchContracts = async (filters = {}) => {
  try {
    // In a real application, this would be an API call with filters
    // const response = await axios.get(`${API_BASE_URL}/api/contracts`, { params: filters });
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      contracts: [
        {
          id: 'c001',
          name: 'Service Agreement.docx',
          type: 'Service Agreement',
          status: 'In Review',
          riskLevel: 'High',
          lastUpdated: '2025-03-24T10:30:00Z'
        },
        {
          id: 'c002',
          name: 'Master Services Agreement.docx',
          type: 'MSA',
          status: 'Approved',
          riskLevel: 'Low',
          lastUpdated: '2025-03-22T14:15:00Z'
        },
        {
          id: 'c003',
          name: 'Vendor Agreement - TechSupplier.docx',
          type: 'Vendor Agreement',
          status: 'Draft',
          riskLevel: 'Medium',
          lastUpdated: '2025-03-20T09:45:00Z'
        }
      ],
      totalCount: 3
    };
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};

/**
 * Fetch a single contract by ID
 * @param {string} id - Contract ID
 * @returns {Promise} Promise that resolves to contract data
 */
export const fetchContractById = async (id) => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/api/contracts/${id}`);
    // return response.data;
    
    // For demo purposes, return mock data based on ID
    const mockContracts = {
      'c001': {
        id: 'c001',
        name: 'Service Agreement.docx',
        type: 'Service Agreement',
        status: 'In Review',
        riskLevel: 'High',
        lastUpdated: '2025-03-24T10:30:00Z',
        parties: {
          company: 'Your Company',
          counterparty: 'Tech Services Inc.'
        },
        content: 'This is a mock service agreement content...',
        issues: [
          {
            type: 'High Risk',
            description: 'Unlimited liability clause identified',
            clause: 'Section 8.2'
          },
          {
            type: 'Medium Risk',
            description: 'Non-standard payment terms',
            clause: 'Section 5.1'
          }
        ]
      },
      'c002': {
        id: 'c002',
        name: 'Master Services Agreement.docx',
        type: 'MSA',
        status: 'Approved',
        riskLevel: 'Low',
        lastUpdated: '2025-03-22T14:15:00Z',
        parties: {
          company: 'Your Company',
          counterparty: 'Strategic Partner LLC'
        },
        content: 'This is a mock MSA content...',
        issues: []
      },
      'c003': {
        id: 'c003',
        name: 'Vendor Agreement - TechSupplier.docx',
        type: 'Vendor Agreement',
        status: 'Draft',
        riskLevel: 'Medium',
        lastUpdated: '2025-03-20T09:45:00Z',
        parties: {
          company: 'Your Company',
          counterparty: 'TechSupplier Inc.'
        },
        content: 'This is a mock vendor agreement content...',
        issues: [
          {
            type: 'Medium Risk',
            description: 'Unclear termination provisions',
            clause: 'Section 12.3'
          }
        ]
      }
    };
    
    // Return the contract if found, otherwise throw an error
    if (mockContracts[id]) {
      return mockContracts[id];
    } else {
      throw new Error('Contract not found');
    }
  } catch (error) {
    console.error(`Error fetching contract ${id}:`, error);
    throw error;
  }
};

/**
 * Upload a contract for review
 * @param {FormData} formData - Form data containing the contract file and metadata
 * @returns {Promise} Promise that resolves to upload response
 */
export const uploadContract = async (formData) => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.post(`${API_BASE_URL}/api/contracts/upload`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    // return response.data;
    
    // For demo purposes, simulate API response
    return {
      success: true,
      message: 'Contract uploaded successfully',
      contractId: `c${Math.floor(1000 + Math.random() * 9000)}`
    };
  } catch (error) {
    console.error('Error uploading contract:', error);
    throw error;
  }
};