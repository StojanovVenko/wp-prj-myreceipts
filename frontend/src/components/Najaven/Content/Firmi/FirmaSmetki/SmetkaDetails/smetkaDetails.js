import React, {useEffect, useState} from "react";
import SmetkiService from "../../../../../../service/smetkiService";

const SmetkaDetails = (props) => {
    let [state, setState] = useState([]);
    useEffect(() => {
        console.log("daataa  ");

        SmetkiService.getSmetkaIfno(props.smetka!==undefined? props.smetka.smetka.idSmetka: 0)
            .then(response => {
                setState(response.data);
                console.log("daataa  " + response.data)
            }).catch();
    },[]);


    if(props.smetka === undefined) return <>Избери сметка</>;


    let cena = 0.0;
    let proizvodi = props.proizvodi.map((proizvod,index) => {
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
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Детали за сметка</h5>

                </div>
                    <div className="card-body">
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                фирма:
                            </span>
                            <span className="pl-3">
                                {props.smetka.smetka.prodavnica.firma.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                продавница:
                            </span>
                            <span className="pl-3">
                                {props.smetka.smetka.prodavnica.ime} - {props.smetka.smetka.prodavnica.grad.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                даночен број:
                            </span>
                            <span className="pl-3">
                                {props.smetka.smetka.danochenBroj} - {props.smetka.smetka.prodavnica.grad.ime}
                            </span>
                        </div>
                        <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                ДДВ број:
                            </span>
                            <span className="pl-3">
                                {props.smetka.smetka.ddvBroj}
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
                        Вкупно ДДВ: {props.smetka.smetka.vkupnoDDV}
                    </div>
            </div>
    )

};

export default SmetkaDetails;
