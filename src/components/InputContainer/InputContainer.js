// InputContainer.js
import React from 'react';

export default function InputContainer({ label, children }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-medium">
          {label}
        </label>
      )}
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
}
