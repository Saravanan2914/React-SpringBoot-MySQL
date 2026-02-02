import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AuthService from "../services/auth.service";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `10px`,
    height: "100%",
    width: "99%",
    marginTop: theme.spacing(7)
  },
  link: {
    color: "rgba(0,0,0,0.65)",
    textDecoration: "none",
    marginLeft: "10%",
    alignSelf: "flex-start",
    "&:hover": {
      color: "rgba(0,0,0,1)"
    }
  },
  logoutBtn: {
    marginBottom: theme.spacing(2)
  }
}));

export default function StudentTable() {
  const classes = useStyles();
  const history = useHistory();

  const [data, upDateData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const logout = () => {
    AuthService.logout();
    history.push("/");
  }

  React.useEffect(() => {
    async function sampleFunc() {
      try {
        const response = await axios.get("/api/student", {
          headers: AuthService.authHeader()
        });
        upDateData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        if (error.response && error.response.status === 401) {
          history.push("/");
        }
        setIsLoading(false);
      }
    }
    sampleFunc();
  }, [history]);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Student Directory
      </Typography>

      <Button onClick={logout} color="secondary" size="small" className={classes.logoutBtn}>Logout</Button>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          style={{ width: "80%", margin: "0 10px" }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Dob</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Link className={classes.link} to={AuthService.getCurrentUser()?.role === 'ROLE_ADMIN' ? "/admin" : "#"}>
        {" "}
        <Typography align="left">
          {AuthService.getCurrentUser()?.role === 'ROLE_ADMIN' ? "\u2190 Head back to save data" : ""}
        </Typography>{" "}
      </Link>
    </div>
  );
}
