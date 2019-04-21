import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { GoogleLoginService } from "../../store/services/googleService";

import { ButtonClick } from "../../theme/Button";
import Input from "../../theme/Input";
import Logo from "../../assets/svgComponents/VTCAlogo";
import ErrorMsg from "../../theme/FormElement/ErrorMsg";

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    redirect: Boolean(localStorage.getItem("_lgn"))
  };

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  login(response) {
    if (response !== undefined) {
      this.setState({
        redirect: true
      });
      var userProfile = response.profileObj;
      localStorage.setItem("_lgn", true);
      localStorage.setItem("_Ggrp", JSON.stringify(userProfile));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username === "admin" && this.state.password === "admin") {
      localStorage.setItem("_lgn", true);
      this.setState({
        errorMsg: "",
        redirect: true
      });
    } else if (this.state.username === "" || this.state.password === "") {
      this.setState({
        errorMsg: "Tên đăng nhập và mật khẩu không được để trống"
      });
    } else if (this.state.username !== "admin") {
      this.setState({
        errorMsg: "Tài khoản không tồn tại"
      });
    } else if (this.state.password !== "admin") {
      this.setState({
        errorMsg: "Sai mật khẩu"
      });
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={"/academic/dashbroad"} />;
    }
    const { username, password, errorMsg } = this.state;
    return (
      <div className="loginPage">
        <div className="loginForm">
          <form>
            <div>
              <Logo fill="#203e7d" height={45} width={250} />
            </div>
            <h6>Đăng nhập vào VTC Academy</h6>
            <Input
              value={username}
              onChange={e => this.handleChange("username", e.target.value)}
              placeholder="Tài khoản"
            />
            <Input
              value={password}
              onChange={e => this.handleChange("password", e.target.value)}
              placeholder="Mật khẩu"
              type="password"
            />
            <ErrorMsg error={errorMsg} />
            <ButtonClick
              onClick={e => this.handleSubmit && this.handleSubmit(e)}
              classes={"loginButton"}
              title={`Đăng nhập`}
            />
            <p>Hoặc</p>
            <GoogleLoginService
              className="googleButton"
              buttonText="Đăng nhập với google"
              login={response => this.login && this.login(response)}
            />
          </form>
        </div>
      </div>
    );
  }
}
