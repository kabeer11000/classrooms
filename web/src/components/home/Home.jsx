import React, { useEffect, useState } from "react";
import {Container, Divider, Grid, Typography} from "@mui/material";
import { useClassroom } from "../../contexts/ClassroomContext";
import Class from "./Class";
import NoClass from "./NoClass";
import Loading from "../../containers/Loading";
import AddClass from "./AddClass";

function Home() {
  const [classesAsTeacher, setClassesAsTeacher] = useState(null);
  const [classesAsStudent, setClassesAsStudent] = useState(null);
  const { loading, getClassesAsTeacher, getClassesAsStudent } = useClassroom();

  useEffect(() => {
    getClassesAsTeacher().then((docs) => setClassesAsTeacher(docs));
  }, []);

  useEffect(() => {
    getClassesAsStudent().then((docs) => setClassesAsStudent(docs));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {classesAsTeacher?.length ? (
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <Typography variant={"button"} color={"secondary"}>Teaching</Typography>
          </Grid>
          {classesAsTeacher.map((item) => (
            <Class item={item} key={item.id} />
          ))}
        </Grid>
      ): null}

      {(classesAsTeacher?.length && classesAsStudent?.length) ? (
          <Divider className="my-3 bg-secondary" />
      ) : null}

      {classesAsStudent?.length ? (
          <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
              <Typography variant={"button"} color={"secondary"}>Student</Typography>
            </Grid>
            {classesAsStudent.map((item) => (
                <Class item={item} key={item.id} />
            ))}
          </Grid>
      ) : null}

      {(classesAsTeacher?.length === 0 && classesAsStudent?.length === 0) && (
          <NoClass />
      )}

      <AddClass />
      {/*<img style={{position: "absolute", height: "40vh", width: "40vh", opacity: .2, bottom: 0, right: 0, zIndex: 999}} src={"https://cdn.dribbble.com/users/1850746/screenshots/5287424/media/af5d51f9330451925324b7ec0fda0925.png?compress=1&resize=400x300&vertical=top"}/>*/}
    </div>
  );
}

export default Home;
