import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings/express";

export const generateJWT = (req: Request, payload: UserPayload) => {
  const userJWT = jwt.sign(payload, process.env.JWT_SECRET!);

  // store it on the session object
  req.session = {
    jwt: userJWT,
  };

  return userJWT;
};
