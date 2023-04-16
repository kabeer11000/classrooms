import React from "react";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import {Link} from "react-router-dom";
import {Edit} from "@mui/icons-material";

// backgroundColor: theme.palette.primary.dark
//  style={{backgroundColor: theme.palette.primary.main}}
function PendingWork({ assignments, classId }) {
  const theme = useTheme();
  return (
    <Grid
      item
      lg={3}
      md={3}
      xs={12}
      style={{ paddingLeft: 7, paddingRight: 7 }}
      className="mt-3 px-0 mx-0"
    >
      <Paper elevation={0} variant={"outlined"}>
        <List
            sx={{ width: '100%'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader style={{backgroundColor: theme.palette.grey.A100}} component="div" id="nested-list-subheader">
                Pending Assignments
              </ListSubheader>
            }
        >
          {assignments?.length ? assignments?.map((item) => (
              <ListItem button key={item.id} component={Link} to={`/classroom/${classId}/assignment/${item.id}`}>
                <ListItemIcon>
                  <Edit/>
                </ListItemIcon>
                <ListItemText style={{textDecoration: "none"}} primaryTypographyProps={{
                  variant: "button"
                }} primary={item.title} />
              </ListItem>
          )) : <ListItem><Typography variant={"button"}>Woohoo, no work left!</Typography></ListItem>}
        </List>
      </Paper>
    </Grid>
  );
}

export default PendingWork;
