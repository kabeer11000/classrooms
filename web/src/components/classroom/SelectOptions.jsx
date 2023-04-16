import React from "react";
import {Grid, Grow, useTheme} from "@mui/material";

function SelectOptions({selectedOption, setSelectedOption}) {
    const options = [
        {
            title: "Feed",
        },
        {
            title: "Assignments",
        },
        {
            title: "People",
        },
    ];
    const theme = useTheme();

    return (
        <Grid container spacing={3} style={{paddingLeft: 15, paddingRight: 15}}>
            {options.map((option) =>
                option.title === selectedOption ? (
                    <Grid item lg={4} xs={4} key={option.title}>
                        <Grow in={true}>
                            <div
                                style={{
                                    backgroundColor: theme.palette.secondary.main,
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 2,
                                }}
                                className="text-center"
                            >
                                <h6>{option.title}</h6>
                            </div>
                        </Grow>
                    </Grid>
                ) : (
                    <Grid item lg={4} xs={4} key={option.title}>
                        <Grow in={true}>
                            <div
                                className="text-center px-2"
                                onClick={() => setSelectedOption(option.title)}
                                style={{cursor: "pointer", paddingTop: 10, paddingBottom: 3}}
                            >
                                <h6 className="text-muted">{option.title}</h6>
                            </div>
                        </Grow>
                    </Grid>
                )
            )}
        </Grid>
    );
}

export default SelectOptions;
