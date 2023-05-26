import { authEndpoints } from "@/utils";
import { createStyles, TextInput, PasswordInput, Button, Title, rem, Text } from "@mantine/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";

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
  const { form, title, text, link, image, input, paragraph, container } = classes;

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

  const register = async (data: { email: string; password: string; name: string }) => {
    const { email, password, name } = data;
    await axios
      .post(authEndpoints.register, { email, password, name }, { withCredentials: true })
      .then((res) => {
        console.log(res.data, "res.data");
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className={container}>
      <form className={form} onSubmit={userForm.onSubmit((formValues) => register(formValues))}>
        <Title order={2} className={title} ta="center" mt="md" mb={50}>
          Join Unsplash
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
          <Link className={link} to="/login">
            Login
          </Link>
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
