import { handleFetch } from "@/shared/utils";

const urlForNonUser = "http://localhost:8080/search/fornonuser";
const urlForUser = "http://localhost:8080/search/foruser";
const accessToken = localStorage.getItem("accessToken");

export function interactiveSearch(query: string) {
  try {
    if (!accessToken) {
      const searchForAnyone = handleFetch(`${urlForNonUser}/?query=${query}`);
      return searchForAnyone;
    }

    const searchForUser = handleFetch(`${urlForUser}/?query=${query}`, "POST", {
      accessToken: accessToken,
    });
    return searchForUser;
  } catch (error) {
    console.log(error);
  }
}
