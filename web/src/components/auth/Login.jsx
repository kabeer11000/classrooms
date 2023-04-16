import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import {Button, Container, InputBase, TextField, Typography} from "@mui/material";

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [state, setState] = useState({password: "", email: ""});

  async function handleSubmit() {
    try {
      setLoading(true);
      await login(state.email, state.password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className=" w-100">
        <div className={"mb-5"}>
          <Typography variant={"h2"}>Login</Typography>
        </div>
        <div>
          <div className={"mb-4"}>
            <div className="form-group mb-4">
              <TextField
                label={"Email"}
                type="email"
                value={state.email}
                onChange={(t) => setState({...state, email: t.target.value})}
                className="mb-2 w-100"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextField
                  label={"Password"}
                  type="password"
                  value={state.password}
                  onChange={(t) => setState({...state, password: t.target.value})}
                  className="form-control mb-2"
                  placeholder="Password"
                  required
              />
            </div>
            <Button variant={"contained"} onClick={handleSubmit} disabled={loading} className={"w-100"}>
              Login
            </Button>
          </div>
          <div className="my-2 text-center">
            <Link to="forgotPassword">Forgot password?</Link>
          </div>
        </div>
        <div className="text-center pb-1">
          <h6>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h6>
        </div>
      </div>
    </Container>
  );
}

export default Login;
