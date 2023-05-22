// const baseURL = "http://localhost:8080";
// const baseURL = "https://long-lime-caridea-slip.cyclic.app";
const baseURL = "http://kotatsu.fun:8000";
const images = "/images";

const endpoints = {
  images: {
    getImages: `${baseURL}/api/images/all`,
    // getImagesForUser: `${baseURL}/api/images/user_favorites`,
    getImagesForUser: `${baseURL}${images}/allforuser`,
    addImage: `${baseURL}${images}/upload`,
    searchImages: `${baseURL}${images}/search`,
  },
};

// const authURL = "http://localhost:8080/auth";
const authURL = "http://kotatsu.fun:8080/auth";


const authEndpoints = {
  login: `${authURL}/login`,
  register: `${authURL}/register`,
  logout: `${authURL}/logout`,
  protect: `${authURL}/protected`,
  refresh: `${authURL}/refresh`,
};
export { baseURL, endpoints, authEndpoints };
