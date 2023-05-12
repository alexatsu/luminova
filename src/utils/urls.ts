const baseURL = "http://kotatsu.fun:8000/api";
const images = "/images";

export const endpoints = {
  images: {
    getImages: `${baseURL}${images}/all`,
    addImage: `${baseURL}${images}/upload`,
    searchImages: `${baseURL}${images}/search`,
  },
};
