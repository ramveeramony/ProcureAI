/**
 * API module for fetching dashboard data
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Fetch statistics about contract review
 * @returns {Promise} Promise that resolves to contract statistics
 */
export const fetchContractStats = async () => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/api/contracts/stats`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      reviewedCount: 24,
      reviewedChange: 15.2,
      pendingCount: 7,
      pendingChange: -5.3,
      highRiskCount: 3,
      highRiskChange: -12.5,
      timeSaved: 14
    };
  } catch (error) {
    console.error('Error fetching contract stats:', error);
    throw error;
  }
};

/**
 * Fetch statistics about procurement processing
 * @returns {Promise} Promise that resolves to procurement statistics
 */
export const fetchProcurementStats = async () => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/api/procurement/stats`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      documentCount: 18,
      documentChange: 22.5,
      processedCount: 15,
      processedChange: 30.0,
      pendingCount: 3,
      pendingChange: -10.5,
      timeSaved: 8
    };
  } catch (error) {
    console.error('Error fetching procurement stats:', error);
    throw error;
  }
};

/**
 * Fetch recent activity for the dashboard
 * @returns {Promise} Promise that resolves to recent activity data
 */
export const fetchRecentActivity = async () => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${API_BASE_URL}/api/activity/recent`);
    // return response.data;
    
    // For demo purposes, return mock data
    return [
      {
        type: 'contract',
        title: 'Service Agreement reviewed',
        timestamp: '10 minutes ago',
        status: 'completed'
      },
      {
        type: 'upload',
        title: 'Procurement document uploaded',
        timestamp: '25 minutes ago',
        status: 'in_progress'
      },
      {
        type: 'playbook',
        title: 'NDA playbook updated',
        timestamp: '1 hour ago',
        status: 'completed'
      },
      {
        type: 'contract',
        title: 'Vendor agreement flagged',
        timestamp: '2 hours ago',
        status: 'high_risk'
      },
      {
        type: 'report',
        title: 'Monthly report generated',
        timestamp: 'Yesterday',
        status: 'completed'
      }
    ];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
};