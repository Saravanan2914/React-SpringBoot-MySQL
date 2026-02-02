import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../services/auth.service";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export default function AddStudent() {
  const classes = useStyles();
  const history = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1998-04-02T21:11:54")
  );
  const [name, setName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleDateChange = date => setSelectedDate(date.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handlDepartmentChange = event => setDepartment(event.target.value);
  const handleGenderChange = event => setGender(event.target.value);

  const [message, setMessage] = React.useState("Nothing saved in the session");

  const logout = () => {
    AuthService.logout();
    history.push("/");
  }

  async function sampleFunc(toInput) {
    try {
      const response = await axios.post("/api/student", toInput, {
        headers: AuthService.authHeader()
      });
      console.log(response.data.id);
      setMessage(response.data.id ? "Data successfully updated" : "Data updation failed");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMessage("Unauthorized!");
      } else {
        setMessage("Error saving data");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Fixed missing preventDefault
    const toInput = { name, department, gender, dob: selectedDate };
    sampleFunc(toInput);
    setName("");
    setDepartment("");
    setGender("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Student Directory (Admin)
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                value={name}
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="department"
                name="department"
                variant="outlined"
                required
                fullWidth
                value={department}
                id="department"
                label="Department"
                onChange={handlDepartmentChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gender"
                value={gender}
                label="Gender"
                name="gender"
                autoComplete="gender"
                onChange={handleGenderChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Date of birth"
                type="date"
                defaultValue="0000-00-00"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleDateChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>

          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Link to="/view">View Student Records</Link>
            </Grid>
            <Grid item>
              <Button onClick={logout} color="secondary" size="small">Logout</Button>
            </Grid>
          </Grid>

        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
