import React from "react";
import "./css/App.css";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";


import ReactBootstrapTableTLM from "./Table";


export default function App() {
  return (
    <div className="App">
        <div className="body">
      <Container>
          <div className="container">
        <Paper>
          <ReactBootstrapTableTLM />
        </Paper>
        </div>
      </Container>
    </div>
    </div>
  );
}
