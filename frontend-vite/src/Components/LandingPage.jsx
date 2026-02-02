import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Typography,
    Paper,
    makeStyles,
    Grid
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
        padding: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 0,
        boxShadow: "none",
        border: "3px solid #000000", // Thick border for main page
        backgroundColor: "#ffffff",
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 900,
        color: "#000000",
        textTransform: "uppercase",
        letterSpacing: "2px"
    },
    button: {
        padding: theme.spacing(2, 4),
        fontSize: "1.2rem",
        borderRadius: 0,
        width: "100%",
        marginBottom: theme.spacing(2),
        textTransform: "uppercase",
        fontWeight: "bold",
        transition: "all 0.2s",
        border: "2px solid #000000",
    },
    adminBtn: {
        background: "#000000",
        color: "#ffffff",
        "&:hover": {
            background: "#ffffff",
            color: "#000000",
            boxShadow: "none"
        }
    },
    userBtn: {
        background: "#ffffff",
        color: "#000000",
        "&:hover": {
            background: "#000000",
            color: "#ffffff",
            boxShadow: "none"
        }
    }
}));

const LandingPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="sm">
                <Paper className={classes.paper}>
                    <Typography variant="h3" className={classes.title}>
                        Student Management System
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: 30, color: "#666" }}>
                        Please select your role to continue
                    </Typography>

                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <Button
                                component={Link}
                                to="/admin-login"
                                className={`${classes.button} ${classes.adminBtn}`}
                                variant="contained"
                            >
                                Admin Login
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to="/user-login"
                                className={`${classes.button} ${classes.userBtn}`}
                                variant="contained"
                            >
                                User Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default LandingPage;
