import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST || "10.0.80.52",
  serverURL: process.env.SERVER_URL || "http://10.0.80.52:3000",
  baseURL: process.env.BASE_URL || "http://10.0.80.52:3000/api/v1",
};

export const BASE_URL = process.env.BASE_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
