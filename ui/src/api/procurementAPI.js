/**
 * API module for procurement system functionality
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Upload a document to the procurement system
 * @param {FormData} formData - Form data containing the document file and metadata
 * @returns {Promise} Promise that resolves to upload response
 */
export const uploadDocument = async (formData) => {
  try {
    // In a real application, this would be an API call to the backend
    // const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    // return response.data;
    
    // For demo purposes, simulate API response with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Document uploaded successfully',
      file_id: `doc-${Math.floor(1000 + Math.random() * 9000)}`,
      document_type: formData.get('document_type') || 'unknown'
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * Process a document with a specific operation
 * @param {Object} requestData - Request data containing file_id, process_type, and parameters
 * @returns {Promise} Promise that resolves to process response
 */
export const processDocument = async (requestData) => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.post(`${API_BASE_URL}/documents/process`, requestData);
    // return response.data;
    
    // For demo purposes, simulate API response with delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: 'Document processed successfully',
      file_id: requestData.file_id,
      result: {
        process_type: requestData.process_type,
        response: `AI analysis complete for ${requestData.process_type} operation.`,
        // Additional process-specific data would be here
      }
    };
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
};

/**
 * Search for documents in the procurement system
 * @param {Object} searchParams - Search parameters
 * @returns {Promise} Promise that resolves to search results
 */
export const searchDocuments = async (searchParams) => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.post(`${API_BASE_URL}/documents/search`, searchParams);
    // return response.data;
    
    // For demo purposes, simulate API response with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock search results
    const mockResults = [
      {
        file_id: 'doc-1234',
        name: 'RFP-2025-01-IT-Services.pdf',
        document_type: 'rfp',
        upload_date: '2025-03-15T09:30:00Z',
        vendor_name: 'Government IT Department',
        match_score: 0.95,
        snippet: '...requirements for cloud infrastructure services with emphasis on security compliance...'
      },
      {
        file_id: 'doc-2345',
        name: 'Supplier-Proposal-CloudTech.docx',
        document_type: 'proposal',
        upload_date: '2025-03-18T14:20:00Z',
        vendor_name: 'CloudTech Solutions',
        match_score: 0.87,
        snippet: '...our cloud infrastructure services meet all security requirements specified in section 3.2...'
      },
      {
        file_id: 'doc-3456',
        name: 'Statement-of-Work-DataCenter.pdf',
        document_type: 'statement_of_work',
        upload_date: '2025-03-10T11:15:00Z',
        vendor_name: 'DataCenter Providers Inc.',
        match_score: 0.72,
        snippet: '...infrastructure requirements include security protocols for all access points...'
      }
    ];
    
    return {
      success: true,
      query: searchParams.query,
      results: mockResults,
      result_count: mockResults.length
    };
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

/**
 * Get details for a specific document
 * @param {string} fileId - Document file ID
 * @returns {Promise} Promise that resolves to document details
 */
