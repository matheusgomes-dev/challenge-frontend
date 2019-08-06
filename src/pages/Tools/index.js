import React, { Component } from "react";
import { Form, Input } from "@rocketseat/unform";
import { Button, Card, CardBody, Table } from "reactstrap";
import * as Icons from "react-feather";

import "./tools.css";

export default class Tools extends Component {
  render() {
    return (
      <div className="container">
        <div style={{ paddingTop: "1.8rem" }}>
          <p className="title-card side-block">VUTTR</p>
          <Button
            outline
            color="primary"
            className="btn-sm side-block float-right mr-4"
          >
            New Tool
          </Button>
        </div>

        <CardBody className="no-padding-horizontal" />
      </div>
    );
  }
}
