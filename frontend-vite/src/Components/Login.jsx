import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    paper: {
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        borderRadius: 16,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1.5),
        fontWeight: "bold",
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 700,
        color: "#333",
    },
}));

const Login = () => {
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
                if (data.role === "ROLE_ADMIN") {
                    history.push("/admin");
                } else {
                    history.push("/user");
                }
                window.location.reload(); // To update state in App if needed, or use Context
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
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
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

export default Login;
