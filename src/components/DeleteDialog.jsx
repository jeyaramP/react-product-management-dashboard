 import React from "react";

const DeleteDialog = ({ show, onClose, onConfirm, productTitle }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6 flex flex-col">
          Are you sure you want to delete{" "}
          <span className="font-semibold font-bold">"{productTitle}" ?</span>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
