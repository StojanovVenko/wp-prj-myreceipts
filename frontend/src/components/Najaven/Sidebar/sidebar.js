import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";


const Sidebar = (props) => {

    const clickProizvodiOrFirmi = () => {
        props.history.push({
            pathname:'firmi',
            state: { idFirma: -1, idProdavnica: -1, imeProdavnica: "Сите продавници",
                idGrad: -1, imeGrad: "Избери град", lookFirma: true,
                firma: {ime: "Избери фирма", idFirma: -1, grad: {ime: ""}}}
        });
    };

    const clickProizvodiOrFirmiProdukti = () => {
        props.history.push({
            pathname:'proizvodi',
            state: { idFirma: -1, idProdavnica: -1, imeProdavnica: "Сите продавници",
                idGrad: -1, imeGrad: "Сите градови", lookFirma: true,
                firma: {ime: "Сите фирми", idFirma: -1, grad: {ime: ""}}}
        });
    };

    const clickGradovi = () => {
        props.history.push({
            pathname:'firmi',
            state: { idFirma: -1, idProdavnica: -1, imeProdavnica: "Сите продавници",
                idGrad: -1, imeGrad: "Избери град", lookFirma: false,
                firma: {ime: "Избери фирма", idFirma: -1, grad: {ime: ""}}}
        });
    };

    const clickGradoviProdukti = () => {
        props.history.push({
            pathname:'proizvodi',
            state: { idFirma: -1, idProdavnica: -1, imeProdavnica: "Сите продавници",
                idGrad: -1, imeGrad: "Сите градови", lookFirma: false,
                firma: {ime: "Сите фирми", idFirma: -1, grad: {ime: ""}}}
        });
    };


    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

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
                            <i className="fas fa-fw fa-store"/>
                            <span>Сите фискални сметки</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/proizvodi" className="nav-link">
                            <i className="fas fa-fw fa-shopping-cart" />
                            <span>Мои производи</span></Link>
                    </li>



                    {/*// <!-- Divider -->*/}
                    <hr className="sidebar-divider"/>

                        {/*// <!-- Nav Item - Pages Collapse Menu -->*/}
                        <li className="nav-item">
                            <Link to="" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages" aria-haspopup="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-receipt"/>
                                <span> Разгледај фискални</span>
                            </Link>
                            <div id="collapsePages" className="collapse " aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header"> Барам фискални во: </h6>
                                    <div onClick={clickProizvodiOrFirmi} className="collapse-item">Продавница</div>
                                    <div onClick={clickProizvodiOrFirmi} className="collapse-item">Фирма</div>
                                    <div onClick={clickGradovi} className="collapse-item">Град</div>
                                    <div className="collapse-divider"/>
                                </div>
                            </div>
                        </li>

            <li className="nav-item">
                <Link to="" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages2" aria-haspopup="true" aria-controls="collapsePages2">
                    <i className="fas fa-fw fa-database"/>
                    <span> Разгледај производи</span>
                </Link>
                <div id="collapsePages2" className="collapse " aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header"> Барам производи во: </h6>
                        <div onClick={clickProizvodiOrFirmiProdukti} className="collapse-item">Продавница</div>
                        <div onClick={clickProizvodiOrFirmiProdukti} className="collapse-item">Фирма</div>
                        <div onClick={clickGradoviProdukti} className="collapse-item">Град</div>
                        <div className="collapse-divider"/>
                    </div>
                </div>
            </li>
        </ul>
    )

};
export default withRouter(Sidebar);
