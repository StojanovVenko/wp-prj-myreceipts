import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

const Sidebar = (props) => {


    return (

        // <!-- Sidebar -->
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*// <!-- Sidebar - Brand -->*/}
            <Link to="/pochetna" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"/>
                </div>
                <div className="sidebar-brand-text mx-3">myreceipts</div>
            </Link>

            {/*// <!-- Divider -->*/}
            <hr className="sidebar-divider my-0"/>

                {/*// <!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link to="/pochetna" className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"/>
                        <span>Почетна</span></Link>
                </li>

                {/*// <!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                    {/*// <!-- Heading -->*/}
                    <div className="sidebar-heading">
                        МОИ
                    </div>

                    {/*// <!-- Nav Item - Pages Collapse Menu -->*/}
                    <li className="nav-item">
                        <Link to="/smetki" className="nav-link">
                            <i className="fas fa-fw fa-chart-area"/>
                            <span>Фискални сметки</span></Link>
                    </li>


                    {/*// <!-- Nav Item - Utilities Collapse Menu -->*/}
                    <li className="nav-item">
                        <Link to="/zadachi" className="nav-link">
                            <i className="fas fa-fw fa-wrench"/>
                            <span>Задачи</span></Link>
                    </li>


                    {/*// <!-- Divider -->*/}
                    <hr className="sidebar-divider"/>

                        {/*// <!-- Nav Item - Pages Collapse Menu -->*/}
                        <li className="nav-item">
                            <Link to="" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages" aria-haspopup="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-folder"/>
                                <span>Разгледај производи</span>
                            </Link>
                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Барам производи во:</h6>
                                    <Link to="/prodavnici" className="collapse-item" >Продавница</Link>
                                    <Link to="/firmi" className="collapse-item" >Фирма</Link>
                                    <Link to="/gradovi" className="collapse-item" >Град</Link>
                                    <div className="collapse-divider"/>
                                </div>
                            </div>
                        </li>
        </ul>

    )

};
export default withRouter(Sidebar);