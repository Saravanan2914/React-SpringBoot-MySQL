import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    paper: {
        padding: theme.spacing(6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 380,
        borderRadius: 0,
        boxShadow: "none",
        border: "2px solid #000000", // Consistent B&W theme
        backgroundColor: "#ffffff",
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
        padding: theme.spacing(1.5),
        fontWeight: "bold",
        backgroundColor: "#ffffff",
        color: "#000000",
        textTransform: "uppercase",
        fontSize: "1rem",
        borderRadius: 0,
        border: "2px solid #000000",
        boxShadow: "none",
        transition: "all 0.2s",
        '&:hover': {
            backgroundColor: "#000000",
            color: "#ffffff",
        }
    },
    title: {
        marginBottom: theme.spacing(1),
        fontWeight: 800,
        color: "#000000",
        textTransform: "uppercase",
        letterSpacing: "1px"
    },
    subtitle: {
        color: "#000000",
        marginBottom: theme.spacing(3),
        fontSize: "0.9rem",
    }
}));

const UserLogin = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");

        AuthService.login(username, password).then(
            (data) => {
                // Allow both roles to login here, or restrict? 
                // User requested "separate", so likely implies only "User" should login here.
                // But often Admins can access User areas. 
                // Let's restrict to strict 'Normal User' behavior for clarity, or just log in.
                // If Admin logs in here, they get user view.
                history.push("/user");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        );
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={10}>
                <Typography component="h1" variant="h4" className={classes.title}>
                    Welcome Back
                </Typography>
                <Typography className={classes.subtitle}>
                    Sign in to access your dashboard
                    <br />
                    <small>Default: user / user</small>
                </Typography>
                <form onSubmit={handleLogin} style={{ width: "100%" }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign In as User
                    </Button>
                    {message && (
                        <Typography color="error" variant="body2" align="center">
                            {message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </div>
    );
};

export default UserLogin;
