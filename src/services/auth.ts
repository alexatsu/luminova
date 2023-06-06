import { handleFetch, authEndpoints } from "@/utils";
import { NavigateFunction } from "react-router-dom";

type LoginProps = (
  payload: { email: string; password: string },
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>
) => void;

type RegisterProps = (
  payload: { email: string; password: string; name: string },
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>
) => void;

const authHandler = () => {
  const logoutUser = async (token: string | null, navigate: NavigateFunction) => {
    try {
      const response = await handleFetch(authEndpoints.logout, "POST", {
        Authorization: `Bearer ${token}`,
      });
      console.log(response, "logout");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
      localStorage.removeItem("accessToken");
    }
  };

  const register: RegisterProps = async (payload, navigate, setError) => {
    const { email, password, name } = payload;
    try {
      const data = await handleFetch(authEndpoints.register, "POST", {}, { email, password, name });
      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");

      console.log(data, "data");
    } catch (error) {
      console.log(error, "error register");
    }
  };

  const login: LoginProps = async (data, navigate, setError) => {
    const { email, password } = data;
    try {
      const data = await handleFetch(authEndpoints.login, "POST", {}, { email, password });
      console.log(data);
      if (data.error === "Invalid email or password") {
        setError(data.error);
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async (navigate: NavigateFunction) => {
    const { refresh } = authEndpoints;
    const refreshData = await handleFetch(refresh, "POST", {}, {});
    const { error, accessToken } = refreshData as unknown as {
      error: string;
      accessToken: string;
    };
    if (error === "Refresh token missing") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      return;
    }
    localStorage.setItem("accessToken", accessToken);
  };
  return {
    logoutUser,
    register,
    login,
    refreshAccessToken,
  };
};
export { authHandler };
