import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST,
  serverURL: process.env.SERVER_URL ,
  baseURL: process.env.BASE_URL 
};

export const BASE_URL = process.env.BASE_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
