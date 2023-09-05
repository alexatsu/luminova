import { handleFetch, authEndpoints } from "@/utils";
import { NavigateFunction, useNavigate } from "react-router-dom";

type LoginProps = (
  payload: { email: string; password: string },
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>
) => Promise<void>;

type RegisterProps = (
  payload: { email: string; password: string; name: string },
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>
) => Promise<void>;

type RefreshProps = (navigate: NavigateFunction) => Promise<void>;
type LogoutProps = (token: string | null, navigate: NavigateFunction) => Promise<void>;
type Fetch = { [key: string]: string };

const useAuth = () => {
  const navigate = useNavigate();

  const register: RegisterProps = async (payload, navigate, setError) => {
    const { email, password, name } = payload;
    try {
      const { error, accessToken, userName }: Fetch = await handleFetch(
        authEndpoints.register,
        "POST",
        { email, password, name }
      );

      console.log(error);
      if (error) {
        setError(error);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);

      navigate("/");
    } catch (error) {
      console.log(error, "error register");
    }
  };

  const login: LoginProps = async (payload, navigate, setError) => {
    const { email, password } = payload;
    try {
      const { error, accessToken, userName }: Fetch = await handleFetch(
        authEndpoints.login,
        "POST",
        { email, password }
      );

      if (error === "Invalid email or password") {
        setError(error);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken: RefreshProps = async (navigate) => {
    const { refresh } = authEndpoints;
    const name = localStorage.getItem("userName");

    const { error, accessToken, userName }: Fetch = await handleFetch(refresh, "POST", {
      userName: name,
    });

    if (error === "Refresh token is missing") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userName", userName);
  };

  const logoutUser: LogoutProps = async (token, navigate) => {
    try {
      const response = await handleFetch(
        authEndpoints.logout,
        "POST",
        {},
        { Authorization: `Bearer ${token}` }
      );
      console.log(response, "logout");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
    }
  };

  const handleFetchError = (error: string) => {
    console.log("im called")
    if (error === "Refresh token is missing" || error === "User not found") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return true;
    }
    return false;
  };

  return {
    logoutUser,
    register,
    login,
    refreshAccessToken,
    handleFetchError,
  };
};
export { useAuth };
