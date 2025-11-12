import api from "../api";

const unwrap = (r) =>
  r.data && r.data.data !== undefined ? r.data.data : r.data;

export const getFolders = () => api.get("/api/folders").then(unwrap);
export const getFolderContent = (id) =>
  api.get(`/api/folders/${id}`).then(unwrap);
export const createFolder = (payload) =>
  api.post("/api/folders", payload).then(unwrap);
export const renameFolder = (id, payload) =>
  api.put(`/api/folders/${id}`, payload).then(unwrap);
export const deleteFolder = (id) =>
  api.delete(`/api/folders/${id}`).then(unwrap);
