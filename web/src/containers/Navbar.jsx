import React, {Fragment} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle, ArrowBack} from "@mui/icons-material";

function Navbar() {
    const {currentUser} = useAuth();
    const history = useHistory();
    const location = useLocation()
    return (
        <Fragment>
            <AppBar>
                <Toolbar>
                    {(location.key && (location.pathname !== "/")) ? <IconButton
                        onClick={history.goBack}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <ArrowBack style={{color: "white"}}/>
                    </IconButton> : null}

                    <Typography variant="h6" color={"white"} component="div" sx={{flexGrow: 1}}>
                        Classroom
                    </Typography>
                    <div style={{flex: 1}}/>
                    {currentUser && (
                        <Link to="/profile" className="text-light">
                            <Avatar>
                                {currentUser?._delegate.email.slice(0, 2).toUpperCase()}
                            </Avatar>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Navbar;
