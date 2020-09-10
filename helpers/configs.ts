import dotenv from "dotenv";
import path from "path";

const envRootPath = path.resolve(process.cwd(), ".env");
const setEnvironment = () => {
  console.log("Run set environment");
  switch (process.env.NODE_ENV) {
    case "production":
      dotenv.config({ path: `${envRootPath}.production` });
      break;
    case "staging":
      dotenv.config({ path: `${envRootPath}.staging` });
      break;
    default:
      dotenv.config({ path: `${envRootPath}.development` });
  }
};

setEnvironment();

export default {
  env: process.env.NODE_ENV || "",
  dbURI: process.env.DB_CONNECT || "",
  secretKey: process.env.SECRET_KEY || "",
};
