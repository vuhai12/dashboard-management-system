import createError from "http-errors";

export const badRequest = (message = "Bad request", res) => {
  const error = createError.BadRequest(message);

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const internalServerError = (res) => {
  const error = createError.InternalServerError();

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const notFound = (req, res) => {
  const error = createError.NotFound("This route is not defined");

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const notAuthorized = (message = "Unauthorized", res) => {
  const error = createError.Unauthorized(message);

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};
