// const baseURL = "http://localhost:8080";
const baseURL = "https://long-lime-caridea-slip.cyclic.app";
const images = `${baseURL}/images`;

const endpoints = {
  images: {
    imagesForNonUser: `${images}/all`,
    imagesForUser: `${images}/allforuser`,
    categoriesImages: `${images}/categories/all-images`,
    categoriesUserImages: `${images}/categories/all-favorites`,
    addToFavorites: `${images}/favorites`,
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
