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
        borderRadius: 0, // Squared off for strict B&W feel
        boxShadow: "none",
        border: "2px solid #000000",
        backgroundColor: "#ffffff",
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
        padding: theme.spacing(1.5),
        fontWeight: "bold",
        backgroundColor: "#000000",
        color: "#ffffff",
        textTransform: "uppercase",
        fontSize: "1rem",
        borderRadius: 0,
        border: "1px solid #000000",
        boxShadow: "none",
        transition: "all 0.2s",
        '&:hover': {
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: "none"
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
        fontStyle: "italic"
    }
}));

const AdminLogin = () => {
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
                    window.location.reload();
                } else {
                    AuthService.logout();
                    setMessage("Access Denied: Not an Admin account");
                }
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
                    Admin Portal
                </Typography>
                <Typography className={classes.subtitle}>
                    Enter your credentials to manage the system
                    <br />
                    <small>Default: admin / admin</small>
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
                        Sign In as Admin
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

export default AdminLogin;
