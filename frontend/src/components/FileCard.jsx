import React, { useState, useEffect, useRef } from "react";
import { Icons } from "../utils/icons";

export default function FileCard({
  file,
  onPreview,
  onRename,
  onDelete,
  baseUrl,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(
    file.displayName || file.filename
  );
  const url = file.url || `${baseUrl}/images/${file.filename}`;
  const renamingRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setRenameValue(file.displayName || file.filename);
  }, [file.displayName, file.filename]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleRenameSubmit = async () => {
    if (renameValue && renameValue !== (file.displayName || file.filename)) {
      await onRename(file, renameValue);
    }
    setRenaming(false);
    setMenuOpen(false);
  };

  return (
    <div
      className="relative p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors duration-150"
      onClick={(e) => {
        if (renamingRef.current && renamingRef.current.contains(e.target)) {
          return;
        }
        onPreview(url, file);
      }}
    >
      <div className="relative w-full h-36 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={url}
          alt={file.displayName || file.originalname || file.filename}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 text-center">
        {renaming ? (
          <div
            ref={renamingRef}
            className="flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") {
                  setRenaming(false);
                  setRenameValue(file.displayName || file.filename);
                }
              }}
              className="w-full px-2 py-1.5 border border-blue-500 rounded-md text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-center gap-2 text-sm">
              <button
                onClick={handleRenameSubmit}
                className="px-2 py-1.5 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5 transition-colors"
              >
                <span>{Icons.CHECK}</span>
                Rename
              </button>
              <button
                onClick={() => {
                  setRenaming(false);
                  setRenameValue(file.displayName || file.filename);
                }}
                className="px-2 py-1.5 bg-gray-600 cursor-pointer text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center gap-1.5 transition-colors"
              >
                <span>{Icons.CLOSE}</span>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-grow min-w-0">
              <span className="text-sm truncate text-gray-300 flex-shrink">
                {file.displayName || file.filename}
              </span>
            </div>
            <div className="relative z-50" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-1.5 cursor-pointer rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {Icons.MENU}
              </button>
              {menuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-xl z-50 text-sm min-w-max">
                  <button
                    className="w-full cursor-pointer text-left px-4 py-2 flex items-center gap-3 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      setRenaming(true);
                    }}
                  >
                    <span>{Icons.EDIT}</span>
                    Rename
                  </button>
                  <button
                    className="w-full cursor-pointer text-left px-4 py-2 flex items-center gap-3 hover:bg-red-900 text-red-400 hover:text-red-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onDelete(file);
                    }}
                  >
                    <span>{Icons.DELETE}</span>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
