import { env } from "./env";

const baseURL = env("BASE_URL");
const images = `${baseURL}/images`;

const endpoints = {
  images: {
    forNonUser: `${images}/fornonuser`,
    forUser: `${images}/foruser`,
    updateFavorites: `${images}/updatefavorites`,
    searchImages: `${images}/search`,
    upload: `${images}/upload`,
    getProfileImages: `${images}/getprofileimages`,
    getFavoriteImages: `${images}/getfavorites`,
  },
};

const auth = `${baseURL}/auth`;

const authEndpoints = {
  login: `${auth}/login`,
  register: `${auth}/register`,
  logout: `${auth}/logout`,
  refresh: `${auth}/refresh`,
};

export { baseURL, endpoints, authEndpoints };
