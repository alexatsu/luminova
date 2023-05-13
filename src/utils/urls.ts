const baseURL = "http://kotatsu.fun:8000/api";
const images = "/images";

const endpoints = {
  images: {
    getImages: `${baseURL}${images}/all`,
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
