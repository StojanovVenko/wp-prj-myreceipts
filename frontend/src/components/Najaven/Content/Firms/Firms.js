import React from "react";
import FirmiService from "../../../../service/firmiService";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuFirmi, CustomToggleFirmi} from "../FirimDropdown/FirmiDropdown";
import {withRouter} from "react-router";
import SmetkiService from "../../../../service/smetkiService";
import FirmaSmetki from "./FirmaSmetki/firmaSmetki";
import {CustomMenuProdavnici, CustomToggleProdavnici} from "../ProdavniciDropdown/prodavniciDropdown";

class Firms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idFirma: props.location.state.firma.idFirma,
            imeFirma: props.location.state.firma.ime,
            imeFirmaGrad: props.location.state.firma.grad.ime,
            listFirmaSmetki: [],
            smetkiPage:0,
            smetkiPageSize: 5,
            smetkiTotalPages: 0,

            idProdavnica: -1,

            minPrice: -1,
            maxPrice: 1000000,
            startDate: new Date("2020/01/01"),

            endDate: new Date(),


            listFirmi: [],
            listFirmaProdavnici: []
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

    loadProdavniciVoFirma() {
        FirmiService.getAllProdavniciVoFirma(this.state.idFirma)
            .then(response => {
                this.setState({
                    listFirmaProdavnici: response.data
                });
            }).catch();
    }

    loadListFirmaSmetki(page = 0, pageSize = this.state.smetkiPageSize, idProdavnica = -1, imeProdavnica = "Сите продавници",
                        idFirma = this.state.idFirma, imeFirma = this.state.imeFirma, imeFirmaGrad = this.state.imeFirmaGrad) {
        SmetkiService.getSmetkiSoProduktiSoFiltriZaFirma(page, pageSize, idFirma, this.state.idProdavnica,
            this.state.minPrice, this.state.maxPrice, this.state.startDate, this.state.endDate)
            .then(response => {
                this.setState({
                    idFirma: idFirma,
                    imeFirma: imeFirma,
                    imeFirmaGrad: imeFirmaGrad,
                    listFirmaSmetki: response.data.content,
                    smetkiPage: response.data.page,
                    smetkiPageSize: response.data.pageSize,
                    smetkiTotalPages: response.data.totalPages,
                    idProdavnica: idProdavnica,
                    imeProdavnica: imeProdavnica
                });
                this.removeSelectedListItemBackground();
            }).catch();
    }

    getNewPageFirmaSmetki = (e) => {
        this.loadListFirmaSmetki(e.selected);
    };

    // Change state functions

    changeFirma(idFirma=-1, imeFirma="Избери фирма", imeFirmaGrad="град"){
        this.loadListFirmaSmetki(0, this.state.smetkiPageSize, -1, "Сите продавници",
            idFirma, imeFirma, imeFirmaGrad)
    }

    changeProdavnica(idProdavnica, imeProdavnica = "Сите продавници") {
        this.loadListFirmaSmetki(0, this.state.smetkiPageSize, idProdavnica, imeProdavnica);
    }

    removeSelectedListItemBackground = () => {
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
    };

    changePageSize = (e) => {
        this.loadListFirmaSmetki(0, e);
    };





    componentDidMount() {
        this.loadListFirmi();
        this.loadListFirmaSmetki();
        this.loadProdavniciVoFirma();
    }


    render() {

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

            return <Dropdown>
                <Dropdown.Toggle as={CustomToggleFirmi} id="dropdown-custom-components">
                    {this.state.imeFirma} - {this.state.imeFirmaGrad}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenuFirmi}>
                    {firmiHtml}
                </Dropdown.Menu>
            </Dropdown>;
        };

        const prodavniciDropdown = () => {
            if(this.state.listFirmaProdavnici.length===1) return <></>;
            let init = <Dropdown.Item eventKey={`-1`} onClick={(e) => {
                this.changeProdavnica(-1);
            }}>Сите продавници</Dropdown.Item>;

            let prodavniciHtml = this.state.listFirmaProdavnici.map((prodavnica, index) => {
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

            return <Dropdown>
                <Dropdown.Toggle as={CustomToggleProdavnici} id="dropdown-custom-components">
                    {this.state.imeProdavnica}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenuProdavnici}>
                    {init}
                    {prodavniciHtml}
                </Dropdown.Menu>
            </Dropdown>;
        };

        return(
            <>
                {firmiDropdown()}
                {prodavniciDropdown()}
                <div className="mb-3">
                    <FirmaSmetki
                        listFirmaSmetki={this.state.listFirmaSmetki}
                        idFirma={this.state.idFirma}
                        page={this.state.smetkiPage}
                        pageSize={this.state.smetkiPageSize}
                        totalPages={this.state.smetkiTotalPages}
                        changePageSize={this.changePageSize}
                        getNewPage={this.getNewPageFirmaSmetki}
                    />
                </div>
            </>
        )
    }

}

export default withRouter(Firms);
