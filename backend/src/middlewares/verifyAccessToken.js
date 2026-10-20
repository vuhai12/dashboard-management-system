import jwt from "jsonwebtoken";
import { notAuthorized } from "./handleErrors.js";

export const verifyAccessToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const { TokenExpiredError } = jwt;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return notAuthorized("Require authorization", res);
  }

  const accessToken = authorization.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return notAuthorized("Access token expired", res);
      }

      return notAuthorized("Access token invalid", res);
    }

    req.user = user;
    next();
  });
};