export const getDocumentDetails = async (fileId) => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/documents/${fileId}`);
    // return response.data;
    
    // For demo purposes, return mock data based on file ID
    const mockDocuments = {
      'doc-1234': {
        file_id: 'doc-1234',
        name: 'RFP-2025-01-IT-Services.pdf',
        document_type: 'rfp',
        upload_date: '2025-03-15T09:30:00Z',
        vendor_name: 'Government IT Department',
        status: 'processed',
        size: 2457600, // in bytes
        pages: 32,
        metadata: {
          title: 'Request for Proposal: IT Infrastructure Services',
          author: 'Procurement Team',
          created_date: '2025-03-12T10:15:00Z',
          modified_date: '2025-03-14T16:20:00Z'
        },
        extracted_data: {
          submission_deadline: '2025-04-15T17:00:00Z',
          budget_range: '$250,000 - $500,000',
          contract_duration: '24 months',
          key_requirements: [
            'Cloud infrastructure services',
            'Security compliance with ISO 27001',
            'Data sovereignty in Australia',
            '99.9% uptime guarantee'
          ]
        },
        risk_assessment: {
          overall_risk: 'low',
          compliance_issues: [],
          notes: 'Standard RFP format with clear requirements'
        }
      },
      'doc-2345': {
        file_id: 'doc-2345',
        name: 'Supplier-Proposal-CloudTech.docx',
        document_type: 'proposal',
        upload_date: '2025-03-18T14:20:00Z',
        vendor_name: 'CloudTech Solutions',
        status: 'processed',
        size: 3682304, // in bytes
        pages: 45,
        metadata: {
          title: 'Proposal for IT Infrastructure Services',
          author: 'CloudTech Solutions',
          created_date: '2025-03-16T09:45:00Z',
          modified_date: '2025-03-18T12:30:00Z'
        },
        extracted_data: {
          total_cost: '$320,000',
          proposed_timeline: '22 months',
          key_offerings: [
            'Scalable cloud infrastructure',
            'ISO 27001, ISO 9001 certified',
            'Australian data centers',
            '99.95% uptime guarantee',
            'Automatic failover services'
          ]
        },
        risk_assessment: {
          overall_risk: 'medium',
          compliance_issues: [
            'Liability cap below standard threshold',
            'Non-standard payment terms (Net-45)'
          ],
          notes: 'Generally compliant but requires negotiation on key terms'
        }
      },
      'doc-3456': {
        file_id: 'doc-3456',
        name: 'Statement-of-Work-DataCenter.pdf',
        document_type: 'statement_of_work',
        upload_date: '2025-03-10T11:15:00Z',
        vendor_name: 'DataCenter Providers Inc.',
        status: 'processed',
        size: 1843200, // in bytes
        pages: 24,
        metadata: {
          title: 'Statement of Work for Data Center Migration',
          author: 'Operations Team',
          created_date: '2025-03-08T14:20:00Z',
          modified_date: '2025-03-10T09:15:00Z'
        },
        extracted_data: {
          project_scope: 'Migration of on-premises servers to cloud infrastructure',
          timeline: '6 months',
          deliverables: [
            'Infrastructure assessment',
            'Migration plan',
            'Execution of migration',
            'Post-migration support'
          ],
          milestones: [
            'Assessment complete: Month 1',
            'Plan approved: Month 2',
            'Test migration: Month 3',
            'Production migration: Months 4-5',
            'Project closure: Month 6'
          ]
        },
        risk_assessment: {
          overall_risk: 'low',
          compliance_issues: [],
          notes: 'Well-defined scope and deliverables'
        }
      }
    };
    
    // Return the document if found, otherwise throw an error
    if (mockDocuments[fileId]) {
      return {
        success: true,
        file_id: fileId,
        metadata: mockDocuments[fileId]
      };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error(`Error fetching document ${fileId}:`, error);
    throw error;
  }
};

/**
 * Get dashboard statistics for the procurement system
 * @returns {Promise} Promise that resolves to dashboard data
 */
export const getProcurementDashboard = async () => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/dashboard`);
    // return response.data;
    
    // For demo purposes, return mock dashboard data
    return {
      success: true,
      dashboard: {
        document_counts: {
          total: 32,
          by_type: {
            rfp: 5,
            proposal: 12,
            contract: 8,
            statement_of_work: 4,
            purchase_order: 3
          },
          by_status: {
            processed: 28,
            pending: 3,
            error: 1
          }
        },
        recent_uploads: [
          {
            file_id: 'doc-4567',
            name: 'Cybersecurity-Services-Contract.docx',
            document_type: 'contract',
            upload_date: '2025-03-23T15:10:00Z',
            status: 'processed'
          },
          {
            file_id: 'doc-5678',
            name: 'Hardware-Procurement-Plan-2025.pdf',
            document_type: 'rfp',
            upload_date: '2025-03-22T10:25:00Z',
            status: 'processed'
          },
          {
            file_id: 'doc-6789',
            name: 'Network-Equipment-Quotation.pdf',
            document_type: 'quotation',
            upload_date: '2025-03-21T14:05:00Z',
            status: 'pending'
          }
        ],
        risk_summary: {
          high_risk: 2,
          medium_risk: 7,
          low_risk: 23
        },
        procurement_timeline: {
          active_rfps: 3,
          closing_this_week: 1,
          closing_next_week: 2
        }
      }
    };
  } catch (error) {
    console.error('Error fetching procurement dashboard:', error);
    throw error;
  }
};