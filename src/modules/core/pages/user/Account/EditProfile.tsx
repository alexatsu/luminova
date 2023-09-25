import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

import { queryClient } from "@/main";
import { endpoints, handleFetch } from "@/utils";
import { Loader } from "@/components";
import { useAuth } from "@/hooks";

import sass from "../../../sass/pages/user/Edit.module.scss";

type PersonalData = {
  email: string;
  name: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    personalSite: string;
    bio: string;
    instagram: string;
    twitter: string;
  } | null;
};

type HandleInput = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
) => void;

const { user } = endpoints;

export function EditProfile() {
  const { handleFetchError } = useAuth();
  const [updating, setUpdating] = useState(false);

  const { data, status } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const { data, error }: { data: PersonalData; error: string } = await handleFetch(
        user.getProfileData
      );

      if (handleFetchError(error)) return;
      return data;
    },
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    personalSite: "",
    bio: "",
    instagram: "",
    twitter: "",
  });

  const bio = form.bio;
  const maxLength = bio && 250 - bio.length;

  const handleInputChange: HandleInput = (e): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { firstName, lastName, personalSite, bio, instagram, twitter } = data?.personalInfo || {};
    if (data) {
      setForm((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        personalSite: personalSite || "",
        bio: bio || "",
        instagram: instagram || "",
        twitter: twitter || "",
        email: data.email,
        name: data.name,
      }));
    }
  }, [data]);

  const submitUpdatedProfile = async (form: PersonalData["personalInfo"]) => {
    setUpdating(true);

    const { firstName, lastName, personalSite, bio, instagram, twitter } = form || {};
    const response = await handleFetch(user.updateProfileData, "PUT", {
      firstName,
      lastName,
      personalSite,
      bio,
      instagram,
      twitter,
      email: data?.email,
    });

    queryClient.invalidateQueries(["profileData"]);
    setUpdating(false);
    return response;
  };

  if (status === "loading") {
    return <Loader style={{ margin: "0 auto" }} />;
  }

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
                value={form.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor={"lastName"}>{"Last name"}</label>
              <input
                type={"text"}
                id={"lastName"}
                name={"lastName"}
                autoComplete={"family-name"}
                placeholder={"Last name"}
                value={form.lastName}
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
                value={data?.email}
                disabled
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
                value={data?.name}
                disabled
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className={sass.section}>
        <h2 style={{ marginBottom: "10px" }}>About</h2>
        <fieldset>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "7px" }} htmlFor={"personalSite"}>
              {"Personal site/portfolio"}
            </label>
            <input
              type={"text"}
              id={"personalSite"}
              name={"personalSite"}
              autoComplete={"url"}
              placeholder={"Link"}
              style={{ padding: "10px 12px" }}
              value={form.personalSite}
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
              value={form.bio}
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
            <label htmlFor={"instagram"}>{"Instagram"}</label>
            <input
              type={"text"}
              id={"instagram"}
              name={"instagram"}
              autoComplete={"on"}
              placeholder={"instagram"}
              value={form.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div className={sass.inputs}>
            <label htmlFor={"twitter"}>{"Twitter"}</label>
            <input
              type={"text"}
              id={"twitter"}
              name={"twitter"}
              autoComplete={"on"}
              placeholder={"twitter"}
              value={form.twitter}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={() => submitUpdatedProfile(form)}
        className={updating ? sass.submitBtnUploading : sass.submitBtn}
        disabled={updating}
      >
        {updating ? "Updating..." : "Update profile"}
      </button>
    </div>
  );
}
