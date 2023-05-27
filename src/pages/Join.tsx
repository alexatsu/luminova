import { authEndpoints } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { createStyles, TextInput, PasswordInput, Button, Title, rem, Text } from "@mantine/core";
//TODO: add error handling if user already exists
const useStyles = createStyles((theme) => ({
  container: { display: "flex", justifyContent: "center", width: "100%", height: "100%" },
  image: {
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
    alignItems: "center",
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
    marginTop: "-3px",
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
  paragraph: {
    marginTop: "1rem",
    fontSize: "0.8rem",
    color: "grey",
    textAlign: "center",
  },
}));

export function Join() {
  const { classes } = useStyles();
  const { form, title, text, link, image, input, paragraph, container, errorText } = classes;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userForm = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters"),
      name: (value) => (value.length >= 3 ? null : "Name must be at least 3 characters"),
    },
  });

  const register = async (payload: { email: string; password: string; name: string }) => {
    const { email, password, name } = payload;
    try {
      const response = await fetch(authEndpoints.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();

      if (data.error === "User with this email/name already exists") {
        setError(data.error);
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
      console.log(data, "data");
    } catch (error) {
      console.log(error, "error register");
    }
  };

  return (
    <div className={container}>
      <form className={form} onSubmit={userForm.onSubmit((formValues) => register(formValues))}>
        <Title order={2} className={title} ta="center" mt="md" mb={50}>
          Join Luminova
        </Title>
        <TextInput
          className={input}
          label="Username"
          placeholder="John Doe"
          size="md"
          name="name"
          {...userForm.getInputProps("name")}
        />
        <TextInput
          className={input}
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          name="email"
          {...userForm.getInputProps("email")}
        />
        {error && <Text className={errorText}>{error}</Text>}
        <PasswordInput
          className={input}
          label="Password"
          placeholder="Your password"
          size="md"
          name="password"
          {...userForm.getInputProps("password")}
        />

        <Button className={input} fullWidth mt="xl" size="md" type="submit">
          Join
        </Button>
        <div className={text}>
          <span>Already have an account?</span>
          <div className={link}>Login</div>
        </div>
        <Text className={paragraph}>
          By joining, you agree to the{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Terms</span> and{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
        </Text>
      </form>
      <div className={image}></div>
    </div>
  );
}
