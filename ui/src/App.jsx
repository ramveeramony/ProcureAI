import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  useNavigate,
  Navigate
} from 'react-router-dom';
import { 
  Bell, 
  Upload, 
  FileText, 
  Search, 
  Check, 
  File, 
  Settings, 
  Download, 
  MessageSquare, 
  Slack, 
  Mail, 
  UserCheck,
  PieChart,
  UserPlus,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Authentication Components
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Main Dashboard Components
import Dashboard from './components/dashboard/Dashboard';
import Contracts from './components/contracts/Contracts';
import ContractDetail from './components/contracts/ContractDetail';
import Playbooks from './components/playbooks/Playbooks';
import SearchView from './components/search/SearchView';
import Reports from './components/reports/Reports';

// Procurement Components
import ProcurementDashboard from './components/procurement/ProcurementDashboard';
import DocumentUpload from './components/procurement/DocumentUpload';
import DocumentProcess from './components/procurement/DocumentProcess';
import DocumentSearch from './components/procurement/DocumentSearch';
import DocumentDetail from './components/procurement/DocumentDetail';

// Settings Components
import Settings from './components/settings/Settings';
import UserProfile from './components/settings/UserProfile';
import Integrations from './components/settings/Integrations';
import Approvals from './components/settings/Approvals';

// Context for Auth
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// App Content with Protected Routes
function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {isAuthenticated && (
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          logout={logout}
        />
      )}
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <Sidebar 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
        
        <main className={`flex-1 ${isAuthenticated ? 'p-6' : 'p-0'}`}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
            
            {/* Main Routes - Protected */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Contract Review Routes */}
            <Route path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
            <Route path="/contracts/:id" element={<ProtectedRoute><ContractDetail /></ProtectedRoute>} />
            <Route path="/playbooks" element={<ProtectedRoute><Playbooks /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchView /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            
            {/* Procurement Routes */}
            <Route path="/procurement" element={<ProtectedRoute><ProcurementDashboard /></ProtectedRoute>} />
            <Route path="/procurement/upload" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
            <Route path="/procurement/process" element={<ProtectedRoute><DocumentProcess /></ProtectedRoute>} />
            <Route path="/procurement/search" element={<ProtectedRoute><DocumentSearch /></ProtectedRoute>} />
            <Route path="/procurement/documents/:id" element={<ProtectedRoute><DocumentDetail /></ProtectedRoute>} />
            
            {/* Settings Routes */}
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/settings/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/settings/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
            <Route path="/settings/approvals" element={<ProtectedRoute><Approvals /></ProtectedRoute>} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Header Component
function Header({ mobileMenuOpen, setMobileMenuOpen, logout }) {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-green-800">ProcureContractAI</Link>
          <div className="w-2 h-2 rounded-full bg-green-500 ml-1 mt-1"></div>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-green-800">Dashboard</Link>
          <Link to="/contracts" className="font-medium text-gray-600 hover:text-green-800">Contracts</Link>
          <Link to="/procurement" className="font-medium text-gray-600 hover:text-green-800">Procurement</Link>
          <Link to="/reports" className="font-medium text-gray-600 hover:text-green-800">Reports</Link>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">
            <span className="text-sm font-semibold">JD</span>
          </div>
          <button onClick={logout} className="text-gray-600 hover:text-gray-900">
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      <button 
        className="md:hidden text-gray-600"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}

// Sidebar Component
function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('contracts');
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const handleNavigation = (section, item, path) => {
    setActiveSection(section);
    setActiveItem(item);
    navigate(path);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  const sidebarClass = `
    ${mobileMenuOpen ? 'fixed inset-0 z-40 block w-full bg-white' : 'hidden md:flex'}
    flex-col w-64 bg-white border-r border-gray-200 p-4
  `;
  
  return (
    <aside className={sidebarClass}>
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-500 mb-2">CONTRACT REVIEW</div>
        <ul>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'dashboard' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('contracts', 'dashboard', '/')}
          >
            <PieChart size={18} className="mr-2" /> Dashboard
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'contracts' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('contracts', 'contracts', '/contracts')}
          >
            <File size={18} className="mr-2" /> Contracts
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'playbooks' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('contracts', 'playbooks', '/playbooks')}
          >
            <Check size={18} className="mr-2" /> Playbooks
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'contractSearch' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('contracts', 'contractSearch', '/search')}
          >
            <Search size={18} className="mr-2" /> Search
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'reports' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('contracts', 'reports', '/reports')}
          >
            <Download size={18} className="mr-2" /> Reports
          </li>
        </ul>
      </div>
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-500 mb-2">PROCUREMENT</div>
        <ul>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'procurementDashboard' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('procurement', 'procurementDashboard', '/procurement')}
          >
            <PieChart size={18} className="mr-2" /> Dashboard
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'documentUpload' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('procurement', 'documentUpload', '/procurement/upload')}
          >
            <Upload size={18} className="mr-2" /> Upload Documents
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'documentProcess' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('procurement', 'documentProcess', '/procurement/process')}
          >
            <FileText size={18} className="mr-2" /> Process Documents
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'documentSearch' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('procurement', 'documentSearch', '/procurement/search')}
          >
            <Search size={18} className="mr-2" /> Search Documents
          </li>
        </ul>
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-500 mb-2">SETTINGS</div>
        <ul>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'settings' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('settings', 'settings', '/settings')}
          >
            <Settings size={18} className="mr-2" /> Configuration
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'integrations' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('settings', 'integrations', '/settings/integrations')}
          >
            <Slack size={18} className="mr-2" /> Integrations
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeItem === 'approvals' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleNavigation('settings', 'approvals', '/settings/approvals')}
          >
            <UserCheck size={18} className="mr-2" /> Approvals
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default App;