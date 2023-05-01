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
        localStorage.setItem("token", res.data.accessToken);
      })
      .catch((error) => console.log(error.response.data));
  }
  async function logout() {
    const clearToken = localStorage.removeItem("token");
    fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clearToken}`,
      },
    });
    console.log("logout");
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
      res.json().then(({ accessToken }) => {
        console.log(accessToken, "data");
        localStorage.setItem("token", accessToken);
      });
    });
  }
  async function protectedAccess() {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/protected", {
      method: "GET",
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
  const refresh = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data, "refresh");
      });
    });
  };
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
      <div>
        <button onClick={refresh}>test</button>
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
