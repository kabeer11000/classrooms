import {Typography} from "@mui/material";
import React from "react";
import CenteredContainer from "../../containers/CenteredContainer";
import {Calculate} from "@mui/icons-material";

function NoClass() {
    return (
        <CenteredContainer>
            <div className="d-block text-center">
                <Calculate style={{height: "6rem", width: "6rem"}}/>
                <br/>
                <Typography variant="body1">
                    Classes you create or join will appear here
                </Typography>
            </div>
        </CenteredContainer>
    );
}

export default NoClass;
