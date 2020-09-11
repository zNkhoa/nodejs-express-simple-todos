import express from "express";
import expressJWT from "express-jwt";
import configs from "./configs";
import userService from "../services/users.service";

export function jwt() {
  const secretKey = configs.secretKey;
  return expressJWT({
    secret: secretKey || "",
    algorithms: ["HS256"],
    isRevoked,
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/v1/users/authenticate",
      "/api/v1/users/register",
      "/todos",
      "/todos/*",
    ],
  });
}

async function isRevoked(
  _res: express.Request,
  payload: any,
  done: (err: any, revoked?: boolean) => void
) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done(null);
}
