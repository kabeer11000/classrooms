import React from "react";
import {Button, CardActionArea, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import CenteredContainer from "../../containers/CenteredContainer";
import {Calculate} from "@mui/icons-material";

function Posts({items, type, classLink, isTeacher}) {
    const {currentUser} = useAuth();

    const isSubmitted = (submissions) => {
        if (!isTeacher && type === "assignment") {
            if (submissions.find((i) => i.email === currentUser.email)) {
                return "text-success";
            }
            return "text-danger";
        }
        return "text-dark";
    };
    return (
        <Grow in={true}>
            <Grid container className="my-3 px-0 mx-0">
                {items?.length ? (
                    items.map((item) => (
                        <Grid item lg={12} xs={12} key={item.id} className="mb-2 px-0 mx-0">
                            <Paper component={CardActionArea} variant={"outlined"}>
                                <Link
                                    to={`${classLink}/${type}/${item.id}`}
                                    className="text-decoration-none"
                                >
                                    <div className="py-2 px-3">
                                        <Typography className={"text-decoration-none " + isSubmitted(item.submissions)}
                                                    variant={"h6"}>
                                            <i
                                                className={`${
                                                    type === "material"
                                                        ? "fas fa-file-alt"
                                                        : "fas fa-clipboard-list"
                                                } ${isSubmitted(item.submissions)}`}
                                                style={{marginRight: 10}}
                                            ></i>
                                            {item.title}
                                        </Typography>
                                    </div>
                                    {item?.file.url && (
                                        <div className="mb-5 pb-4 m-3 mt-4">
                                            <Button variant="contained" color="secondary">
                                                <i className="fa fa-book-open" style={{marginRight: "5px"}}></i>
                                                {item?.file.name}
                                            </Button>
                                        </div>
                                    )}
                                </Link>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <div style={{width: "100%", flex: 1,}}>
                        <CenteredContainer>
                            <div className="d-block text-center">
                                <Calculate style={{height: "6rem", width: "6rem"}}/>
                                <br/>
                                <Typography variant="body1">
                                    No {type}s posted
                                </Typography>
                            </div>
                        </CenteredContainer>
                    </div>
                )}
            </Grid>
        </Grow>
    );
}

export default Posts;
