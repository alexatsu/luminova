import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FormInput } from "../../components/FormInput";

import sass from "../../sass/user/Edit.module.scss";

export const Edit = () => {
  const [bioValue, setBioValue] = useState("");
  const [bioCount, setBioCount] = useState(250);

  useEffect(() => {
    setBioCount(250 - bioValue.length);
  }, [bioValue]);

  return (
    <div className={sass.wrapper}>
      <h2>Edit Profile</h2>
      <div className={sass.editProfile}>
        <div className={sass.avatar}>
          <AiOutlineUser color="rgb(175, 175, 175)" className={sass.image} />
          <p>Change profile image</p>
        </div>
        <fieldset>
          <div className={sass.form}>
            <FormInput
              label={"First name"}
              type={"text"}
              attribute={"first-name"}
              autocomplete={"given-name"}
              placeholder={"First name"}
            />
            <FormInput
              label={"Last name"}
              type={"text"}
              attribute={"last-name"}
              autocomplete={"family-name"}
              placeholder={"Last name"}
            />
          </div>
          <FormInput
            label={"Email"}
            type={"email"}
            attribute={"email"}
            autocomplete={"email"}
            placeholder={"Email"}
          />
          <FormInput
            label={"Username"}
            span={"(only letters, numbers, and underscores)"}
            type={"text"}
            attribute={"username"}
            autocomplete={"username"}
            placeholder={"Username"}
          />
        </fieldset>
      </div>
      <div className={sass.section}>
        <h2>About</h2>
        <fieldset>
          <FormInput
            label={"Personal site/portfolio"}
            type={"text"}
            attribute={"site"}
            autocomplete={"url"}
            placeholder={"https://"}
          />
          <div className={sass.formAbout}>
            <div className={sass.textarea} style={{ marginTop: "20px" }}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={5}
                autoComplete="on"
                placeholder=""
                value={bioValue}
                onChange={(e) => {
                  setBioValue(e.target.value);
                }}
              ></textarea>
              <span className={sass.bioValue} style={{ color: bioCount < 0 ? "red" : "gray" }}>
                {bioCount}
              </span>
            </div>
            <FormInput
              label={"Interests"}
              span={"(maximum 5)"}
              type={"text"}
              attribute={"tags"}
              autocomplete={"on"}
              placeholder={"add a tag"}
            />
          </div>
        </fieldset>
      </div>
      <div className={sass.section}>
        <h2>Social</h2>
        <fieldset>
          <div className={sass.form}>
            <FormInput
              label={"Instagram username"}
              type={"text"}
              attribute={"instagram"}
              autocomplete={"on"}
              placeholder={"instagram"}
            />
            <FormInput
              label={"Twitter username"}
              type={"text"}
              attribute={"twitter"}
              autocomplete={"on"}
              placeholder={"twitter"}
            />
          </div>
        </fieldset>
      </div>
      <button type="submit">Update account</button>
    </div>
  );
};
