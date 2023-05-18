// import { reuseFetch } from "@/services/fetch";
import { authEndpoints } from "@/utils";
import { createStyles, TextInput, PasswordInput, Button, Title, rem, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minWidth: "50%",
    minHeight: "100%",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: "100%",
    minWidth: "50%",
    paddingTop: rem(80),
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "1rem",
    gap: "0.5rem",
    fontSize: "1rem",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  },
  link: {
    color: "#228be6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 600,
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    "&:hover": {
      color: "#1e78c8",
    },
    transition: "color 0.15s ease",
  },
  input: {
    width: "80%",
    margin: "auto",
    marginTop: "1rem",
  },
}));

export function Login() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const Login = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      const response = await fetch(authEndpoints.login, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { form, title, text, link, wrapper, input } = classes;
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
      <form
        className={form}
        onSubmit={(e) => {
          e.preventDefault();
          Login(userData);
        }}
      >
        <Title order={2} className={title} ta="center" mt="md" mb={50}>
          Login
        </Title>
        <Text style={{ textAlign: "center" }}>Welcome back.</Text>
        <TextInput
          className={input}
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          onChange={(e) => setUserData((prevData) => ({ ...prevData, email: e.target.value }))}
          value={userData.email}
        />
        <PasswordInput
          className={input}
          label="Password"
          placeholder="Your password"
          size="md"
          onChange={(e) => setUserData((prevData) => ({ ...prevData, password: e.target.value }))}
          value={userData.password}
        />

        <Button className={input} fullWidth mt="xl" size="md" type="submit">
          Login
        </Button>
        <div className={text}>
          <span>Don&apos;t have an account? </span>
          <Link className={link} to="/join">
            Join
          </Link>
        </div>
      </form>
      <div className={wrapper}></div>
    </div>
  );
}
