import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="name"
            onChange={onChange}
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFo="exampleInputPassword1" className="form-label">
            geolocation
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="geolocation"
            onChange={onChange}
            value={credentials.geolocation}
          />
        </div>

        <button
          type="submit"
          className="m-3 btn btn-success
        "
        >
          Submit
        </button>
        <Link to="/login" className="btn btn-danger">
          Already a User?
        </Link>
      </form>
    </div>
  );
}
