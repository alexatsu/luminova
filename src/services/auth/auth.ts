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

type RefreshProps = (navigate: NavigateFunction) => void;
type LogoutProps = (token: string | null, navigate: NavigateFunction) => void;

const reuseAuth = () => {
  const register: RegisterProps = async (payload, navigate, setError) => {
    console.log(payload, "payload");
    const { email, password, name } = payload;
    try {
      const { error, accessToken } = (await handleFetch(
        authEndpoints.register,
        "POST",
        {},
        { email, password, name }
      )) as { error: string; accessToken: string };
      console.log(error);
      if (error) {
        setError(error);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      console.log(error, "error register");
    }
  };

  const login: LoginProps = async (payload, navigate, setError) => {
    const { email, password } = payload;
    console.log("fired");
    try {
      const { error, accessToken } = (await handleFetch(
        authEndpoints.login,
        "POST",
        {},
        { email, password }
      )) as { error: string; accessToken: string };

      if (error === "Invalid email or password") {
        setError(error);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken: RefreshProps = async (navigate) => {
    const { refresh } = authEndpoints;
    const { error, accessToken } = (await handleFetch(refresh, "POST", {}, {})) as {
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
  const logoutUser: LogoutProps = async (token, navigate) => {
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

  return {
    logoutUser,
    register,
    login,
    refreshAccessToken,
  };
};
export { reuseAuth };
