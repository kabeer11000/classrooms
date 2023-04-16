import React, { useState } from "react";
import {Button, Fab, Menu, MenuItem} from "@mui/material";
import { Link } from "react-router-dom";
import {Add} from "@mui/icons-material";

function AddClass() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
      }}
    >
      <Fab
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color={"secondary"}
        variant="contained"
      >
        <Add/>
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/create-class" className="text-decoration-none text-dark">
            Create Class
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/join-class" className="text-decoration-none text-dark">
            Join Class
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AddClass;
