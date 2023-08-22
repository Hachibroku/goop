import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NewAccount, setNewAccount] = useState([]);

  useEffect(() => {
    const NewAccountUrl = "http://localhost:3000/api/NewAccount/";
    fetch(NewAccountUrl)
      .then((response) => response.json())
      .then((data) => setNewAccount(data.NewAccount))
      .catch((e) => console.error("error: ", e));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAccount = {
      username: username,
      email: email,
      password: password,
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}};

export default SignUpPage;
