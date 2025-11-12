import React from "react";
import FileCard from "./FileCard";

export default function FileGrid({
  files = [],
  onPreview,
  onRename,
  onDelete,
  baseUrl,
}) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((f) => (
          <FileCard
            key={f.id}
            file={f}
            onPreview={onPreview}
            onRename={onRename}
            onDelete={onDelete}
            baseUrl={baseUrl}
          />
        ))}
      </div>
    </div>
  );
}
