const baseURL = "http://localhost:8080";
// const baseURL = "https://long-lime-caridea-slip.cyclic.app";
const images = `${baseURL}/images`;

const endpoints = {
  images: {
    forNonUser: `${images}/fornonuser`,
    forUser: `${images}/foruser`,
    updateFavorites: `${images}/updatefavorites`,
    addImage: `${images}/upload`,
    searchImages: `${images}/search`,
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
