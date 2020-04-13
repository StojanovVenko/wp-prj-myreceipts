import React, {useEffect, useState} from "react";
import SmetkiService from "../../../../../service/smetkiService";
import {Link} from "react-router-dom";

const Smetka = (props) => {

    let [state, setState] = useState([]);

    useEffect(() => {
        SmetkiService.getSmetkaIfno(props.smetka.idSmetka)
            .then(response => {
                setState(response.data);
                console.log(response.data)
            }).catch();
    },[]);
    let cena = 0.0;
    let proizvodi = state.map((proizvod,index) => {
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

    return (

        <div className="card shadow mb-4">
            {/*// <!-- Card Header - Accordion -->*/}
            <a href={"#collapseCardExample" + props.index} className="d-block card-header py-3" data-toggle="collapse"
               role="button" aria-expanded="true" aria-controls={"collapseCardExample" + props.index}>
                {/*<h6 className="m-0 font-weight-bold text-primary">*/}
                <div className="row text-center">
                    {/*smetka[0] -id, [1] smetka.datum, [2].vkupenIznos, [3] imeProdavnica, [4] imeFirma*/}
                    <div className="col-sm-3">{props.smetka.datum}</div>
                    <div className="col-sm-3">{props.smetka.vkupenPromet} ден</div>
                    <div className="col-sm-3">{props.smetka.prodavnica.ime}</div>
                    <div className="col-sm-3">{props.smetka.prodavnica.grad.ime}</div>
                </div>

            </a>
            {/*// <!-- Card Content - Collapse -->*/}
            <div className="collapse hide" id={"collapseCardExample" + props.index}>
                <div className="card-body row">
                    <div className="col-sm-2">

                    </div>
                    <div className="col-sm-8 ">
                        Фирма:
                        <Link to="#" onClick=""> {props.smetka.prodavnica.firma.ime}, {props.smetka.prodavnica.firma.adresa}</Link>
                        - <Link to="#" onClick="">{props.smetka.prodavnica.firma.grad.ime}</Link>
                        <br/>
                        Продавница: <Link to="#" onClick=""> {props.smetka.prodavnica.ime}, {props.smetka.prodavnica.adresa}</Link>
                        - <Link to="#" onClick="">{props.smetka.prodavnica.grad.ime}</Link>

                        <br/>
                        Даночен број: {props.smetka.danochenBroj}
                        <br/>
                        ДДВ број: {props.smetka.ddvBroj}
                        <hr/>
                        <div className="mt-2 mb-2 row ">
                            <div className="col-sm-3">
                                Количина
                            </div>
                            <div className="col-sm-3">
                                Цена
                            </div>
                            <div className="col-sm-6">
                                Производ
                            </div>

                        </div>
                        {proizvodi}
                        <hr/>
                        Вкупен промет: <b>{cena}</b><br/>
                        Вкупно ДДВ: {props.smetka.vkupnoDDV}
                        <div className="col-sm">

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )

};
export default Smetka;