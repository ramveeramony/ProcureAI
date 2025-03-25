import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Check, 
  Upload, 
  Search, 
  Download, 
  PieChart, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  File, 
  MessageSquare 
} from 'lucide-react';

// Dummy data - replace with actual API calls 
import { fetchContractStats, fetchProcurementStats, fetchRecentActivity } from '../../api/dashboardAPI';

const Dashboard = () => {
  const [contractStats, setContractStats] = useState(null);
  const [procurementStats, setProcurementStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // These would be actual API calls in production
        const contractData = await fetchContractStats();
        const procurementData = await fetchProcurementStats();
        const activityData = await fetchRecentActivity();
        
        setContractStats(contractData);
        setProcurementStats(procurementData);
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Integrated Procurement & Contract AI Platform</h1>
        <p className="text-gray-600">Streamline your procurement and contract review processes with AI-powered automation</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Contracts Reviewed" 
          value={contractStats.reviewedCount} 
          change={contractStats.reviewedChange}
          icon={<FileText className="text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <StatCard 
          title="High Risk Items" 
          value={contractStats.highRiskCount} 
          change={contractStats.highRiskChange}
          icon={<AlertTriangle className="text-red-600" />}
          iconBg="bg-red-100"
        />
        <StatCard 
          title="Procurement Documents" 
          value={procurementStats.documentCount} 
          change={procurementStats.documentChange}
          icon={<File className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
        <StatCard 
          title="Time Saved (hrs)" 
          value={contractStats.timeSaved + procurementStats.timeSaved} 
          change={10.5}
          icon={<Clock className="text-green-600" />}
          iconBg="bg-green-100"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <ActivityItem 
                key={index}
                type={activity.type}
                title={activity.title}
                timestamp={activity.timestamp}
                status={activity.status}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link to="/reports" className="text-green-800 hover:underline flex items-center">
              View all activity <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Integration Center */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contract Review */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FileText size={24} className="text-green-800" />
              </div>
              <h3 className="text-lg font-semibold">Contract Review</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered contract review and analysis with risk assessment and clause standardization.
            </p>
            <div className="space-y-2">
              <QuickAction 
                label="Upload new contract" 
                icon={<Upload size={16} />} 
                link="/contracts" 
              />
              <QuickAction 
                label="View playbooks" 
                icon={<Check size={16} />} 
                link="/playbooks" 
              />
              <QuickAction 
                label="Generate reports" 
                icon={<Download size={16} />} 
                link="/reports" 
              />
            </div>
          </div>

          {/* Procurement Processing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <PieChart size={24} className="text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold">Procurement Processing</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Intelligent document processing for Australian Government procurement with compliance checking.
            </p>
            <div className="space-y-2">
              <QuickAction 
                label="Upload procurement documents" 
                icon={<Upload size={16} />} 
                link="/procurement/upload" 
              />
              <QuickAction 
                label="Process documents" 
                icon={<FileText size={16} />} 
                link="/procurement/process" 
              />
              <QuickAction 
                label="Search document repository" 
                icon={<Search size={16} />} 
                link="/procurement/search" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FeatureCard 
          title="AI Assistant" 
          description="Ask questions about contracts or procurement documents using natural language."
          icon={<MessageSquare size={20} className="text-green-800" />}
          actionText="Talk to Assistant"
          actionLink="/assistant"
        />
        <FeatureCard 
          title="Template Library" 
          description="Access Australian Government standard contract templates and procurement forms."
          icon={<File size={20} className="text-green-800" />}
          actionText="Browse Templates"
          actionLink="/templates"
        />
        <FeatureCard 
          title="Risk Analysis" 
          description="Identify high-risk clauses and provisions in contracts and procurement documents."
          icon={<AlertTriangle size={20} className="text-green-800" />}
          actionText="Analyze Risks"
          actionLink="/risk-analysis"
        />
      </div>

      {/* Workflow Integration Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Integrated Workflows</h3>
        <p className="text-gray-600 mb-6">
          Our system combines contract review and procurement processes into seamless workflows that reduce manual effort and improve compliance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <WorkflowStep 
            number="1" 
            title="Document Upload" 
            description="Upload contracts and procurement documents for processing"
          />
          <WorkflowStep 
            number="2" 
            title="AI Analysis" 
            description="Automated analysis with benchmarking against standards"
          />
          <WorkflowStep 
            number="3" 
            title="Review & Approval" 
            description="Streamlined approval workflow with role-based permissions"
          />
          <WorkflowStep 
            number="4" 
            title="Reporting & Storage" 
            description="Secure storage with comprehensive search and reporting"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, change, icon, iconBg }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${iconBg}`}>
        {icon}
      </div>
    </div>
    <div className="mt-2">
      <span className={`text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </span>
    </div>
  </div>
);

const ActivityItem = ({ type, title, timestamp, status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
      case 'high_risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'contract':
        return <FileText size={20} className="text-blue-600" />;
      case 'playbook':
        return <Check size={20} className="text-green-600" />;
      case 'upload':
        return <Upload size={20} className="text-purple-600" />;
      case 'report':
        return <Download size={20} className="text-orange-600" />;
      default:
        return <File size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="flex items-start">
      <div className={`bg-${type === 'contract' ? 'blue' : type === 'playbook' ? 'green' : type === 'upload' ? 'purple' : 'orange'}-100 p-2 rounded mr-4`}>
        {getIcon(type)}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500 mr-2">{timestamp}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(status)}`}>
            {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ label, icon, link }) => (
  <Link to={link} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
    <span className="flex items-center">
      <span className="mr-2">{icon}</span>
      {label}
    </span>
    <ChevronRight size={16} />
  </Link>
);

const FeatureCard = ({ title, description, icon, actionText, actionLink }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center mb-4">
      <div className="bg-green-50 p-2 rounded-full mr-3">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">
      {description}
    </p>
    <Link to={actionLink} className="text-green-800 hover:underline flex items-center font-medium">
      {actionText} <ChevronRight size={16} className="ml-1" />
    </Link>
  </div>
);

const WorkflowStep = ({ number, title, description }) => (
  <div className="relative">
    <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-bold">
      {number}
    </div>
    <h4 className="mt-3 font-medium">{title}</h4>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

export default Dashboard;