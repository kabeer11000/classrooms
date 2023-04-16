import React from "react";
import {Link} from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import {useAuth} from "../../contexts/AuthContext";
import {Button, Container, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";

function Profile() {
    const {currentUser, logout} = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Container maxWidth={"md"}>
            <List sx={{width: '100%', marginTop: "5rem"}}>
                <ListItem>
                    <Typography variant={"h4"}>Profile</Typography>
                </ListItem>
                <ListItem selected={true}>
                    <ListItemText primary={currentUser && currentUser.email} secondary="Jan 9, 2014"/>
                </ListItem>
                <ListItem component={Link} to="/updateProfile">
                    <ListItemText primary={"Update Profile"} secondary="Update your classroom profile"/>
                </ListItem>
                <ListItem component={Link} to="/">
                    <ListItemText primary={"Back"} secondary="Go back home"/>
                </ListItem>
                <ListItem>
                    <Button onClick={handleLogout} style={{width: "100%"}} variant={"contained"}>Sign Out</Button>
                </ListItem>
            </List>
        </Container>
    );
}

export default Profile;
