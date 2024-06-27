import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser, currentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useToken();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const getUsername = async (username) => {
    try {
      const url = `http://localhost:8000/api/accounts/${username}`;
      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCurrentUser(data.username);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Wait for the login process to complete
      await getUsername(username);
      e.target.reset();
      setLoginSuccess(true); // Set login success to true
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    loginSuccess && currentUser && navigate("/home");
  }, [loginSuccess, currentUser, navigate]);

  return (
    <div>
      <h1 className="formHeader">Login</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="div-login">
            <label className="label-login">Username:</label>
            <input
              name="username"
              type="text"
              className="input-login"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="div-login">
            <label className="label-login">Password:</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input-login"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <div>
            <input className="button-login" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
