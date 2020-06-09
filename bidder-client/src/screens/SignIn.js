import React, { useState } from "react";
import { Session } from "../api/session";
const SignIn = props => {
  const [error, setError] = useState("");
  const [input, setInput] = useState({ email: "", password: "" });

  function handleChange(evt) {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    Session.create(input).then(data => {
      if (data.status === 404) {
        setError("Wrong Credentidals");
      } else {
        props.getUser();
        props.history.push("/auctions");
      }
    });
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <p>{error}</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleChange}
            value={input.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="text"
            onChange={handleChange}
            value={input.password}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
