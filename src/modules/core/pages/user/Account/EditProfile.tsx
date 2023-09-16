import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

import sass from "../../../sass/pages/user/Edit.module.scss";
import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "@/utils";

type PersonalData = {
  personalInfo: {
    id: number;
    user_id: string;
    firstName: string | null;
    lastName: string | null;
    personalSite: string | null;
    bio: string | null;
    instagram: string | null;
    twitter: string | null;
  };
  email: string | null;
  name: string | null;
};

type HandleInput = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export function EditProfile() {
  const { data, status } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const { data }: { data: PersonalData } = await handleFetch(
        "http://localhost:8080/user/getprofiledata"
      );
      return data;
    },
  });

  const { personalInfo, email, name } = data || {};
  const { firstName, lastName, personalSite, bio, instagram, twitter } = personalInfo || {};
  const [form, setForm] = useState({
    firstName,
    lastName,
    personalSite,
    bio,
    instagram,
    twitter,
    email,
    name,
  });

  const maxLength = form.bio && 250 - form.bio.length;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleInputChange: HandleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
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
            <div>
              <label htmlFor={"firstName"}>{"First name"}</label>
              <input
                type={"text"}
                id={"firstName"}
                name={"firstName"}
                autoComplete={"given-name"}
                placeholder={"First name"}
                value={form.firstName || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor={"last-name"}>{"Last name"}</label>
              <input
                type={"text"}
                id={"last-name"}
                name={"last-name"}
                autoComplete={"family-name"}
                placeholder={"Last name"}
                value={form.lastName || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={sass.form}>
            <div>
              <label htmlFor={"email"}>{"Email"}</label>
              <input
                type={"email"}
                id={"email"}
                name={"email"}
                autoComplete={"email"}
                placeholder={"Email"}
                value={form.email || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor={"username"}>{"Username"}</label>
              <input
                type={"text"}
                id={"username"}
                name={"username"}
                autoComplete={"username"}
                placeholder={"Username"}
                value={form.name || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className={sass.section}>
        <h2 style={{ marginBottom: "10px" }}>About</h2>
        <fieldset>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "7px" }} htmlFor={"site"}>
              {"Personal site/portfolio"}
            </label>
            <input
              type={"text"}
              id={"site"}
              name={"site"}
              autoComplete={"url"}
              placeholder={"Link"}
              style={{ padding: "10px 12px" }}
              value={form.personalSite || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={sass.bio} style={{ marginTop: "20px" }}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={5}
              autoComplete="on"
              placeholder=""
              value={form.bio || ""}
              onChange={handleInputChange}
            />
            <span
              className={sass.bioValue}
              style={{ color: maxLength && maxLength < 0 ? "red" : "gray" }}
            >
              {maxLength}
            </span>
          </div>
        </fieldset>
      </div>

      <div className={sass.section}>
        <h2 style={{ marginBottom: "20px" }}>Social</h2>
        <div className={sass.socials}>
          <div className={sass.inputs}>
            <label htmlFor={"Instagram"}>{"Instagram"}</label>
            <input
              type={"text"}
              id={"tags"}
              name={"tags"}
              autoComplete={"on"}
              placeholder={"instagram"}
              value={form.instagram || ""}
              onChange={handleInputChange}
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
              value={form.twitter || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <button type="submit">Update account</button>
    </div>
  );
}
