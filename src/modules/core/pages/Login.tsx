import { useAuth } from "@/shared/hooks";
import { createStyles, TextInput, PasswordInput, Button, Title, rem, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
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
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: "100%",
    minWidth: "50%",
    paddingTop: rem(80),
    "@media (max-width: 768px)": {
      borderRight: "none",
      minWidth: "90%"
    },
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
  errorText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
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
  const { form, title, text, link, wrapper, input, errorText } = classes;
  const navigate = useNavigate();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const userForm = useForm({
    initialValues: { email: "", password: "" },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
      <form
        className={form}
        onSubmit={userForm.onSubmit((formValues) => login(formValues, navigate, setError))}
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
          name="email"
          {...userForm.getInputProps("email")}
        />
        <PasswordInput
          className={input}
          label="Password"
          placeholder="Your password"
          size="md"
          name="password"
          {...userForm.getInputProps("password")}
        />
        {error && <Text className={errorText}>{error}</Text>}
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
