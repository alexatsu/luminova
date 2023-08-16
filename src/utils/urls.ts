import { env } from "./env";

const baseURL = env("BASE_URL");
const images = `${baseURL}/images`;
const collections = `${baseURL}/collections`;

const endpoints = {
  images: {
    forNonUser: `${images}/fornonuser`,
    forUser: `${images}/foruser`,
    updateFavorites: `${images}/updatefavorites`,
    searchImages: `${images}/search`,
    upload: `${images}/upload`,
    profile: `${images}/getprofileimages`,
    favorite: `${images}/getfavorites`,
  },
  collections: {
    profile: `${collections}/profile`,
    getCollectionById: `${collections}/openbyid`,
    updateImg: `${collections}/updateimage`,
    create: `${collections}/create`,
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
