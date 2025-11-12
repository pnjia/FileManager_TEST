import React, { useEffect, useState } from "react";
import { Icons } from "./utils/icons";
import FolderTree from "./components/FolderTree";
import FileGrid from "./components/FileGrid";
import FilePreview from "./components/FilePreview";
import * as folderApi from "./services/folderApi";
import * as fileApi from "./services/fileApi";

function App() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState({ open: false, url: null });
  const [creatingParent, setCreatingParent] = useState(undefined);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [uploadFileObj, setUploadFileObj] = useState(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);
  const [folderMap, setFolderMap] = useState({});

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await folderApi.getFolders();
      setFolders(res || []);

      const map = {};
      (res || []).forEach((folder) => {
        map[folder.id] = folder;
      });
      setFolderMap(map);

      if ((res || []).length > 0 && !selectedFolder) {
        await selectFolder(res[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectFolder = async (folderOrId) => {
    const id = typeof folderOrId === "object" ? folderOrId.id : folderOrId;
    setSelectedFolder(id);
    try {
      const res = await folderApi.getFolderContent(id);
      const currentFolder = res?.folder;
      setFiles(res?.files || []);

      const path = [];
      let current = currentFolder;
      while (current) {
        path.unshift(current);
        current = folderMap[current.parentId] || null;
      }
      setBreadcrumbPath(path);
    } catch (err) {
      console.error(err);
      setFiles([]);
    }
  };

  const startCreateFolder = (parent) => {
    setCreatingParent(parent?.id ?? parent ?? null);
  };

  const cancelCreateFolder = () => setCreatingParent(undefined);

  const submitCreateFolder = async (name) => {
    if (!name) return cancelCreateFolder();
    try {
      await folderApi.createFolder({ name, parentId: creatingParent });
      await fetchFolders();
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal Membuat Folder");
    } finally {
      setCreatingParent(undefined);
    }
  };

  const handleRenameFolder = async (folder, newName) => {
    try {
      await folderApi.renameFolder(folder.id, { name: newName });
      await fetchFolders();
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal mengganti nama folder");
    }
  };

  const handleDeleteFolder = async (folder) => {
    if (!confirm(`Delete folder "${folder.name}"?`)) return;
    try {
      await folderApi.deleteFolder(folder.id);
      await fetchFolders();
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal Menghapus folder");
    }
  };

  const handleFileUpload = async (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("folderId", selectedFolder);
    try {
      await fileApi.uploadFile(form);
      if (selectedFolder) await selectFolder(selectedFolder);
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal mengupload gambar");
    }
  };

  const handleFilePreview = (url) => setPreview({ open: true, url });
  const closePreview = () => setPreview({ open: false, url: null });

  const handleDeleteFile = async (file) => {
    if (!confirm(`Delete file "${file.displayName || file.filename}"?`)) return;
    try {
      await fileApi.deleteFile(file.id);
      if (selectedFolder) await selectFolder(selectedFolder);
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal menghapus gambar");
    }
  };

  const handleRenameFile = async (file, newName) => {
    try {
      await fileApi.renameFile(file.id, { name: newName });
      if (selectedFolder) await selectFolder(selectedFolder);
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal Mengganti Nama Gambar");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col font-sans">
      {/* Top Toolbar */}
      <div className="shrink-0 bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between gap-4 min-h-20 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{Icons.FOLDER_OPEN}</span>
          <span className="text-xl font-bold">File Manager</span>
        </div>

        {/* Breadcrumb */}
        {breadcrumbPath.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {breadcrumbPath.map((folder, idx) => (
              <div key={folder.id} className="flex items-center gap-1">
                {idx > 0 && (
                  <span className="text-gray-500 text-xs mx-1">
                    {Icons.CHEVRON_RIGHT}
                  </span>
                )}
                <button
                  onClick={() => selectFolder(folder.id)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm text-gray-300 hover:text-white"
                  title={folder.name}
                >
                  <span className="text-lg">{Icons.FOLDER}</span>
                  <span className="truncate max-w-xs">{folder.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            title="Upload file"
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-blue-400"
            onClick={() => setShowUploadPanel((s) => !s)}
          >
            <span className="text-2xl">{Icons.UPLOAD}</span>
          </button>
          <button
            title="Refresh"
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-blue-400"
            onClick={() => fetchFolders()}
          >
            <span className="text-2xl">{Icons.SYNC}</span>
          </button>
        </div>
      </div>

      {/* Upload Panel */}
      {showUploadPanel && (
        <div className="shrink-0 bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <label className="text-white font-medium flex items-center gap-2 shrink-0">
              <span className="text-2xl">{Icons.UPLOAD}</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              onChange={(e) => setUploadFileObj(e.target.files?.[0] ?? null)}
            />
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shrink-0"
              onClick={async () => {
                if (!uploadFileObj)
                  return alert("Pilih Gamber Terlebih Dahulu");
                const form = new FormData();
                form.append("file", uploadFileObj);
                form.append("folderId", selectedFolder);
                try {
                  await fileApi.uploadFile(form);
                  if (selectedFolder) await selectFolder(selectedFolder);
                  setUploadFileObj(null);
                  setShowUploadPanel(false);
                } catch (err) {
                  console.error(err);
                  alert(err.message || "Gagal Mengupload Gambar");
                }
              }}
            >
              <span>{Icons.CHECK}</span>
              Upload
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shrink-0"
              onClick={() => setShowUploadPanel(false)}
            >
              <span>{Icons.CLOSE}</span>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Folders */}
        <aside className="w-80 bg-gray-800 border-r border-gray-700 shrink-0 overflow-y-auto">
          <div className="bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-4 py-3 flex items-center gap-2 shrink-0">
            <span className="text-2xl">{Icons.FOLDER}</span>
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex-1">
              Folders
            </h2>
            <button
              className="px-3 py-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition-colors"
              onClick={() => startCreateFolder(null)}
              title="Add new root folder"
            >
              <span className="text-lg">{Icons.PLUS}</span>
              New
            </button>
          </div>
          <FolderTree
            folders={folders}
            selectedId={selectedFolder}
            onSelect={selectFolder}
            onStartCreate={startCreateFolder}
            creatingParentId={creatingParent}
            onSubmitCreate={submitCreateFolder}
            onCancelCreate={cancelCreateFolder}
            onRename={handleRenameFolder}
            onDelete={handleDeleteFolder}
          />
        </aside>

        {/* Right Panel - Files */}
        <main className="flex-1 bg-gray-900 flex flex-col overflow-hidden">
          <div className="bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-3 flex items-center gap-2 shrink-0">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest">
              {files.length} Gambar
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <FileGrid
              files={files}
              onPreview={handleFilePreview}
              onDelete={handleDeleteFile}
              onRename={handleRenameFile}
              baseUrl={baseUrl}
            />
          </div>
        </main>
      </div>

      {/* File Preview */}
      <FilePreview
        open={preview.open}
        url={preview.url}
        onClose={closePreview}
      />
    </div>
  );
}

export default App;
