import React, {useEffect, useState} from "react";
import SmetkiService from "../../../../../../service/smetkiService";
import {Link} from "react-router-dom";

const SmetkaDetailsEdit = (props) => {

    let [state, setState] = useState([]);

    useEffect(() => {
        SmetkiService.getSmetkaIfno(props.smetkaProps !== undefined ? props.smetkaProps.smetka.idSmetka : 0)
            .then(response => {
                setState(response.data);
                console.log("daataa  " + response.data)
            }).catch();
    }, []);

    const saveSmetka = (e) => {

    };

    if (props.smetkaProps === undefined) {
        return <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h5 className="card-title">Ажурирање на сметка</h5>

            </div>
            <div className="card-body">
                <img className="rounded-circle " src={require('../../../../../../fiskalni.jpg')} width="70%"
                     height="200px"/>

                <hr/>
                Избери сметка за која што сакаш да ги погледнеш деталите
            </div>
        </div>
    }

    let cena = 0.0;
    let proizvodi = props.proizvodiProps.map((proizvod, index) => {
        cena += proizvod.kolichina * proizvod.cena;
        return <div className="mt-2 mb-2 row">
            <div className="col-sm-3">
              <input className="form-control" name={"kolichina-" + index}  value={proizvod.kolichina} />
            </div>
            <div className="col-sm-3">
                <input className="form-control" name={"cena-" + index}  value={proizvod.cena} />
            </div>
            <div className="col-sm-6">
                <input className="form-control" name={"ime-" + index}  value={proizvod.proizvod.ime} />
            </div>

        </div>
    });

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h5 className="card-title">Ажурирање на сметка</h5>
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
                                 Вкупно ДДВ:
                            </span>
                    <span className="pl-3">
                                <input className="form-control" name="ddv" value={props.smetkaProps.smetka.vkupnoDDV} />
                            </span>
                </div>
                <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                даночен број:
                            </span>
                    <span className="pl-3">
                                 <input className="form-control" name="danochenBroj" value={props.smetkaProps.smetka.danochenBroj}/>
                            </span>
                </div>
                <div className="row">
                            <span style={{width: "35%"}} className="text-right">
                                ДДВ број:
                            </span>
                    <span className="pl-3">
                               <input className="form-control" name="ddvBroj" value={props.smetkaProps.smetka.ddvBroj} />
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

                <div className="row">
                    <div className="col-sm-6">
                        <Link onClick={() => props.editMode(false)} className="btn btn-outline-primary btn-block">
                            Назад
                        </Link>
                    </div>
                    <div className="col-sm-6">
                        <input type="button" onclick={saveSmetka} className="btn btn-outline-primary btn-block" value="Зачувај" />
                    </div>
                </div>
            </div>
        </div>
    )

};

export default SmetkaDetailsEdit;
