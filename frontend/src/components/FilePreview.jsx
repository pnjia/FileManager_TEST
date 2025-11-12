import React from "react";
import { Icons } from "../utils/icons";

export default function FilePreview({ open, url, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 p-4 rounded-lg shadow-xl max-w-4xl max-h-[80vh] border border-gray-600 flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={url}
          alt="File preview"
          className="object-contain w-full h-full rounded-md"
        />
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <span className="text-lg">{Icons.CLOSE}</span>
        </button>
      </div>
    </div>
  );
}
