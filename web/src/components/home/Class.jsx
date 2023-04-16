import {ButtonBase, CardActionArea, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

function Class({item}) {
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Link to={`/classroom/${item.id}`} className="text-decoration-none">
                <Paper component={CardActionArea} variant={"outlined"} style={{position: "relative"}}>
                    <div className="p-3">
                        <Typography variant="h6">
                            {item.subjectName}
                        </Typography>
                        <Typography variant="body2" className="mt-1 text-secondary">
                            {item.className}
                        </Typography>
                    </div>
                    <div style={{
                        zIndex: 99,
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "100rem",
                        backgroundColor: item.styling.color,
                        position: "absolute",
                        bottom: "1.75rem",
                        right: "1rem"
                    }}/>
                </Paper>
            </Link>
        </Grid>
    );
}

export default Class;
