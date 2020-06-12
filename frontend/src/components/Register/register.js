import React, {useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {ACCESS_TOKEN} from "../../constants";
import Auth from "../../service/authService";
import Loader from "react-loader-spinner";

const Register = (props) => {

        const validate = (e) => {
            e.preventDefault();

            let name = document.getElementById("name");
            let surname = document.getElementById("surname");
            let username = document.getElementById("username");
            let mail = document.getElementById("email");
            let pass = document.getElementById("password");
            let rPass = document.getElementById("repeatPassword");

            let msgName = document.getElementById("errMsgName");
            let msgSurname = document.getElementById("errMsgSurname");
            let msgUsername = document.getElementById("errMsgUsername");
            let msgEmail = document.getElementById("errMsgEmail");
            let msgPassword = document.getElementById("errMsgPassword");
            let msgPasswordDiff = document.getElementById("errMsgPasswordDiff");
            let msgError = document.getElementById("errServer");
            msgError.hidden = true;

            msgName.hidden = !(name.value === "");
            msgSurname.hidden = !(surname.value === "");
            msgUsername.hidden = !(username.value === "");
            msgEmail.hidden = !(mail.value === "");
            msgPassword.hidden = !(pass.value <= 6);
            msgPasswordDiff.hidden = !(pass.value !== rPass.value);

            if (!msgName.hidden || !msgSurname.hidden || !msgUsername.hidden || !msgEmail.hidden
                || !msgPassword.hidden || !msgPasswordDiff.hidden) {
                return;
            }

            let request = {
                name: name.value + " " + surname.value,
                username: username.value,
                email: mail.value,
                password: pass.value
            };
            Auth.register(request)
                .then((response) => {
                    props.history.push({
                        pathname:'login',
                        state: {
                            username: request.username,
                            password: request.password
                        }
                    });
                }).catch(err => {
                msgError.hidden = false;
            });

        };

        return (
            <div className="container pt-5 pb-5">

                <div className="card o-hidden border-0 shadow-lg my-5 ">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-custom-register-image"/>
                            <div className="col-lg-7 pt-3 pb-5">
                                <div className="p-5">
                                    <div className="text-center ">
                                        <h1 className="h4 text-gray-900 mb-4">Отвори нова сметка!</h1>
                                        <br/>

                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user"
                                                       id="name" placeholder="Име"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user"
                                                       id="surname" placeholder="Презиме"/>
                                            </div>

                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user text-center"
                                                       id="username" placeholder="Корисничко име"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                   id="email" placeholder="Е-пошта"/>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user"
                                                       id="password" placeholder="Лозинка"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user"
                                                       id="repeatPassword" placeholder="Повтори лозинка"/>
                                            </div>
                                        </div>
                                        <p id="errServer" hidden className="text-danger"><b>Настана грешка, податоците се невалидни. Ве молиме обидете се повторно</b></p>
                                        <p id="errMsgName" hidden className="text-danger"><b>Невалидно име</b></p>
                                        <p id="errMsgSurname" hidden className="text-danger"><b>Невалидно презиме</b></p>
                                        <p id="errMsgUsername" hidden className="text-danger"><b>Невалидно корисничко
                                            име</b>
                                        </p>
                                        <p id="errMsgEmail" hidden className="text-danger"><b>Невалидна Е-пошта</b></p>
                                        <p id="errMsgPassword" hidden className="text-danger"><b>Невалидна лозинка</b></p>
                                        <p id="errMsgPasswordDiff" hidden className="text-danger"><b>Лозинките не се
                                            совпаѓаат</b></p>
                                        <div onClick={validate} className="btn btn-primary btn-user btn-block">
                                            Регистрирај се
                                        </div>
                                        <hr/>
                                        <Link to="/login" className="btn btn-light btn-user btn-block">
                                            Имаш сметка? Најави се!
                                        </Link>
                                    </form>

                                    <div className="text-center">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
;

export default withRouter(Register);
