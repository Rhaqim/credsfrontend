import React from 'react';

interface CookiePreferencesModalProps {
  onClose: () => void;
}

const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({ onClose }) => {
  const handleSavePreferences = () => {
    // Implement logic to save cookie preferences
    // For now, just close the modal
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Cookie Preferences</h2>
        <p className="mb-4">Customize your cookie settings:</p>
        {/* Add checkboxes or other input elements for managing cookie preferences */}
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSavePreferences}>
            Save Preferences
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
