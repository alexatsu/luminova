import { useState } from "react";
import { endpoints, handleFetch } from "@/utils";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

import sass from "../../../sass/pages/user/CloseAccount.module.scss";

const { user } = endpoints;

export const CloseAccount = () => {
  const { handleFetchError } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCloseAccount = async (pass: typeof password) => {
    const { error, message } = (await handleFetch(user.closeAccount, "POST", {
      currentPassword: pass,
    })) as {
      error: string;
      message: string;
    };

    if (handleFetchError(error)) return;
    if (error === "Current password does not match") {
      setPassword("");
      setError("Current password does not match");
      return;
    }

    if (message === "Account closed successfully") {
      navigate("/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return;
    }
  };

  return (
    <form className={sass.wrapper}>
      <h2>Close Account</h2>

      <p className={sass.warning}>
        <span>Warning: </span>closing your account is irreversible. It deletes all of your photos,
        collections, and stats.
      </p>

      <div className={sass.form}>
        <label htmlFor={"currentPassword"}>{"Current password"}</label>
        <input
          type={"password"}
          id={"currentPassword"}
          name={"currentPassword"}
          autoComplete={"current-password"}
          value={password}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleCloseAccount(password);
        }}
      >
        Delete account
      </button>
      {error && <p className={sass.errorMessage}>{error}</p>}
    </form>
  );
};
