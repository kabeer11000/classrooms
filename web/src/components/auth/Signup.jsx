import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {Button, Container, TextField, Typography} from "@mui/material";

function Signup() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({password: "", email: "", confirmPassword: ""});
    const {signup} = useAuth();

    async function handleSubmit() {
        if (state.password !== state.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            setLoading(true);
            await signup(state.email, state.password);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <div className=" w-100">
                <div className={"mb-4"}>
                    <Typography variant={"h2"}>Sign Up</Typography>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
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
                        <div className="form-group mb-4">
                            <TextField
                                label={"Confirm Password"}
                                type="password"
                                value={state.confirmPassword}
                                onChange={(t) => setState({...state, confirmPassword: t.target.value})}
                                className="form-control mb-2"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <Button disabled={loading} onClick={handleSubmit} variant={"contained"}
                                    className="w-100 mb-4">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="text-center pb-1">
                    <h6>
                        Already have an account? <Link to="/login">Login</Link>
                    </h6>
                </div>
            </div>
        </Container>
    );
}

export default Signup;
