import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";

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
  },
}));

export function Signin() {
  const { classes } = useStyles();
  const { form, title, text, link, wrapper, input } = classes;
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
      <Paper className={form} radius={0} p={30}>
        <Title order={2} className={title} ta="center" mt="md" mb={50}>
          Welcome back to Unsplash!
        </Title>
        <TextInput
          className={input}
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          className={input}
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox className={input} label="Keep me logged in" mt="xl" size="md" />
        <Button className={input} fullWidth mt="xl" size="md">
          Login
        </Button>
        <div className={text}>
          <span>Don&apos;t have an account? </span>
          <Link className={link} to="/signup">
            Signup
          </Link>
        </div>
      </Paper>
      <div className={wrapper}></div>
    </div>
  );
}
