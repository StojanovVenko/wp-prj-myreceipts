import React, {useEffect, useState} from "react";
import SmetkiService from "../../../../../service/smetkiService";
import {Link} from "react-router-dom";

const Smetka = (props) => {

    let [hide, setHide] = useState(true);
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
               <b> {proizvod.kolichina}</b>
           </div>
           <div className="col-sm-3">
               <b>{proizvod.cena}</b>
           </div>
           <div className="col-sm-6">
               <b> {proizvod.proizvod.ime}</b>
           </div>

       </div>
    });



    return (
        <div className="card shadow mb-4 ">
            <a href={"#collapseCardExample" + props.index} className="d-block card-header py-3" data-toggle="collapse"
               role="button" aria-expanded="true" aria-controls={"collapseCardExample" + props.index}>
                <div className="row text-center">
                    {/*smetka[0] -id, [1] smetka.datum, [2].vkupenIznos, [3] imeProdavnica, [4] imeFirma*/}
                    <div className="col-sm-3">
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date(props.smetka.datum))}
                    </div>
                    <div className="col-sm-3">{props.smetka.vkupenPromet} ден</div>
                    <div className="col-sm-3">{props.smetka.prodavnica.ime}</div>
                    <div className="col-sm-3">{props.smetka.prodavnica.grad.ime}</div>
                </div>

            </a>
            {/*// <!-- Card Content - Collapse -->*/}
            <div className={"collapse hide"} id={"collapseCardExample" + props.index}>
                <div className="card-body row">
                    <div className="col-sm-2">

                    </div>
                    <div className="col-sm-8 ">
                        Фирма:
                        <Link to={{
                            pathname: `/firmi`,
                            state: { idFirma: props.smetka.prodavnica.firma.idFirma,
                                idProdavnica: -1,
                                imeProdavnica: "Сите продавници",
                                idGrad: -1,
                                imeGrad: "Избери град",
                                lookFirma: true,
                            firma: props.smetka.prodavnica.firma}
                        }}> {props.smetka.prodavnica.firma.ime}, {props.smetka.prodavnica.firma.adresa}
                        </Link>
                        - <Link to={{
                        pathname: `/firmi`,
                        state: { idFirma: props.smetka.prodavnica.firma.idFirma,
                            idProdavnica: -1,
                            imeProdavnica: "Сите продавници",
                            idGrad: props.smetka.prodavnica.firma.grad.idGrad,
                            imeGrad: props.smetka.prodavnica.firma.grad.ime,
                            lookFirma: false,
                            firma: props.smetka.prodavnica.firma}
                    }}>{props.smetka.prodavnica.firma.grad.ime}</Link>
                        <br/>
                        Продавница: <Link to={{
                        pathname: `/firmi`,
                        state: { idFirma: props.smetka.prodavnica.firma.idFirma,
                            idProdavnica: props.smetka.prodavnica.idProdavnica,
                            imeProdavnica: props.smetka.prodavnica.ime,
                            idGrad: -1,
                            imeGrad: "Избери град",
                            lookFirma: true,
                            firma: props.smetka.prodavnica.firma}
                    }}> {props.smetka.prodavnica.ime}, {props.smetka.prodavnica.adresa}</Link>
                        -
                        <Link to={{
                        pathname: `/firmi`,
                        state: { idFirma: props.smetka.prodavnica.firma.idFirma,
                            idProdavnica: -1,
                            imeProdavnica: "Сите продавници",
                            idGrad: props.smetka.prodavnica.grad.idGrad,
                            imeGrad: props.smetka.prodavnica.grad.ime,
                            lookFirma: false,
                            firma: props.smetka.prodavnica.firma}
                    }}>{props.smetka.prodavnica.grad.ime}</Link>

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


                        <div className="col-sm">

                        </div>
                    </div>

                </div>
                <div className="card-footer">
                    Вкупен промет: <b>{cena}</b><br/>
                    Вкупно ДДВ: {props.smetka.vkupnoDDV}
                </div>
            </div>
        </div>

    )

};
export default Smetka;
