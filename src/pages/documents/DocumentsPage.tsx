import React, { useState } from 'react'; // useState add kiya
import { FileText, Upload, Download, Trash2, Share2, Search } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const DocumentsPage: React.FC = () => {
  // 1. Documents ko state mein rakha taaki edit/delete ho sake
  const [docList, setDocList] = useState([
    { id: 1, name: 'Pitch Deck 2024.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2024-02-15', shared: true },
    { id: 2, name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2024-02-10', shared: false },
    { id: 3, name: 'Business Plan.docx', type: 'Document', size: '3.2 MB', lastModified: '2024-02-05', shared: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // 2. Delete Function
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocList(docList.filter(doc => doc.id !== id));
    }
  };

  // 3. Upload Function (Mock)
  const handleUpload = () => {
    const fileName = prompt("Enter file name to upload:");
    if (fileName) {
      const newDoc = {
        id: Date.now(),
        name: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
        type: 'PDF',
        size: '0.5 MB',
        lastModified: new Date().toISOString().split('T')[0],
        shared: false
      };
      setDocList([newDoc, ...docList]);
    }
  };

  // 4. Filter logic for Search
  const filteredDocs = docList.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        
        {/* Upload Button connected to function */}
        <Button onClick={handleUpload} leftIcon={<Upload size={18} />}>
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info (Same as before) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">{(docList.length * 1.2).toFixed(1)} GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Search size={16} />
                </span>
                <input 
                  type="text"
                  placeholder="Search files..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {filteredDocs.length > 0 ? filteredDocs.map(doc => (
                  <div key={doc.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                    <div className="p-2 bg-blue-50 rounded-lg mr-4">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                        {doc.shared && <Badge variant="secondary" size="sm">Shared</Badge>}
                      </div>
                      <div className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.lastModified}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" className="p-2"><Download size={18} /></Button>
                      <Button variant="ghost" size="sm" className="p-2"><Share2 size={18} /></Button>
                      
                      {/* DELETE BUTTON CONNECTED */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 text-gray-500">No documents found.</div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};