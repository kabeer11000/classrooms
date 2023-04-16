import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {generateRandomBackground} from "../../utils/backgrounds";

function Header({currentClass, isTeacher}) {
    return (
        <Grid
            item
            lg={12}
            xs={12}
            className="px-3 mt-4 d-flex justify-content-between align-items-center"
            style={{
                background: currentClass?.styling?.color ?? `url(${currentClass?.styling?.background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: 10,
                paddingBottom: "5rem",
                paddingTop: "5rem",
            }}
        >
            <div style={{flex: 1, flexGrow: "1 1 auto", backgroundColor: "white", minWidth: "100%", left:0, top:0, opacity: .2, zIndex: 1, position: "absolute"}}/>
            <div className="d-block" style={{ zIndex: 2}}>
                <Typography variant="h4" color={"white"}>{currentClass?.subjectName}</Typography>
                <Typography variant="h6" color="secondary">
                    {currentClass?.className} - {currentClass?.subjectCode}
                </Typography>
            </div>
            {isTeacher && (
                <div style={{ zIndex: 2}}>
                    <Link
                        className="text-decoration-none"
                        to={`/classroom/${currentClass?.id}/post`}
                    >
                        <Button variant="contained">
                            Post
                        </Button>
                    </Link>
                </div>
            )}
        </Grid>
    );
}

export default Header;
