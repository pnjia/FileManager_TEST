export const successResponse = (
  res,
  status = 200,
  message = "Success",
  data
) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (
  res,
  status = 500,
  message = "Terjadi kesalahan pada server",
  error
) => {
  return res.status(status).json({
    status: "error",
    message,
    error,
  });
};
