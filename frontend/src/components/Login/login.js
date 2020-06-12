import React, {useState} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {ACCESS_TOKEN} from "../../constants";
import Loader from 'react-loader-spinner';
import '../../../src/index.css';

const Login = (props) => {

    let [err, setErr] = useState("");
    let [usr, setUsr] = useState(props.location.state===undefined? "" : props.location.state.username );
    let [pass, setPass] = useState(props.location.state===undefined? "" : props.location.state.password );
    let [isLoading, setLoading] = useState(false);

        const validate = (e) => {
            e.preventDefault();
            setErr("");

            let mail = document.getElementById("email");
            let pass = document.getElementById("password");
            let message = document.getElementById("message");

            message.hidden = !(mail.value === "" || pass.value.length < 6);

            if(!message.hidden){
                return;
            }
            setLoading(true);
            let request = {
                usernameOrEmail: mail.value,
                password: pass.value
            };
            props.onLogin(request)
                .then((response) => {
                    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                    props.getUser();
                    props.history.push('pochetna');
                }).catch(err => {
                 setErr("Не постои таква сметка!")
                setLoading(false);
            });
        };

        if(isLoading) {
            return <div className="container pt-5 pb-5">

                {/*// <!-- Outer Row -->*/}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/*// <!-- Nested Row within Card Body -->*/}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-custom-login-image"/>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center pt-3 pb-3">
                                                <h1 className="h4 text-gray-900 mb-4">Добредојдовте!</h1>
                                            </div>
                                            <form className="user pt-4" >
                                                <Loader
                                                type="TailSpin"
                                                color="#00BFFF"
                                                height={100}
                                                width={100}
                                                timeout={100000} //3 secs

                                            />
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input"
                                                               id="customCheck"/>
                                                        <label className="custom-control-label" htmlFor="customCheck">
                                                            Запомни ме
                                                        </label>
                                                    </div>
                                                </div>


                                                <Link onClick={validate} className="btn btn-primary btn-user btn-block">
                                                    Најави се
                                                </Link>
                                                <Link to={"/register"} className="btn btn-light btn-user btn-block">
                                                    Регистрација
                                                </Link>


                                            </form>
                                            <hr/>
                                            <div className="text-center">
                                                <Link to="" className="small">Заборавена лозинка?</Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>;

        }

        return (
            <div className="container pt-5 pb-5">

                {/*// <!-- Outer Row -->*/}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/*// <!-- Nested Row within Card Body -->*/}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-custom-login-image"/>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center pt-3 pb-3">
                                                <h1 className="h4 text-gray-900 mb-4">Добредојдовте!</h1>
                                            </div>
                                            <form className="user" >
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                           id="email" aria-describedby="emailHelp"
                                                           value={usr}
                                                           onChange={event => setUsr(event.target.value)}
                                                           placeholder="Е-пошта или корисничко име"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                           value={pass}
                                                           onChange={event => setPass(event.target.value)}
                                                           id="password" placeholder="Лозинка"/>
                                                </div>
                                                <div id="message" hidden>
                                                    <p className="text-danger"><b>Невалидни внесени податоци</b></p>
                                                </div>
                                                <p className="text-center text-danger"><b>{err}</b></p>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input"
                                                               id="customCheck"/>
                                                        <label className="custom-control-label" htmlFor="customCheck">
                                                            Запомни ме
                                                        </label>
                                                    </div>
                                                </div>


                                                <Link onClick={validate} className="btn btn-primary btn-user btn-block">
                                                    Најави се
                                                </Link>
                                                <Link to={"/register"} className="btn btn-light btn-user btn-block">
                                                    Регистрација
                                                </Link>


                                            </form>
                                            <hr/>
                                            <div className="text-center">
                                                <Link to="" className="small">Заборавена лозинка?</Link>
                                            </div>

                                        </div>
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

export default withRouter(Login);
