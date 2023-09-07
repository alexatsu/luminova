import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FormInput } from "../../../components/FormInput";

import sass from "../../../sass/pages/user/Edit.module.scss";

export function EditProfile() {
  const [bioValue, setBioValue] = useState("");
  const maxLength = 250 - bioValue.length;

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
            <div className={sass.bio} style={{ marginTop: "20px" }}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={5}
                autoComplete="on"
                placeholder=""
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
              />
              <span className={sass.bioValue} style={{ color: maxLength < 0 ? "red" : "gray" }}>
                {maxLength}
              </span>
            </div>

            <div className={sass.interests} style={{ marginTop: "20px" }}>
              <label htmlFor={"Interests"}>{"Interests"}</label>
              <input
                type={"text"}
                id={"tags"}
                name={"tags"}
                autoComplete={"on"}
                placeholder={"add a tag"}
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div className={sass.section}>
        <h2 style={{marginBottom: "20px"}}>Social</h2>
        <div className={sass.socials}>
          <div className={sass.inputs}>
            <label htmlFor={"Instagram"}>{"Instagram"}</label>
            <input
              type={"text"}
              id={"tags"}
              name={"tags"}
              autoComplete={"on"}
              placeholder={"instagram"}
            />
          </div>
          <div className={sass.inputs}>
            <label htmlFor={"Twitter"}>{"Twitter"}</label>
            <input
              type={"text"}
              id={"tags"}
              name={"tags"}
              autoComplete={"on"}
              placeholder={"Twitter"}
            />
          </div>
        </div>
      </div>
      <button type="submit">Update account</button>
    </div>
  );
}
