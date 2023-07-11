const baseURL = "http://v2004009.hosted-by-vdsina.ru";
// const baseURL = "http://localhost:8080";
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
