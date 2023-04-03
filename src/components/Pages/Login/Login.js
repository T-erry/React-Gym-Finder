import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, Header } from "semantic-ui-react"
import "./Login.css"
function Login() {
  const [formData, setFormData] = useState({
    adminname: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");


  function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          if (data.jwt) {
            // save the token to localStorage for future access
            localStorage.setItem("jwt", data.jwt);
            // navigate to the home page
            navigate("/dashboard");
          } else {
            setError("Wrong Admin Name or Password");
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Server error occurred. Please try again later.");
        });
    }
  
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  }

  return (
   
    <div className="login" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", margin: "3em" }}>
      <Form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <Header as='h1' style={{alignItems: 'center', justifyContent: 'center' }}>Login Form</Header>
        <Form.Field>
          <label style = {{ fontSize: '16px' }}>Admin Name</label>
          <Input
            type="text"
            name="adminname"
            onChange={handleChange}
            placeholder="Admin Name"
            required = "adminname"
          />
        </Form.Field>
        <Form.Field>
          <label style = {{ fontSize: '16px' }}>Password</label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required = "adminname"
          />
        </Form.Field>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" onClick={handleSubmit}>login</Button>
        <Header as='h3'style={{lineHeight: 1.5 }}>Don't have an account? <Link to="/signup">Sign Up Now</Link></Header>
      </Form>
    </div>
  );
};

export default Login;

