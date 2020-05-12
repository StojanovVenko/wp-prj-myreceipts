import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

const Register = () => {

    return (
        <div className="container pt-5 pb-5">

            <div className="card o-hidden border-0 shadow-lg my-5 ">
                <div className="card-body p-0">
                    {/*// <!-- Nested Row within Card Body -->*/}
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"/>
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
                                                   id="exampleFirstName" placeholder="Име"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleLastName" placeholder="Презиме"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user"
                                               id="exampleInputEmail" placeholder="Е-пошта"/>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleInputPassword" placeholder="Лозинка"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleRepeatPassword" placeholder="Повтори лозинка"/>
                                        </div>
                                    </div>
                                    <Link to="" className="btn btn-primary btn-user btn-block">
                                        Регистрирај се
                                    </Link>
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
};

export default withRouter(Register);
