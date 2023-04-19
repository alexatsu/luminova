import { useState } from "react";
import axios from "axios";
// import "./test.css";
const url = `http://localhost:8080/api/session`;
const urlregister = `http://localhost:8080/register`;
const urllogin = `http://localhost:8080/login`;
function App() {
  const [loginData, setLoginData] = useState();
  const [logoutData, setLogoutData] = useState();
  const [allowed, setAllowed] = useState(false);
  async function register(event: React.SyntheticEvent) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    await axios
      .post(urlregister, { email, password }, { withCredentials: true })
      .then((res) => {
        setLoginData(res.data);
        console.log(res.data, "res.data");
      })
      .catch((error) => setLoginData(error.message));
  }

  async function logout() {
    await axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => setLogoutData(res.data))
      .catch((error) => setLogoutData(error.message));
  }
  async function Login(event: React.SyntheticEvent) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    await fetch(urllogin, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      res.json().then(({ token }) => {
        console.log(token, "data");
        localStorage.setItem("token", token);
      });
    });
  }
  async function protectedAccess() {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/protected", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data, "protected");
      });
    });
  }
  return (
    <div className="App">
      <div className="wrapper">
        <h2>Login</h2>
        <form onSubmit={register}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="jane.doe@example.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="******" />

          <button type="submit">Register</button>
        </form>

        <div className="data">{JSON.stringify(loginData)}</div>
      </div>

      <div>
        <form onSubmit={Login}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="jane.doe@example.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="******" />

          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <button onClick={protectedAccess}>Protected</button>
      </div>
      <div className="wrapper">
        <h2>Logout</h2>
        <button onClick={logout}>Logout</button>
        <div className="data">{JSON.stringify(logoutData, null, 4)}</div>
      </div>
    </div>
  );
}

export default App;
