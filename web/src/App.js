import React from "react";
import "./App.css";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import AppRoute from "./routes/AppRoute";
import {MsgProvider} from "./contexts/MsgContext";
import CustomSnackBar from "./containers/CustomSnackBar";
import {ClassroomProvider} from "./contexts/ClassroomContext";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#8BC34A',
        },
        secondary: {
            main: '#CDDC39',
        },
    },
    overrides: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "sm"
            }
        }
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router basename={"/class"}>
                <AuthProvider>
                    <MsgProvider>
                        <ClassroomProvider>
                            <AppRoute/>
                            <CustomSnackBar/>
                        </ClassroomProvider>
                    </MsgProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
