import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

const Login = () => {

    return (
        <div className="container pt-5 pb-5">

            {/*// <!-- Outer Row -->*/}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/*// <!-- Nested Row within Card Body -->*/}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"/>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center pt-3 pb-3">
                                            <h1 className="h4 text-gray-900 mb-4">Добредојдовте!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                       id="exampleInputEmail" aria-describedby="emailHelp"
                                                       placeholder="Е-пошта"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Лозинка"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input"
                                                           id="customCheck"/>
                                                    <label className="custom-control-label" htmlFor="customCheck">
                                                        Запомни ме
                                                    </label>
                                                </div>
                                            </div>
                                            <Link to={"/pochetna"} className="btn btn-primary btn-user btn-block">
                                                Најави се
                                            </Link>
                                            <Link to={"/register"} className="btn btn-light btn-user btn-block">
                                                Регистрација
                                            </Link>


                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link to="" className="small" >Заборавена лозинка?</Link>
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
};

export default withRouter(Login);
