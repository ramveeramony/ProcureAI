import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import API service (to be implemented)
import { uploadDocument } from '../../api/procurementAPI';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  // Document types commonly used in procurement
  const documentTypes = [
    { value: 'tender', label: 'Tender Document' },
    { value: 'rfp', label: 'Request for Proposal' },
    { value: 'rfq', label: 'Request for Quotation' },
    { value: 'proposal', label: 'Supplier Proposal' },
    { value: 'contract', label: 'Contract' },
    { value: 'statement_of_work', label: 'Statement of Work' },
    { value: 'invoice', label: 'Invoice' },
    { value: 'purchase_order', label: 'Purchase Order' },
    { value: 'quotation', label: 'Quotation' },
    { value: 'other', label: 'Other' }
  ];

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Process the files
  const handleFiles = (fileList) => {
    const newFiles = [...files];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Check if file already exists in the list
      const fileExists = newFiles.some(f => f.name === file.name && f.size === file.size);
      if (!fileExists) {
        newFiles.push(file);
      }
    }
    
    setFiles(newFiles);
  };

  // Remove a file from the list
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setUploadStatus({
        success: false,
        error: true,
        message: 'Please select at least one file to upload'
      });
      return;
    }

    setUploading(true);
    setUploadStatus({
      success: false,
      error: false,
      message: ''
    });

    try {
      // Upload each file
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', documentType);
        formData.append('vendor_name', vendorName);
        
        return uploadDocument(formData);
      });
      
      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);
      
      // Check if all uploads were successful
      const allSuccessful = results.every(result => result.success);
      
      // Set status based on results
      if (allSuccessful) {
        setUploadStatus({
          success: true,
          error: false,
          message: 'All documents uploaded successfully!'
        });
        
        // Reset form after successful upload
        setTimeout(() => {
          setFiles([]);
          setDocumentType('');
          setVendorName('');
          // Navigate to process page after short delay
          navigate('/procurement/process');
        }, 2000);
      } else {
        // Collect error messages
        const errorMessages = results
          .filter(result => !result.success)
          .map(result => result.message)
          .join(', ');
        
        setUploadStatus({
          success: false,
          error: true,
          message: `Some uploads failed: ${errorMessages}`
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        success: false,
        error: true,
        message: 'An error occurred during upload. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  // Calculate total file size
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  const formattedTotalSize = formatFileSize(totalSize);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload Procurement Documents</h1>
        <p className="text-gray-600">Upload documents for AI-powered analysis and processing</p>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Document Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a document type</option>
                  {documentTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name (if applicable)</label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter vendor name"
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mb-6 ${
                dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
              
              <Upload size={36} className="text-gray-400 mb-2" />
              <p className="text-lg font-medium mb-1">Drag and drop files here</p>
              <p className="text-gray-500 mb-3">or</p>
              <button
                type="button"
                onClick={handleUploadClick}
                className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
              >
                Browse Files
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, Word, Excel, PowerPoint, and text files
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Selected Files ({files.length})</h3>
                  <span className="text-sm text-gray-500">Total: {formattedTotalSize}</span>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {files.map((file, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <FileText size={18} className="text-gray-400 mr-2" />
                              {file.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {file.type || getFileExtension(file.name)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Status Message */}
            {(uploadStatus.success || uploadStatus.error) && (
              <div className={`p-4 mb-6 rounded-lg ${
                uploadStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className="flex items-center">
                  {uploadStatus.success ? (
                    <CheckCircle size={20} className="mr-2" />
                  ) : (
                    <AlertCircle size={20} className="mr-2" />
                  )}
                  <span>{uploadStatus.message}</span>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading || files.length === 0}
                className={`px-6 py-2 ${
                  uploading || files.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-800 hover:bg-green-900'
                } text-white rounded flex items-center`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>Upload Documents</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Additional Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Document Processing Workflow</h3>
          <p className="text-gray-600 mb-4">
            After uploading, your documents will be processed through the following steps:
          </p>
          <ol className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">1</span>
              <span>Document classification and validation</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">2</span>
              <span>Information extraction and metadata tagging</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">3</span>
              <span>Risk assessment and compliance checking</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">4</span>
              <span>Integration with contract review system for comprehensive analysis</span>
            </li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Supported File Types</h3>
          <p className="text-gray-600 mb-4">
            Our system supports the following document formats:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <div className="bg-red-100 p-1 rounded mr-2">
                <FileText size={16} className="text-red-600" />
              </div>
              <span className="text-gray-600">PDF (.pdf)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-1 rounded mr-2">
                <FileText size={16} className="text-blue-600" />
              </div>
              <span className="text-gray-600">Word (.doc, .docx)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-1 rounded mr-2">
                <FileText size={16} className="text-green-600" />
              </div>
              <span className="text-gray-600">Excel (.xls, .xlsx)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-orange-100 p-1 rounded mr-2">
                <FileText size={16} className="text-orange-600" />
              </div>
              <span className="text-gray-600">PowerPoint (.ppt, .pptx)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded mr-2">
                <FileText size={16} className="text-gray-600" />
              </div>
              <span className="text-gray-600">Text (.txt)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileExtension(filename) {
  return filename.split('.').pop().toUpperCase();
}

export default DocumentUpload;