import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  SearchBar,
  Chip,
} from "@material-ui/core";

import "./App.css";
import Header from "./components/Header"; //the compoonent for header gets imported from components/header...

const baseURL = "http://localhost:8000/getpopular"; //base URL for API endpoint

function App() {
  const [info, setInfo] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setInfo(response.data);
    });
  }, []);

  //function for searching the data

  const requestSearch = (searchedVal) => {
    const filteredRows = info.filter((row) => {
      return row.Item_name.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setInfo(filteredRows);
  };

  const cancelSearch = (searchedVal) => {
    axios.get(baseURL).then((response) => {
      setInfo(response.data);
    });
  };
  console.log(info);

  if (!info) return "We are working at the moment";

  return (
    <div className="App">
      <Header />
      <br />
      <br />
      <br />
      <Grid
        container
        direction="column"
        alignItems="center"
        //style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <div
            style={{
              top: "100vh",
              width: "80vw",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <form>
              <input
                type="text"
                placeholder="Search the popular products using their name!"
                name="search"
                autoFocus
                style={{
                  height: "6vh",
                  width: "80vw",
                  borderRadius: "30x",
                  textAlign: "center",
                  boxShadow: "2px 2px 2px 2px #0078AE",
                }}
                onChange={(event) => {
                  event.target.value == ""
                    ? cancelSearch(event.target.value)
                    : requestSearch(event.target.value);
                }}
              ></input>{" "}
            </form>{" "}
          </div>{" "}
        </Grid>{" "}
        <Grid item xs={12}>
          <Paper
            style={{
              width: "80vw",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      Name{" "}
                    </TableCell>{" "}
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      Tags{" "}
                    </TableCell>{" "}
                  </TableRow>{" "}
                </TableHead>
                <TableBody>
                  {" "}
                  {info.map((res) => (
                    <TableRow>
                      <TableCell align="center"> {res.Item_name} </TableCell>{" "}
                      <TableCell align="center">
                        <Chip
                          style={{
                            backgroundColor: "#00c8f7",
                            color: "#ffffff",
                            marginRight: "20px",
                          }}
                          label={`${res.quantity} purchased recently`}
                        ></Chip>
                        <Chip
                          style={{
                            backgroundColor: "#00c8f7",
                            color: "#ffffff",
                          }}
                          label={
                            res.date_difference > 59
                              ? `Recently purchased ${Math.round(
                                  res.date_difference / 60
                                )} hour ago`
                              : `Recently purchased ${res.date_difference} minutes ago`
                          }
                        />{" "}
                      </TableCell>{" "}
                    </TableRow>
                  ))}{" "}
                </TableBody>{" "}
              </Table>{" "}
            </TableContainer>{" "}
          </Paper>{" "}
        </Grid>{" "}
      </Grid>{" "}
      <br />
      <br />
      <br />
      <Chip
        label="Made for Snackpass Interview by Manish Paudel"
        color="secondary"
      />
    </div>
  );
}

export default App;
