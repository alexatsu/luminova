import { authEndpoints } from "@/utils";
import axios from "axios";

export function reuseFetch() {
  const register = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    await axios
      .post(authEndpoints.register, { email, password }, { withCredentials: true })
      .then((res) => {
        console.log(res.data, "res.data");
      })
      .catch((error) => console.log(error));
  };
  const logout = async () => {
    const clearToken = localStorage.removeItem("token");
    fetch(authEndpoints.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clearToken}`,
      },
    });
    console.log("logout");
  };
  const Login = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    await fetch(authEndpoints.login, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      res.json().then(({ accessToken }) => {
        console.log(accessToken, "data");
        localStorage.setItem("token", accessToken);
      });
    });
  };

  const protectedAccess = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(authEndpoints.protect, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "protected");
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    const token = localStorage.getItem("token");
    fetch(authEndpoints.refresh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data, "refresh");
      });
    });
  };
  return { register, logout, Login, protectedAccess, refresh };
}
