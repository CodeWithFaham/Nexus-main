// src/pages/documents/DocumentChamber.tsx
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const DocumentChamber: React.FC = () => {
  // Signature canvas ka reference
  const signaturePad = useRef<SignatureCanvas>(null);

  // Document ka status track karne ke liye state
  const [documentStatus, setDocumentStatus] = useState('Draft');

  // Sign karne ka function
  const handleSignDocument = () => {
    // Agar signature empty hai, user ko warning do
    if (signaturePad.current?.isEmpty()) {
      alert("Please sign the document first!");
      return;
    }

    // Signature submit ho gaya, status update karo
    setDocumentStatus('Signed');
    alert("Document Signed Successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold">Document Chamber</h2>
      
      {/* PDF Upload Section */}
      <div className="border-2 border-dashed p-10 text-center rounded-lg bg-gray-50">
        <p>Upload your PDF for Review</p>
        <input type="file" className="mt-2" accept=".pdf" />
      </div>

      {/* E-Signature Section */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold mb-2">E-Signature Pad (Draw here)</h3>
        
        {/* Signature Canvas */}
        <div className="border bg-gray-100 rounded">
          <SignatureCanvas
            ref={signaturePad}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </div>

        {/* Buttons for Clear & Sign */}
        <div className="mt-4 space-x-2">
          <button
            onClick={() => signaturePad.current?.clear()}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Clear
          </button>
          <button
            onClick={handleSignDocument}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign & Submit
          </button>
        </div>
      </div>

      {/* Document Status */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded text-sm ${
            documentStatus === 'Signed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          Status: {documentStatus}
        </span>
      </div>
    </div>
  );
};

export default DocumentChamber;
