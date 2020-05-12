import React from "react";
import FirmiService from "../../../../service/firmiService";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuFirmi, CustomToggleFirmi} from "../FirimDropdown/FirmiDropdown";
import {withRouter} from "react-router";
import SmetkiService from "../../../../service/smetkiService";
import FirmaSmetki from "./FirmaSmetki/firmaSmetki";
import {CustomMenuProdavnici, CustomToggleProdavnici} from "../ProdavniciDropdown/prodavniciDropdown";
import CustomPicker from "../Smetki/Picker/picker";
import {CustomMenuGradovi, CustomToggleGradovi} from "../GradoviDropdown/gradoviDropdown";
import GradoviService from "../../../../service/gradoviService";

class Firmi extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idFirma: props.location.state.firma.idFirma,
            imeFirma: props.location.state.firma.ime,
            imeFirmaGrad: props.location.state.firma.grad.ime,
            listSmetki: [],
            smetkiPage:0,
            smetkiPageSize: 5,
            smetkiTotalPages: 0,

            idProdavnica: props.location.state.idProdavnica,
            imeProdavnica: props.location.state.imeProdavnica,

            minPrice: -1,
            maxPrice: 1000000,
            startDate: new Date("2020/01/01"),

            endDate: new Date(),


            listFirmi: [],
            listProdavnici: [],

            lookFirma: props.location.state.lookFirma, //ako e true togas se listat firmi ako e false se listat gradovi
            imeGrad: props.location.state.imeGrad,
            idGrad: props.location.state.idGrad,
            listGradovi: []
        }

    }

    // Load data functions

    loadListFirmi() {
        FirmiService.getAllFirmi().then(response => {
                this.setState({
                    listFirmi: response.data
                });
            }).catch();
    }

    loadListGradovi = () => {
        GradoviService.getAllGradovi()
            .then(response => {
                this.setState({listGradovi: response.data});
            })
            .catch();
    };

    loadlistSmetkiVoGrad(page=0, pageSize=this.state.smetkiPageSize, idProdavnica=this.state.idProdavnica,
                       imeProdavnica=this.state.imeProdavnica, idGrad=this.state.idGrad,
                       imeGrad=this.state.imeGrad){
        let prodavnici = [];
        GradoviService.getAllProdavniciVoGrad(idGrad)
            .then(response => {
                prodavnici = response.data
            }).catch();

        SmetkiService.getSmetkiSoProduktiSoFiltriZaGrad(page, pageSize, idGrad, idProdavnica,
            this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
            .then(response => {
                this.setState({
                    idGrad: idGrad,
                    imeGrad: imeGrad,
                    listSmetki: response.data.content,
                    smetkiPage: response.data.page,
                    smetkiPageSize: response.data.pageSize,
                    smetkiTotalPages: response.data.totalPages,
                    idProdavnica: idProdavnica,
                    imeProdavnica: imeProdavnica,
                    listProdavnici: prodavnici,
                    lookFirma: false
                });
                this.removeSelectedListItemBackground();
            }).catch();
    }



    loadlistSmetkiVoFirma(page=0, pageSize=this.state.smetkiPageSize, idProdavnica=this.state.idProdavnica,
                          imeProdavnica=this.state.imeProdavnica, idFirma=this.state.idFirma,
                          imeFirma=this.state.imeFirma, imeFirmaGrad=this.state.imeFirmaGrad) {
        let prodavnici = [];
        FirmiService.getAllProdavniciVoFirma(idFirma)
            .then(response => {
                prodavnici = response.data;
            }).catch();

            SmetkiService.getSmetkiSoProduktiSoFiltriZaFirma(page, pageSize, idFirma, idProdavnica,
            this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
            .then(response => {
                this.setState({
                    idFirma: idFirma,
                    imeFirma: imeFirma,
                    imeFirmaGrad: imeFirmaGrad,
                    listSmetki: response.data.content,
                    smetkiPage: response.data.page,
                    smetkiPageSize: response.data.pageSize,
                    smetkiTotalPages: response.data.totalPages,
                    idProdavnica: idProdavnica,
                    imeProdavnica: imeProdavnica,
                    listProdavnici: prodavnici,
                    lookFirma:true
                });
                this.removeSelectedListItemBackground();
            }).catch();
    }

    loadByDatum(start, end) {
        if(this.state.lookFirma){
            SmetkiService.getSmetkiSoProduktiSoFiltriZaFirma(this.state.smetkiPage, this.state.smetkiPageSize, this.state.idFirma, this.state.idProdavnica,
                this.state.minPrice, this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listSmetki: response.data.content,
                        smetkiPage: response.data.page,
                        smetkiPageSize: response.data.pageSize,
                        smetkiTotalPages: response.data.totalPages,
                        startDate: start,
                        endDate: end
                    });
                }).catch();
        } else {
            SmetkiService.getSmetkiSoProduktiSoFiltriZaGrad(this.state.smetkiPage, this.state.smetkiPageSize, this.state.idGrad, this.state.idProdavnica,
                this.state.minPrice, this.state.maxPrice, start, end)
                .then(response => {
                    this.setState({
                        listSmetki: response.data.content,
                        smetkiPage: response.data.page,
                        smetkiPageSize: response.data.pageSize,
                        smetkiTotalPages: response.data.totalPages,
                        startDate: start,
                        endDate: end
                    });
                }).catch();
        }

    }

    loadSmetki(page=0, pageSize=this.state.smetkiPageSize, idProdavnica=this.state.idProdavnica, imeProdavnica=this.state.imeProdavnica){
        if(this.state.lookFirma){
            this.loadlistSmetkiVoFirma(page, pageSize, idProdavnica, imeProdavnica);
        } else {
            this.loadlistSmetkiVoGrad(page, pageSize, idProdavnica, imeProdavnica);
        }
    }

    getNewPageSmetki = (e) => {
        this.loadSmetki(e.selected);
    };

    setNewDate = (startDate, endDate) => {
        this.loadByDatum(startDate, endDate);
    };

    // Change state functions

    changeFirma(idFirma=-1, imeFirma="Избери фирма", imeFirmaGrad="град"){
        this.loadlistSmetkiVoFirma(0, this.state.smetkiPageSize, -1, "Сите продавници",
            idFirma, imeFirma, imeFirmaGrad)
    }

    changeGrad(idGrad=-1, imeGrad="Избери град") {
        this.loadlistSmetkiVoGrad(0, this.state.smetkiPageSize, -1, "Сите продавници",
            idGrad, imeGrad);
    }

    changeProdavnica(idProdavnica, imeProdavnica = "Сите продавници") {
        this.loadSmetki(0, this.state.smetkiPageSize, idProdavnica, imeProdavnica);
    }

    removeSelectedListItemBackground = () => {
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
    };

    changePageSize = (e) => {
        this.loadSmetki(0, e);
    };

    changeMinValue = (e) => {
        if (parseFloat(e) > parseFloat(this.state.maxPrice)) {
            this.setState({
                minPrice: e,
                maxPrice: e
            })
        } else {
            this.setState({minPrice: e});
        }
    };

    changeMaxValue = (e) => {
        if (parseFloat(e) < parseFloat(this.state.minPrice)) {
            this.setState({
                maxPrice: e,
                minPrice: e
            })
        } else {
            this.setState({maxPrice: e});
        }
    };

    selectGrad = () => {
        this.loadlistSmetkiVoGrad(0,this.state.smetkiPageSize, -1, "Сите продавници");
    };

    selectFirma = () => {
        this.loadlistSmetkiVoFirma(0,this.state.smetkiPageSize, -1, "Сите продавници");
    };


    componentDidMount() {
        // ako e lookFirma true da se izvrshi ova vo sprotivno load listGradSmetki i loadListGrad
        this.loadListFirmi();
        this.loadListGradovi();
        this.loadSmetki();
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
                                {gradoviHtml}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div></>;
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
                            {firmiHtml}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div></>;
        };

        const prodavniciDropdown = () => {
            if(this.state.listProdavnici.length<=1) return <></>;
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
                        )}}
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

        const priceRange = () => {
          return <>
              <label>Изберете ранг на цените:</label><br/>
              <input type="range"
                     onChange={changeEvent => this.changeMinValue(changeEvent.target.value)}
                     onClick={() => this.loadSmetki()}
                     min="0"
                     max="1000000"
                     step="100"
                     value={this.state.minPrice}
                     className="slider" id="myRange"/>
              <input type="range"
                     onChange={changeEvent => this.changeMaxValue(changeEvent.target.value)}
                     min="0"
                     max="1000000"
                     step="100"
                     value={this.state.maxPrice}
                     onClick={() => {
                         this.loadSmetki()
                     }}
                     className="slider" id="myRange"/>
              <div className="text-center">
                  <div className="text-center">
                      {this.state.minPrice} - {this.state.maxPrice} денари</div>
              </div>
          </>
        };

        const firmiSmetki = () => {
            if(this.state.listSmetki.length===0)
                return <h1 className="display-4">Не се пронајдени фискални сметки...</h1>
            return <FirmaSmetki
                listSmetki={this.state.listSmetki}
                page={this.state.smetkiPage}
                pageSize={this.state.smetkiPageSize}
                totalPages={this.state.smetkiTotalPages}
                changePageSize={this.changePageSize}
                getNewPage={this.getNewPageSmetki}
            />;
        };

        const datePicker = () => {
            return <CustomPicker startDate={this.state.startDate}
                                 endDate={this.state.endDate}
                                 setNewDate={this.setNewDate}/>
        };

        return(
            <>
                <div className="row text-center">
                    <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">
                        {this.state.lookFirma===true ? firmiDropdown() : gradoviDropdown()}
                        <input
                            type="radio"
                            name="gradOrFirma"
                            id="grad" value="grad"
                            checked={this.state.lookFirma===false}
                            onClick={this.selectGrad}/>
                        <label htmlFor="grad"> Град</label>
                        <input
                            type="radio"
                            name="gradOrFirma"
                            id="firma" value="firma"
                            checked={this.state.lookFirma===true}
                            onClick={this.selectFirma}/>
                        <label htmlFor="firma"> Фирма</label><br/>
                    </div>
                    <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">{prodavniciDropdown()}</div>
                    <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">{priceRange()}</div>
                    <div className="col-sm-12 pt-sm-5 pt-xl-0 pb-sm-2 col-xl-3">{datePicker()}</div>
                </div>

                <hr/>
                <div className="mb-3">
                    {firmiSmetki()}
                </div>
                <hr/>
            </>
        )
    }

}

export default withRouter(Firmi);
