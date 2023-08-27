import { FormInput } from "../../../components/FormInput";

import sass from "../../../sass/pages/user/CloseAccount.module.scss";

export const CloseAccount = () => {
  return (
    <div className={sass.wrapper}>
      <h2>Close Account</h2>

      <p>
        <span>Warning: </span>closing your account is irreversible. It deletes all of your photos,
        collections, and stats.
      </p>

      <fieldset>
        <FormInput
          label={"Current password"}
          type={"password"}
          attribute={"password"}
          autocomplete="current-password"
          placeholder="Password"
        />
      </fieldset>
      <button>Delete account</button>
    </div>
  );
};
