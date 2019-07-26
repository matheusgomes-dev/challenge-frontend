import React, { Component } from "react";
import {
  Button,
  Toast,
  ToastHeader,
  ToastBody,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Form, Input } from "@rocketseat/unform";
import * as Icons from "react-feather";
import "./styles.css";
/* import { authenticate } from "../../services/login";
import { Redirect } from "react-router-dom";
import { logout, isAuthenticated } from "./../../services/auth"; */

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      errorLogin: "",
      redirectToHome: false,
      showToastMessage: false,
      showLoading: false,
      buttonDisabled: false,
      showModal: false
    };

    this.controlToastMessage = this.controlToastMessage.bind(this);
    this.openCloseModal = this.openCloseModal.bind(this);
  }

  login = async data => {
    try {
      this.setState({
        showLoading: true,
        buttonDisabled: true
      });

      const { email, password } = data;

      if (!email || !password) {
        this.showMessage("Informe seu e-mail e senha, por favor.");
        return;
      }

      /* await authenticate(email, password);

      if (!isAuthenticated()) {
        this.showMessage(
          "Não foi possível realizar o login. Tente novamente, por favor.",
          4500
        );
        return;
      } */

      this.setState({ redirectToHome: true });
    } catch (e) {
      this.showMessage(
        "Houve um problema ao acessar. Verifique seus dados por favor.",
        4500
      );
    } finally {
      this.setState({
        showLoading: false,
        buttonDisabled: false
      });
    }
  };

  // controla o tempo de execução do toast
  controlToastMessage = timeExecution => {
    setTimeout(() => {
      this.setState({ showToastMessage: false });
    }, timeExecution);
  };

  // exibe a mensagem de alerta
  showMessage = (message, time = 3500) => {
    this.setState({
      errorLogin: message,
      showToastMessage: true
    });

    this.controlToastMessage(time);
  };

  // fecha a modal
  openCloseModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  // recuperar senha esquecida
  forgotPassword = data => {
    try {
      console.log(data);
      this.setState({
        showLoading: true,
        buttonDisabled: true
      });
    } catch (e) {
      this.showMessage(
        "Houve um problema ao enviar sua senha. Tente novamente, por favor.",
        4500
      );
    } finally {
      this.setState({
        showLoading: false,
        buttonDisabled: false
      });
    }
  };

  render() {
    /* if (this.state.redirectToHome) {
      return <Redirect to={"/dashboard"} />;
    } else {
      logout();
    } */

    return (
      <div className="login-container">
        <div className="float-right pr-5 pt-5">
          <Toast isOpen={this.state.showToastMessage}>
            <ToastHeader icon={<Icons.AlertCircle />}>Atenção</ToastHeader>
            <ToastBody>{this.state.errorLogin}</ToastBody>
          </Toast>
        </div>

        <div className="card-logo">
          <img
            className="card-title text-center mb-4 mt-1"
            src="image.png"
            alt="logo"
            height="90"
          />
        </div>

        <div className="container">
          <div className="card">
            <article className="card-body">
              <p id="title-card">Faça seu login</p>

              <div id="div-inputs">
                <Form onSubmit={this.login}>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <Icons.User />{" "}
                        </span>
                      </div>
                      <Input
                        id="txtEmail"
                        name="email"
                        className="form-control"
                        placeholder="E-mail"
                        type="email"
                      />
                    </div>
                  </div>

                  <hr />

                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <Icons.Lock />{" "}
                        </span>
                      </div>
                      <Input
                        id="txtSenha"
                        className="form-control"
                        placeholder="Senha"
                        type="password"
                        name="password"
                      />
                    </div>
                  </div>

                  <div className="form-group button-login">
                    <Button
                      type="submit"
                      className="btn-login"
                      block={true}
                      disabled={this.state.buttonDisabled}
                    >
                      {this.state.showLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <span>CONTINUAR</span>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>

              <Button
                type="button"
                id="btn-esqueceu-senha"
                onClick={this.openCloseModal}
              >
                Esqueci minha senha&nbsp;
                <Icons.ChevronRight size={14} />
              </Button>
            </article>
          </div>
        </div>

        <Modal isOpen={this.state.showModal} toggle={this.openCloseModal}>
          <ModalHeader toggle={this.openCloseModal}>
            Esqueci minha senha
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.forgotPassword} id="form-esqueceu-senha">
              <p>
                Esqueceu sua senha, né? Não tem problema. Nós vamos gerar uma
                nova senha para você, basta informar seu e-mail.
              </p>

              <Input
                name="emailSenhaEsquecida"
                className="form-control"
                type="email"
                placeholder="E-mail"
              />

              <hr />

              <Button
                id="btnEsqueceuSenha"
                type="submit"
                outline
                color="success"
                className="float-right"
                disabled={this.state.buttonDisabled}
              >
                {this.state.showLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span>Receber minha senha</span>
                )}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
