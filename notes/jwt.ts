import express from "express";
import expressJWT from "express-jwt";
import cors from "cors";

// -------------------------------------------------
// Step 00:
// -- Create express app instance
// -------------------------------------------------
const app = express();

// -------------------------------------------------
// Step 01:
// -- Setup middle for validating JWTs
// -- using package "express-jwt"
// -------------------------------------------------
function myJWT() {
  const secretKey = "my-ultimate-secret-key";
  return expressJWT({
    secret: secretKey,
    algorithms: ["HS256"],
    isRevoked: () => {
        // revoke user's toke if user no longer existed
        // ...
    }
  }).unless({
    path: [
      // public routes that don't require authentication
      "/register",
      "/login",
      "/landing-page",
    ],
  });
}
// -------------------------------------------------
// Step 02:
// -- use jwt middleware
// -- use cors for all origin
// -------------------------------------------------
app.use(myJWT());
app.use(cors());
