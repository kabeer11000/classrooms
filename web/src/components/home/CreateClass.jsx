import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent, Container,
  TextField,
  Typography,
} from "@mui/material";
import CenteredContainer from "../../containers/CenteredContainer";
import { useMsg } from "../../contexts/MsgContext";
import { useClassroom } from "../../contexts/ClassroomContext";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import { useHistory } from "react-router";
import {generateRandomBackground, getDarkColor} from "../../utils/backgrounds";

function CreateClass() {
  const { setMsg } = useMsg();
  const { currentUser } = useAuth();
  const { loading, createClass } = useClassroom();
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (className && subjectName && subjectCode) {
      let newClass = {
        className,
        subjectName,
        subjectCode,
        teacher: currentUser.email,
        students: [],
        createdAt: database.getCurrentTimestamp(),
        styling: {
          color: getDarkColor(),
          background: generateRandomBackground()
        }
      };
      let res = await createClass(newClass);
      if (res.error) {
        setMsg(res.error);
      } else {
        setMsg(res.msg);
        setClassName("");
        setSubjectName("");
        setSubjectCode("");
        let { id } = res.data;
        history.push(`/classroom/${id}`);
      }
    } else {
      setMsg("Empty Fields aren't allowed!");
    }
  };

  return (
    <Container style={{paddingTop: "5rem",}}>
      <Typography variant="h4">Create New Class</Typography>
      <Card elevation={0} style={{ margin: 0, padding: 0}}>
        <CardContent style={{ margin: 0, padding: 0}}>
          <TextField
            className="w-100 my-2"
            label="Class name"
            required
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <TextField
            className="w-100 my-2"
            label="Subject name"
            required
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <TextField
            className="w-100 my-2"
            label="Subject code"
            required
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            className="w-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default CreateClass;
