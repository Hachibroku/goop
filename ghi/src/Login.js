import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import './Form.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1 className='formHeader'>Login</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="div-login">
            <label className="label-login">Email:</label>
            <input
              name="username" type="text" className="input-login"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="div-login">
            <label className="label-login">Password:</label>
            <input
              name="password" type={showPassword ? 'text' : 'password'} className="input-login"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
                   {showPassword ? 'Hide' : 'Show'} Password
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
