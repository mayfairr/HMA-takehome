import { Method } from "axios";

export interface Endpoint {
  url: string;
  method: Method;
}

export const BASE_URL = "https://api.nasa.gov";
export const API_URL = `${BASE_URL}/planetary`;

export const PICTURES: Endpoint = { url: `${API_URL}/apod?api_key=#0&count=#1`, method: "GET" };
