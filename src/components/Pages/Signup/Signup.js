import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Header } from "semantic-ui-react";
import "./Signup.css"

function SignUp() {
  const [formData, setFormData] = useState({
    adminname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("The adminname already exist");
        }
      })
      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        margin: "3em",
      }}
    >
      <Form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <Header as="h1" style={{ alignItems: "center", justifyContent: "center" }}>
          SignUp Form
        </Header>
        <Form.Field>
          <label style = {{ fontSize: '16px' }}>Admin Name</label>
          <Input
            type="text"
            name="adminname"
            onChange={handleChange}
            placeholder="Admin Name"
            required
            className="form-values"
          />
        </Form.Field>
        <Form.Field>
          <label style = {{ fontSize: '16px' }}>Email</label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-values"
          />
        </Form.Field>
        <Form.Field>
          <label style = {{ fontSize: '16px' }}>Password</label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-values"
          />
        </Form.Field>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">SignUp</Button>
        <Header as="h3" >
          Already have an account?<Link to="/login">Login</Link>
        </Header>
      </Form>
    </div>
    
  );
}

export default SignUp;


