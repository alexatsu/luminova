import { FormInput } from "../../../components/FormInput";

import sass from "../../../sass/pages/user/ChangePass.module.scss";

export const ChangePass = () => {
  return (
    <div className={sass.wrapper}>
      <h2>Change password</h2>
      <fieldset>
        <FormInput
          label={"Current password"}
          type={"password"}
          attribute={"current-password"}
          autocomplete={"current-password"}
          placeholder={"Current password"}
        />
        <FormInput
          label={"Password"}
          type={"password"}
          attribute={"new-password"}
          autocomplete={"new-password"}
          placeholder={"Password"}
        />
        <FormInput
          label={"Password confirmation"}
          type={"password"}
          attribute={"confirm-password"}
          autocomplete={"new-password"}
          placeholder={"Password again"}
        />
      </fieldset>
      <button>Change password</button>
    </div>
  );
};
