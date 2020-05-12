import React, {useEffect, useState} from "react";
import SmetkiService from "../../../../../../service/smetkiService";
import {Link} from "react-router-dom";

const SmetkaDetails = (props) => {
    let [state, setState] = useState([]);
    useEffect(() => {
        console.log("daataa  ");

        SmetkiService.getSmetkaIfno(props.smetkaProps!==undefined? props.smetkaProps.smetka.idSmetka: 0)
            .then(response => {
                setState(response.data);
                console.log("daataa  " + response.data)
            }).catch();
    },[]);


    if(props.smetkaProps === undefined)
        return <div className="display-4"><br/>Избери сметка од табелата</div>;


    let cena = 0.0;
    let proizvodi = props.proizvodiProps.map((proizvod,index) => {
        cena += proizvod.kolichina * proizvod.cena;
        return <div className="mt-2 mb-2 row">
            <div className="col-sm-3">
                {proizvod.kolichina}
            </div>
            <div className="col-sm-3">
                {proizvod.cena}
            </div>
            <div className="col-sm-6">
                {proizvod.proizvod.ime}
            </div>

        </div>
    });

    return(
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h5 className="card-title">Детали за сметка</h5>
                <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                         aria-labelledby="dropdownMenuLink">
                        {/*<div className="dropdown-header">Dropdown Header:</div>*/}
                        <Link to="" className="dropdown-item">Измени</Link>
                        {/*<div className="dropdown-divider"/>*/}
                        <Link to="" className="dropdown-item" >Избриши</Link>
                    </div>
                </div>
                </div>
                    <div className="card-body">
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                фирма:
                            </span>
                            <span className="pl-3">
                                {props.smetkaProps.smetka.prodavnica.firma.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                продавница:
                            </span>
                            <span className="pl-3">
                                {props.smetkaProps.smetka.prodavnica.ime} - {props.smetkaProps.smetka.prodavnica.grad.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                даночен број:
                            </span>
                            <span className="pl-3">
                                {props.smetkaProps.smetka.danochenBroj} - {props.smetkaProps.smetka.prodavnica.grad.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                ДДВ број:
                            </span>
                            <span className="pl-3">
                                {props.smetkaProps.smetka.ddvBroj}
                            </span>
                        </div>
                        <hr/>
                        <div className="mt-2 mb-2 row  text-center">
                            <div className="col-sm-3">
                                количина
                            </div>
                            <div className="col-sm-3">
                                цена
                            </div>
                            <div className="col-sm-6">
                                производ
                            </div>
                        </div>
                        {proizvodi}
                    </div>

                    <div className="card-body">
                        <hr/>
                        Вкупен промет: <b>{cena}</b><br/>
                        Вкупно ДДВ: {props.smetkaProps.smetka.vkupnoDDV}
                    </div>
            </div>
    )

};

export default SmetkaDetails;
