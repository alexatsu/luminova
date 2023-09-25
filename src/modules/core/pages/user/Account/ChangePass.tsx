import { useState } from "react";
import { useAuth } from "@/hooks";
import { handleFetch, endpoints } from "@/utils";

import sass from "../../../sass/pages/user/ChangePass.module.scss";

const { user } = endpoints;

export const ChangePass = () => {
  const { handleFetchError } = useAuth();
  const [password, setPassword] = useState({
    currentPassword: { value: "", error: "" },
    newPassword: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  });
  const { currentPassword, newPassword, confirmPassword } = password;

  const [success, setSuccess] = useState("");
  const [updating, setUpdating] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: { value, error: "" } }));
  };

  const updatePassword = async (pass: typeof password) => {
    const { currentPassword, newPassword, confirmPassword } = pass;
    try {
      if (newPassword.value !== confirmPassword.value) {
        setPassword((prev) => ({
          ...prev,
          confirmPassword: { value: "", error: "Passwords does not match" },
        }));
        return;
      }

      setUpdating(true);

      const { error, message } = (await handleFetch(user.changePassword, "PUT", {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      })) as { error: string; message: string };

      if (handleFetchError(error)) return;

      if (error === "Current password does not match") {
        setPassword((prev) => ({
          ...prev,
          currentPassword: { value: "", error: "Current password does not match" },
        }));
        return;
      }

      setSuccess(message);
      setPassword({
        currentPassword: { value: "", error: "" },
        newPassword: { value: "", error: "" },
        confirmPassword: { value: "", error: "" },
      });
      setTimeout(() => setSuccess(""), 2000);
    } catch (error) {
      console.log(error);
      setServerError("Could not reach the server");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form className={sass.wrapper}>
      <h2>Change password</h2>
      <fieldset>
        <div className={sass.form}>
          <label htmlFor={"currentPassword"}>{"Current password"}</label>
          <input
            type={"password"}
            id={"currentPassword"}
            name={"currentPassword"}
            autoComplete={"current-password"}
            value={currentPassword.value}
            onChange={handleChangeInput}
          />
          {currentPassword.error ? (
            <p className={sass.errorMessage}>{currentPassword.error}</p>
          ) : null}
        </div>

        <div className={sass.form}>
          <label htmlFor={"newPassword"}>{"New Password"}</label>
          <input
            type={"password"}
            id={"newPassword"}
            name={"newPassword"}
            autoComplete={"new-password"}
            value={newPassword.value}
            onChange={handleChangeInput}
          />
        </div>

        <div className={sass.form}>
          <label htmlFor={"confirmPassword"}>{"Password confirmation"}</label>
          <input
            type={"password"}
            id={"confirmPassword"}
            name={"confirmPassword"}
            autoComplete={"new-password"}
            value={confirmPassword.value}
            onChange={handleChangeInput}
          />
          {confirmPassword.error ? (
            <p className={sass.errorMessage}>{confirmPassword.error}</p>
          ) : null}
        </div>
      </fieldset>

      <button disabled={updating} onClick={() => updatePassword(password)}>
        {updating ? "Updating..." : "Change password"}
      </button>
      {success ? <p className={sass.successMessage}>{success}</p> : null}
      {serverError ? <p className={sass.errorMessage}>{serverError}</p> : null}
    </form>
  );
};
