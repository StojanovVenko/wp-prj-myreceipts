import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import AuthService from "../../../service/authService";

const Header = (props) => {

    const handleLogout = () => {
        props.history.push({
            pathname: 'login'
        });
        props.logout();
    };

    let [currUser, setCurrUser] = useState("User");
    useEffect(() => {
        AuthService.getCurrentUser()
            .then(response => {
                setCurrUser(response.data.name);
            }).catch();
    },[]);

    return (

                // <!-- Topbar -->
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*// <!-- Sidebar Toggle (Topbar) -->*/}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"/>
                    </button>

                    {/*// <!-- Kreiraj nova fiskalna btn -->*/}
                    {/*<form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">*/}
                    {/*    <Link to="/smetki/dodadi" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"/> Додади нова фискална сметка</Link>*/}
                    {/*</form>*/}

                    {/*// <!-- Topbar Navbar -->*/}
                    <ul className="navbar-nav ml-auto" >

                        <div className="topbar-divider d-none d-sm-block"/>

                        {/*// <!-- Nav Item - User Information -->*/}
                        <li className="nav-item dropdown no-arrow text-center">
                            <Link to="" className="nav-link dropdown-toggle"  id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small"  style={{minWidth:"100px"}}>{currUser}</span>
                                <img className="img-profile rounded-circle" src={require('../../../user.png')} alt="" />
                            </Link>
                            {/*// <!-- Dropdown - User Information -->*/}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <Link to="/profil" className="dropdown-item">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                                    Твој профил
                                </Link>
                                <div className="dropdown-divider"/>
                                <div onClick={handleLogout} to="/login" className="dropdown-item">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                    Одјава
                                </div>
                            </div>
                        </li>

                    </ul>

                </nav>

    )

};
export default withRouter(Header);
