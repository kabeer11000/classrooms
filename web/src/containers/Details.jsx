import {Button, Divider, Grid, Typography} from "@mui/material";
import React from "react";

function Details({content}) {
    return (
        <Grid item md={8} xs={12}>
            <div className="pb-2">
                <Typography variant="h4">
                    <i className="fas fa-clipboard-list" style={{marginRight: 10}}></i>
                    {content?.title}
                </Typography>
                <Typography variant="caption">
                    {`${new Date(
                        content?.createdAt.seconds * 1000
                    ).toDateString()} at ${new Date(
                        content?.createdAt.seconds * 1000
                    ).toLocaleTimeString()}`}
                </Typography>
            </div>
            <br/>
            <div className="my-2">
                <Typography variant="body1">{content?.description}</Typography>
            </div>
            {content?.file.url && (
                <div className="mb-2 mt-4">
                    <Button variant="contained" color="secondary">
                        <a
                            href={content?.file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark"
                        >
                            <i className="fa fa-book-open" style={{marginRight: "5px"}}></i>
                            {content?.file.name}
                        </a>
                    </Button>
                </div>
            )}
        </Grid>
    );
}

export default Details;
