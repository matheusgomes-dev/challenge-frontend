import React, { Component } from "react";
import { Form, Input } from "@rocketseat/unform";
import { Button, Fade } from "reactstrap";
import * as Icons from "react-feather";

import "./styles.css";

export default class ForgotPassword extends Component {
  state = {
    buttonDisabled: true,
    showLoading: false,
    fadeIn: true
  };

  forgotPassword = data => {
    console.log("data", data);
  };

  backLogin = () => {
    this.setState({ fadeIn: !this.state.fadeIn });
    this.props.backToLogin();
  };

  render() {
    return (
      <Fade in={this.state.fadeIn} timeout={150}>
        <a onClick={this.backLogin}>
          <Icons.ArrowLeft
            style={{
              position: "absolute",
              top: "1.5rem",
              marginLeft: "1.5rem",
              cursor: "pointer"
            }}
            size={29}
            color="#808080"
          />
        </a>

        <Form onSubmit={this.forgotPassword} id="form-esqueceu-senha">
          <p className="titulo">Esqueci minha senha</p>

          <p className="sub-titulo">Confirme seu e-mail para continuar.</p>

          <Input
            name="emailSenhaEsquecida"
            className="email-forget-pwd"
            type="email"
            placeholder="E-mail"
          />

          <Button
            id="btnReenviarSenha"
            type="submit"
            outline
            color="success"
            className="btn-forget-pwd btn-block"
            disabled={this.state.buttonDisabled}
          >
            {this.state.showLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span>ENVIAR</span>
            )}
          </Button>
        </Form>
      </Fade>
    );
  }
}
