import React from "react";
import {
    Button,
    ButtonBase,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    useTheme
} from "@mui/material";
import {FileUpload} from "../material/FileUpload";
import {InsertDriveFile} from "@mui/icons-material";

function SubmitAssignment({
                              loading,
                              submission,
                              document,
                              setDocument,
                              handleSubmit,
                          }) {
    const theme = useTheme();
    return (
        <Grid
            item
            component={({children, ...props}) => <Paper variant={"outlined"} {...props}>{children}</Paper>}
            md={4}
            xs={12}
            style={{
                // backgroundColor: theme.palette.secondary.light,
                // borderRadius: 10,
                // marginLeft: "auto",
            }}
            className="mt-4"
        >
            <div style={{backgroundColor: theme.palette.grey.A100}}>
                <ListSubheader variant="button" style={{backgroundColor: theme.palette.grey.A100}}>
                    Submission
                </ListSubheader>
            </div>
            <div className={"p-4"}>
                <div className="d-flex align-items-center my-2">
                    {!submission &&
                        <ButtonBase disabled={!!submission} style={{flex: 1}}
                                    component={({children, ...props}) => <Paper {...props}>{children}</Paper>}>
                            <FileUpload {...{
                                accept: '*',
                                width: "16rem",
                                onChange: (event) => {
                                    if (event.target.files !== null && event.target?.files?.length > 0) {
                                        console.log(`Saving ${event.target.files[0]}`)
                                        setDocument(event.target.files[0])
                                    }
                                },
                                onDrop: (event) => {
                                    console.log(`Drop ${event.dataTransfer.files[0].name}`)
                                    setDocument(event.dataTransfer.files[0])
                                },
                            }}/>
                        </ButtonBase>}
                </div>
                {(document || submission !== null) && (
                    <List className={"p-0"}>
                        <ListItem button disabled>
                            <ListItemIcon>
                                <InsertDriveFile/>
                            </ListItemIcon>
                            <ListItemText primary={document.name || submission?.file?.name}/>
                        </ListItem>
                    </List>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    size={"small"}
                    className={"mt-4"}
                    onClick={handleSubmit}
                    hidden={!!!document}
                    disabled={loading || submission !== null || !!!document}>
                    Submit Assignment
                </Button>
            </div>
        </Grid>
    );
}

export default SubmitAssignment;
