import { env } from "./env";

const baseURL = env("BASE_URL");
const images = `${baseURL}/images`;
const collections = `${baseURL}/collections`;
const user = `${baseURL}/user`;

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
    edit: `${collections}/edit`,
    delete: `${collections}/delete`,
  },
  user: {
    getProfileData: `${user}/getprofiledata`,
    updateProfileData: `${user}/updateprofiledata`,
    changePassword: `${user}/changepassword`,
    closeAccount: `${user}/closeaccount`,
  },
  cdn: {
    cloudinary: `http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996`,
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
