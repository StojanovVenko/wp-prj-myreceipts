import React from "react";
import {withRouter} from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuFirmi, CustomToggleFirmi} from "../FirimDropdown/FirmiDropdown";
import {CustomMenuGradovi, CustomToggleGradovi} from "../GradoviDropdown/gradoviDropdown";
import {CustomMenuProdavnici, CustomToggleProdavnici} from "../ProdavniciDropdown/prodavniciDropdown";
import CustomPicker from "../Smetki/Picker/picker";
import ProizvodiNaSmetkiService from "../../../../service/proizvodiNaSmetkaService";
import FirmiService from "../../../../service/firmiService";
import GradoviService from "../../../../service/gradoviService";
import ProizvodiNaSmetki from "../Firmi/ProizvodiNaSmetki/proizvodiNaSmetki";
// import DataTable from 'react-data-table-component';
import { MDBDataTableV5 } from 'mdbreact';

class ProizvodiStats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lookAbout: 0, //0 - se, 1 - grad, 2-firma, 3-prodavnica
            lookFirma: props.location.state !==undefined ? props.location.state.lookFirma : false,

            //grad
            idGrad: props.location.state !==undefined ? props.location.state.idGrad : -1,
            imeGrad: props.location.state !==undefined ? props.location.state.imeGrad : "Сите градови",

            //firma
            idFirma: props.location.state !== undefined ? props.location.state.firma.idFirma : -1,
            imeFirma:  props.location.state !==undefined ? props.location.state.firma.ime: "Сите фирми",

            //prodavnica
            idProdavnica: props.location.state !== undefined? props.location.state.idProdavnica : -1,
            imeProdavnica: props.location.state !== undefined? props.location.state.imeProdavnica: "Сите продавници",

            //listi
            listGradovi: [],
            listFirmi: [],
            listProdavnici: [],
            listProizvodiNaSmetki: [],


            //filtri
            loading: true,
            minPrice: props.minPrice===undefined? 0 : props.minPrice,
            maxPrice: props.maxPrice===undefined? 1000 : props.minPrice,
            startDate: props.startDate,
            endDate: props.endDate
        }

    }

    componentDidMount() {
        this.loadGradovi();
        this.loadFirmi();
        if(this.state.lookFirma){
            this.loadProizvodiVoFirma()
        } else {
            this.loadProizvodiVoGrad()
        }
    }

    loadGradovi = () => {
        GradoviService.getAllGradovi()
            .then(response => {
                this.setState({listGradovi: response.data});
            })
            .catch();
    };

    loadFirmi() {
        FirmiService.getAllFirmi().then(response => {
            this.setState({
                listFirmi: response.data
            });
        }).catch();
    }


    selectGrad = () => {
        this.loadProizvodiVoGrad(-1, "Сите продавници");
    };

    selectFirma = () => {
        this.loadProizvodiVoFirma(-1, "Сите продавници");
    };

    changeGrad(idGrad = -1, imeGrad = "Сите градови") {
        this.loadProizvodiVoGrad(-1, "Сите продавници",
            idGrad, imeGrad);
    }

    changeFirma(idFirma = -1, imeFirma = "Сите фирми", imeFirmaGrad = "град") {
        this.loadProizvodiVoFirma(-1, "Сите продавници",
            idFirma, imeFirma, imeFirmaGrad)
    }

    changeProdavnica(idProdavnica=-1, imeProdavnica = "Сите продавници") {
        this.loadProizvodi(idProdavnica, this.state.smetkiPageSize, idProdavnica, imeProdavnica);
    }

    setNewDate = (startDate, endDate) => {
        this.loadByDatum(startDate, endDate);
    };

    loadByDatum(start, end) {
        this.setState({
            loading: true
        });

        if (this.state.idProdavnica !== -1) {
            ProizvodiNaSmetkiService.getStatsForProizvodiInProdavnica(this.state.idProdavnica, this.state.minPrice,
                this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listProizvodiNaSmetki: response.data,
                        startDate: start,
                        endDate: end,
                        loading: false
                    });
                })
                .catch();
        } else if (this.state.lookFirma) {
            ProizvodiNaSmetkiService.getStatsForProizvodiInFirma(this.state.idFirma, this.state.minPrice,
                this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listProizvodiNaSmetki: response.data,
                        startDate: start,
                        endDate: end,
                        loading: false
                    });
                })
                .catch();
        } else if(this.state.idGrad!==-1) {
            ProizvodiNaSmetkiService.getStatsForProizvodiInCity(this.state.idGrad, this.state.minPrice,
                this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listProizvodiNaSmetki: response.data,
                        startDate: start,
                        endDate: end,
                        loading: false
                    });
                })
                .catch();
        } else {
            ProizvodiNaSmetkiService.getStatsForProizvodiAll(
                this.state.minPrice, this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listProizvodiNaSmetki: response.data,
                        startDate: start,
                        endDate: end,
                        loading: false
                    });
                })
                .catch();
        }


    }

    loadProizvodi(idProdavnica = this.state.idProdavnica, imeProdavnica = this.state.imeProdavnica) {
        if (this.state.lookFirma) {
            this.loadProizvodiVoFirma(idProdavnica, imeProdavnica);
        } else {
            this.loadProizvodiVoGrad(idProdavnica, imeProdavnica);
        }
    }

    loadProizvodiVoFirma(idProdavnica = this.state.idProdavnica,
                         imeProdavnica = this.state.imeProdavnica,
                         idFirma = this.state.idFirma,
                         imeFirma = this.state.imeFirma,
                         imeFirmaGrad = this.state.imeFirmaGrad) {
        this.setState({
            isLoading: true
        });

        let prodavnici = [];
        FirmiService.getAllProdavniciVoFirma(idFirma)
            .then(response => {
                prodavnici = response.data;
            }).catch();

        if (idProdavnica !== -1) {
            ProizvodiNaSmetkiService.getStatsForProizvodiInProdavnica(idProdavnica,
                this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
                .then(response => {
                    this.setState({
                        idFirma: idFirma,
                        idProdavnica: idProdavnica,
                        imeFirma: imeFirma,
                        imeFirmaGrad: imeFirmaGrad,
                        imeProdavnica: imeProdavnica,
                        listProdavnici: prodavnici,
                        listProizvodiNaSmetki: response.data,
                        lookFirma: true,
                        loading: false
                    })
                })
        } else {
            if (idFirma !== -1) {
                ProizvodiNaSmetkiService.getStatsForProizvodiInFirma(idFirma,
                    this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
                    .then(response => {
                        this.setState({
                            idFirma: idFirma,
                            idProdavnica: idProdavnica,
                            imeFirma: imeFirma,
                            imeFirmaGrad: imeFirmaGrad,
                            imeProdavnica: imeProdavnica,
                            listProdavnici: prodavnici,
                            listProizvodiNaSmetki: response.data,
                            lookFirma: true,
                            loading: false
                        })
                    })
            } else {
                ProizvodiNaSmetkiService.getStatsForProizvodiAll(
                    this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
                    .then(response => {
                        this.setState({
                            idFirma: idFirma,
                            idProdavnica: idProdavnica,
                            imeFirma: imeFirma,
                            imeFirmaGrad: imeFirmaGrad,
                            imeProdavnica: imeProdavnica,
                            listProdavnici: prodavnici,
                            listProizvodiNaSmetki: response.data,
                            lookFirma: true,
                            loading: false
                        })
                    })
            }
        }
    }

    loadProizvodiVoGrad(idProdavnica = this.state.idProdavnica,
                        imeProdavnica = this.state.imeProdavnica,
                        idGrad = this.state.idGrad,
                        imeGrad = this.state.imeGrad) {

        this.setState({
            loading: true
        });

        let prodavnici = [];
        GradoviService.getAllProdavniciVoGrad(idGrad)
            .then(response => {
                prodavnici = response.data
            }).catch();

        if (idProdavnica !== -1) {
            ProizvodiNaSmetkiService.getStatsForProizvodiInProdavnica(idProdavnica,
                this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
                .then(response => {
                    this.setState({
                        idGrad: idGrad,
                        idProdavnica: idProdavnica,
                        imeGrad: imeGrad,
                        imeProdavnica: imeProdavnica,
                        listProdavnici: prodavnici,
                        listProizvodiNaSmetki: response.data,
                        lookFirma: false,
                        loading: false
                    })
                })
        } else if (idGrad === -1) {
            ProizvodiNaSmetkiService.getStatsForProizvodiAll(this.state.minPrice, this.state.maxPrice,
                this.state.startDate, this.state.endDate)
                .then(response => {
                    this.setState({
                        idGrad: idGrad,
                        idProdavnica: idProdavnica,
                        imeGrad: imeGrad,
                        imeProdavnica: imeProdavnica,
                        listProdavnici: prodavnici,
                        listProizvodiNaSmetki: response.data,
                        lookFirma: false,
                        loading: false
                    })
                })
        } else {
            ProizvodiNaSmetkiService.getStatsForProizvodiInCity(idGrad,
                this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
                .then(response => {
                    this.setState({
                        idGrad: idGrad,
                        idProdavnica: idProdavnica,
                        imeGrad: imeGrad,
                        imeProdavnica: imeProdavnica,
                        listProdavnici: prodavnici,
                        listProizvodiNaSmetki: response.data,
                        lookFirma: false,
                        loading: false
                    })
                })
        }

    }

    render() {

        const gradoviDropdown = () => {

            let gradoviHtml = this.state.listGradovi.map((grad, index) => {
                return <Dropdown.Item eventKey={`${index}`}
                                      onClick={(e) => {
                                          this.changeGrad(e.target.attributes.getNamedItem('idgrad').value,
                                              e.target.attributes.getNamedItem('imegrad').value);
                                      }}
                                      idgrad={grad.idGrad}
                                      imegrad={grad.ime}>{grad.ime}</Dropdown.Item>;
            });

            return <> <label>Сакам да разгледам детали за:</label><br/>
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggleGradovi} id="dropdown-custom-components">
                                {this.state.imeGrad}
                            </Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenuGradovi}>
                                <Dropdown.Item onClick={(e) => {
                                                   this.changeGrad();
                                               }}
                                               idgrad={-1}
                                               imegrad={"Сите градови"}>Сите градови</Dropdown.Item>
                                {gradoviHtml}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </>;
        };

        const firmiDropdown = () => {
            let firmiHtml = this.state.listFirmi.map((firma, index) => {
                return <Dropdown.Item
                    eventKey={`${index}`}
                    onClick={(e) => {
                        this.changeFirma(
                            e.target.attributes.getNamedItem('data-idfirma').value,
                            e.target.attributes.getNamedItem('data-imeFirma').value,
                            e.target.attributes.getNamedItem('data-gradFirma').value);
                    }}
                    data-idfirma={firma.idFirma}
                    data-imeFirma={firma.ime}
                    data-gradFirma={firma.grad.ime}>
                    {firma.ime} - {firma.grad.ime}
                </Dropdown.Item>;
            });

            return <> <label>Сакам да разгледам детали за:</label><br/>
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8">
                        <Dropdown>

                            <Dropdown.Toggle as={CustomToggleFirmi} id="dropdown-custom-components">
                                {this.state.imeFirma} - {this.state.imeFirmaGrad}
                            </Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenuFirmi}>
                                <Dropdown.Item
                                    onClick={(e) => {
                                        this.changeFirma()                                    }}
                                    data-idfirma={-1}
                                    data-imeFirma={"Сите"}
                                    data-gradFirma={"фирми"}>
                                    Сите фирми
                                </Dropdown.Item>
                                {firmiHtml}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </>;
        };

        const prodavniciDropdown = () => {
            if (this.state.listProdavnici.length <= 1) return <></>;
            let init = <Dropdown.Item eventKey={`-1`} onClick={(e) => {
                this.changeProdavnica(-1);
            }}>Сите продавници</Dropdown.Item>;

            let prodavniciHtml = this.state.listProdavnici.map((prodavnica, index) => {
                return <Dropdown.Item
                    eventKey={`${index}`}
                    onClick={(e) => {
                        this.changeProdavnica(
                            e.target.attributes.getNamedItem('data-idprodavnica').value,
                            e.target.attributes.getNamedItem('data-imeProdavnica').value,
                        )
                    }}
                    data-idprodavnica={prodavnica.idProdavnica}
                    data-imeProdavnica={prodavnica.ime}>
                    {prodavnica.ime} - {prodavnica.grad.ime}
                </Dropdown.Item>;
            });

            return <div className="row">
                <div className="col-sm-2"/>
                <div className="col-sm-8">
                    <Dropdown>
                        <label>Прикажи во:</label><br/>
                        <Dropdown.Toggle as={CustomToggleProdavnici} id="dropdown-custom-components">
                            {this.state.imeProdavnica}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenuProdavnici}>
                            {init}
                            {prodavniciHtml}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>;
        };

        const datePicker = () => {
            return <CustomPicker startDate={this.state.startDate}
                                 endDate={this.state.endDate}
                                 setNewDate={this.setNewDate}/>
        };




        return (<>
            <div className="row text-center">
                <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">
                    {this.state.lookFirma === true ? firmiDropdown() : gradoviDropdown()}
                    <input
                        type="radio"
                        name="gradOrFirma"
                        id="grad" value="grad"
                        checked={this.state.lookFirma === false}
                        onClick={this.selectGrad}/>
                    <label htmlFor="grad"> Град</label>
                    <input
                        type="radio"
                        name="gradOrFirma"
                        id="firma" value="firma"
                        checked={this.state.lookFirma === true}
                        onClick={this.selectFirma}/>
                    <label htmlFor="firma"> Фирма</label><br/>
                </div>
                <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">{prodavniciDropdown()}</div>
                <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3"/>
                <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">{datePicker()}</div>
            </div>
                <hr/>

                <div className="container">
                    <div className="mb-3">
                        <ProizvodiNaSmetki proizvodi={this.state.listProizvodiNaSmetki}
                                           imeTabela="Производи"
                                           dissmissible={"false"}
                                           errMessage={"Не се пронајдени производи!"}/>
                    </div>
                </div>



        </>)
    }


}

export default withRouter(ProizvodiStats);
