import api from "../api";
const unwrap = (r) =>
  r.data && r.data.data !== undefined ? r.data.data : r.data;

export const uploadFile = (formData) =>
  api
    .post("/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(unwrap);

export const renameFile = (id, payload) =>
  api.put(`/api/files/rename/${id}`, payload).then(unwrap);
export const deleteFile = (id) => api.delete(`/api/files/${id}`).then(unwrap);
