import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

const Header = () => {

    return (

                // <!-- Topbar -->
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*// <!-- Sidebar Toggle (Topbar) -->*/}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"/>
                    </button>

                    {/*// <!-- Kreiraj nova fiskalna btn -->*/}
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <Link to="/smetki/dodadi" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"/> Додади нова фискална сметка</Link>
                    </form>

                    {/*// <!-- Topbar Navbar -->*/}
                    <ul className="navbar-nav ml-auto">


                        {/*// <!-- Nav Item - Alerts -->*/}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <Link className="nav-link dropdown-toggle" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"/>
                                {/*// <!-- Counter - Alerts -->*/}
                                <span className="badge badge-danger badge-counter">3+</span>
                            </Link>
                            {/*// <!-- Dropdown - Alerts -->*/}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                                <Link to="" className="dropdown-item d-flex align-items-center" >
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item d-flex align-items-center" >
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item d-flex align-items-center">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item text-center small text-gray-500">Show All Alerts</Link>
                            </div>
                        </li>

                        {/*// <!-- Nav Item - Messages -->*/}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <Link to="" className="nav-link dropdown-toggle" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"/>
                                {/*// <!-- Counter - Messages -->*/}
                                <span className="badge badge-danger badge-counter">7</span>
                            </Link>
                            {/*// <!-- Dropdown - Messages -->*/}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <Link to="" className="dropdown-item d-flex align-items-center">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                                            <div className="status-indicator bg-success"/>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item d-flex align-items-center">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
                                            <div className="status-indicator"/>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item d-flex align-items-center">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
                                            <div className="status-indicator bg-warning"/>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item d-flex align-items-center">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""/>
                                            <div className="status-indicator bg-success"/>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </Link>
                                <Link to="" className="dropdown-item text-center small text-gray-500">Read More Messages</Link>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"/>

                        {/*// <!-- Nav Item - User Information -->*/}
                        <li className="nav-item dropdown no-arrow">
                            <Link to="" className="nav-link dropdown-toggle"  id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Венко Стојанов</span>
                                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="" />
                            </Link>
                            {/*// <!-- Dropdown - User Information -->*/}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <Link to="/profil" className="dropdown-item">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                                    Твој профил
                                </Link>
                                <Link to="/postavki" className="dropdown-item">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"/>
                                    Поставки
                                </Link>
                                <div className="dropdown-divider"/>
                                <Link to="/odjava" className="dropdown-item">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                    Одјава
                                </Link>
                            </div>
                        </li>

                    </ul>

                </nav>

    )

};
export default withRouter(Header);