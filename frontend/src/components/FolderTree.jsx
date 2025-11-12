import React, { useState, useMemo, useRef, useEffect } from "react";
import { Icons } from "../utils/icons";

function buildTree(items) {
  const map = new Map();
  items.forEach((it) => map.set(it.id, { ...it, children: [] }));
  const roots = [];
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) parent.children.push(node);
      else roots.push(node);
    } else roots.push(node);
  }
  return roots;
}

const FolderNode = ({
  node,
  onSelect,
  selectedId,
  onStartCreate,
  onRename,
  onDelete,
  depth = 0,
  creatingParentId,
  onSubmitCreate,
  onCancelCreate,
}) => {
  const [open, setOpen] = useState(false); // ⬇ default collapse
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  // Tutup menu saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Fungsi rename
  const handleRenameSubmit = async () => {
    if (renameValue && renameValue !== node.name) {
      await onRename(node, renameValue);
    }
    setRenaming(false);
    setRenameValue(node.name);
    setMenuOpen(false);
  };

  // Auto width untuk input rename
  const adjustWidth = () => {
    if (inputRef.current) {
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.whiteSpace = "pre";
      span.style.font = getComputedStyle(inputRef.current).font;
      span.textContent = renameValue || " ";
      document.body.appendChild(span);
      inputRef.current.style.width = `${span.offsetWidth + 10}px`;
      document.body.removeChild(span);
    }
  };

  useEffect(() => {
    if (renaming) adjustWidth();
  }, [renameValue, renaming]);

  const isSelected = selectedId === node.id;

  const CreateInput = ({ parentId }) => {
    const [value, setValue] = useState("");
    return (
      <div className="p-2">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitCreate(value);
            if (e.key === "Escape") onCancelCreate();
          }}
          placeholder="New folder name"
          className="w-full px-2 py-1.5 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1.5 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5"
            onClick={() => onSubmitCreate(value)}
          >
            <span>{Icons.CHECK}</span> Create
          </button>
          <button
            className="px-3 py-1.5 bg-gray-600 cursor-pointer text-gray-200 rounded-md hover:bg-gray-700 flex items-center gap-1.5"
            onClick={() => onCancelCreate()}
          >
            <span>{Icons.CLOSE}</span> Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="text-sm">
      <div
        className={`flex items-center justify-between px-2 py-1.5 rounded-md transition-colors ${
          isSelected
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-700 text-gray-300 hover:text-white"
        }`}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        {/* Bagian kiri: segitiga + ikon folder + nama */}
        <div
          className="flex items-center gap-2 grow"
          onClick={() => onSelect(node)}
        >
          {/* Ikon segitiga tampil di semua folder */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="p-1 rounded-md hover:bg-gray-600 transition-colors"
          >
            <span className="text-lg leading-none transition-transform duration-200">
              {open ? Icons.CHEVRON_DOWN : Icons.CHEVRON_RIGHT}
            </span>
          </button>

          {/* Ikon folder */}
          <span className="text-lg">
            {isSelected ? Icons.FOLDER_OPEN : Icons.FOLDER}
          </span>

          {/* Input rename auto-width */}
          {renaming ? (
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") {
                  setRenaming(false);
                  setRenameValue(node.name);
                }
              }}
              onBlur={() => {
                setRenaming(false);
                setRenameValue(node.name);
              }}
              className="px-1 py-1 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate">{node.name}</span>
          )}
        </div>

        {/* Menu ⋮ */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 cursor-pointer rounded-md hover:bg-gray-600 text-gray-400 hover:text-gray-200"
          >
            {Icons.MENU}
          </button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10 min-w-max">
              <button
                className="w-full cursor-pointer text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-600 text-gray-300 hover:text-white"
                onClick={() => {
                  setMenuOpen(false);
                  onStartCreate(node);
                }}
              >
                <span>{Icons.PLUS}</span> New Folder
              </button>
              <button
                className="w-full cursor-pointer text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-600 text-gray-300 hover:text-white"
                onClick={() => {
                  setMenuOpen(false);
                  setRenaming(true);
                }}
              >
                <span>{Icons.EDIT}</span> Rename
              </button>
              <button
                className="w-full text-left cursor-pointer px-3 py-2 flex items-center gap-2 hover:bg-red-900 text-red-400 hover:text-red-300"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(node);
                }}
              >
                <span>{Icons.DELETE}</span> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form buat folder baru */}
      {open && creatingParentId === node.id && (
        <div style={{ paddingLeft: `${(depth + 1) * 1.5 + 0.5}rem` }}>
          <CreateInput parentId={node.id} />
        </div>
      )}

      {/* Render anak folder */}
      {open &&
        node.children.map((child) => (
          <FolderNode
            key={child.id}
            node={child}
            onSelect={onSelect}
            selectedId={selectedId}
            onStartCreate={onStartCreate}
            onRename={onRename}
            onDelete={onDelete}
            depth={depth + 1}
            creatingParentId={creatingParentId}
            onSubmitCreate={onSubmitCreate}
            onCancelCreate={onCancelCreate}
          />
        ))}
    </div>
  );
};

export default function FolderTree({
  folders = [],
  selectedId,
  onSelect,
  onStartCreate,
  creatingParentId,
  onSubmitCreate,
  onCancelCreate,
  onRename,
  onDelete,
}) {
  const tree = useMemo(() => buildTree(folders), [folders]);

  const CreateInput = ({ parentId }) => {
    const [value, setValue] = useState("");
    return (
      <div className="p-2">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitCreate(value);
            if (e.key === "Escape") onCancelCreate();
          }}
          placeholder="New folder name"
          className="w-full px-2 py-1.5 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5"
            onClick={() => onSubmitCreate(value)}
          >
            <span>{Icons.CHECK}</span> Create
          </button>
          <button
            className="px-3 py-1.5 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-700 flex items-center gap-1.5"
            onClick={() => onCancelCreate()}
          >
            <span>{Icons.CLOSE}</span> Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 space-y-1">
      {creatingParentId === null && <CreateInput parentId={null} />}
      {tree.map((node) => (
        <FolderNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          selectedId={selectedId}
          onStartCreate={onStartCreate}
          onRename={onRename}
          onDelete={onDelete}
          creatingParentId={creatingParentId}
          onSubmitCreate={onSubmitCreate}
          onCancelCreate={onCancelCreate}
        />
      ))}
    </div>
  );
}
