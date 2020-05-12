import React from "react";
import {Link} from "react-router-dom";
import SmetkiService from "../../../../service/smetkiService";
import GradoviService from "../../../../service/gradoviService";
import FirmiService from "../../../../service/firmiService";
import ProdavniciService from "../../../../service/prodavniciService";
import Smetka from "./Smetka/smetka";
import ReactPaginate from "react-paginate";
import "./input_ranges.css";
import CustomPicker from "./Picker/picker";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuGradovi, CustomToggleGradovi} from "../GradoviDropdown/gradoviDropdown";
import {CustomMenuProdavnici, CustomToggleProdavnici} from "../ProdavniciDropdown/prodavniciDropdown";

class Smetki extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            smetki: [],
            page: 0,
            pageSize: 5,
            totalPages: 0,
            minIznos: 0,
            maxIznos: 1000000,
            gradovi: [],
            grad: "Сите градови",
            idGrad: -1,
            firmi: [],
            firma: "Сите фирми",
            idFirma: -1,
            prodavnici: [],
            prodavnica: "Сите продавници",
            idProdavnica: -1,
            sortiraj: 1, //1-datum rastecki, 2-datum opagjachki, 3-cena rastechki, 4-cena opagjachki
            startDate: new Date("2020/01/01"),
            endDate: new Date(),
        }
    }

    componentDidMount() {
        this.loadSmetkiSoProdukti(this.state.page);
        this.loadGradovi();
        this.loadFirmi();
        this.loadProdavnici();
    }

    loadSmetkiSoProdukti = (page = 0) => {
        SmetkiService.getSmetkiSoProduktiSoFiltri(page, this.state.pageSize, this.state.idGrad, this.state.idProdavnica,
            this.state.minIznos, this.state.maxIznos, this.state.startDate, this.state.endDate)
            .then(response => {
                this.setState({
                    smetki: response.data.content,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    totalPages: response.data.totalPages
                });
            }).catch();
    };

    loadByDatum(start, end) {
        SmetkiService.getSmetkiSoProduktiSoFiltri(this.state.page, this.state.pageSize, this.state.idGrad, this.state.idProdavnica,
            this.state.minIznos, this.state.maxIznos, start, end)
            .then(response => {
                this.setState({
                    smetki: response.data.content,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    totalPages: response.data.totalPages,
                    startDate: start,
                    endDate: end
                });
            }).catch();
    }

    loadGradovi = () => {
        GradoviService.getAllGradovi()
            .then(response => {
                this.setState({gradovi: response.data});
            })
            .catch();
    };

    loadFirmi = () => {
        FirmiService.getAllFirmi()
            .then(response => {
                this.setState({firmi: response.data});
            })
            .catch();
    };

    loadProdavnici = () => {
        ProdavniciService.getAllProdavnici()
            .then(response => {
                this.setState({prodavnici: response.data});
            })
            .catch();
    };

    getNewPage = (e) => {
        this.loadSmetkiSoProdukti(e.selected);
    };

    changeMinValue = (e) => {
        if (parseFloat(e) > parseFloat(this.state.maxIznos)) {
            this.setState({
                minIznos: e,
                maxIznos: e
            })
        } else {
            this.setState({minIznos: e});
        }
    };

    changeMaxValue = (e) => {
        if (parseFloat(e) < parseFloat(this.state.minIznos)) {
            this.setState({
                maxIznos: e,
                minIznos: e
            })
        } else {
            this.setState({maxIznos: e});
        }
    };

    changePageSize = (e) => {
        SmetkiService.getSmetkiSoProduktiSoFiltri(0, e, this.state.idGrad, this.state.idProdavnica,
            this.state.minIznos, this.state.maxIznos, this.state.startDate, this.state.endDate)
            .then(response => {
                this.setState({
                    smetki: response.data.content,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    totalPages: response.data.totalPages
                });
            }).catch();
    };

    setNewDate = (startDate, endDate) => {
        this.loadByDatum(startDate, endDate);
    };

    onClickDropdown = (idGrad = -1, grad = "Сите градови", idProdavnica = -1, prodavnica = "Сите продавници") => {
        SmetkiService.getSmetkiSoProduktiSoFiltri(0, this.state.pageSize, idGrad, idProdavnica,
            this.state.minIznos, this.state.maxIznos, this.state.startDate, this.state.endDate)
            .then(response => {
                console.log("response   " + response.data.content);
                this.setState({
                    smetki: response.data.content,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    totalPages: response.data.totalPages,
                    idGrad: idGrad,
                    grad: grad,
                    idProdavnica: idProdavnica,
                    prodavnica: prodavnica
                });
            }).catch();
    };

    render() {

        const dodadiSmetki = () => {
            return this.state.smetki.map((smetka, index) => {
                return <Smetka smetka={smetka} index={index} prikazhi="colapse hide"/>
            });
        };

        const paginate = () => {
            if (this.state.totalPages !== 0) {
                return (
                    <ReactPaginate previousLabel={"претходна"}
                                   nextLabel={"следна"}
                                   breakLabel={<span className="gap">...</span>}
                                   breakClassName={"break-me"}
                                   pageCount={this.state.totalPages}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   pageClassName={"page-item"}
                                   pageLinkClassName={"page-link"}
                                   previousClassName={"page-item"}
                                   nextClassName={"page-item"}
                                   previousLinkClassName={"page-link"}
                                   nextLinkClassName={"page-link"}
                                   forcePage={this.state.page}
                                   onPageChange={this.getNewPage}
                                   containerClassName={"pagination justify-content-center"}
                                   activeClassName={"active"}/>
                )
            }
            return <h3 className="mt-5 text-center display-4">Нема фискални сметки</h3>;
        };

        const gradoviDropdown = () => {
            let init = <Dropdown.Item eventKey={`-1`} onClick={(e) => {
                this.onClickDropdown(-1, "Сите градови");
            }}>Сите градови</Dropdown.Item>;

            let gradoviHtml = this.state.gradovi.map((grad, index) => {
                return <Dropdown.Item eventKey={`${index}`}
                                      onClick={(e) => {
                                          this.onClickDropdown(e.target.attributes.getNamedItem('idgrad').value,
                                              e.target.attributes.getNamedItem('imegrad').value);
                                      }}
                                      idgrad={grad.idGrad}
                                      imegrad={grad.ime}>{grad.ime}</Dropdown.Item>;
            });

            return <Dropdown>
                <Dropdown.Toggle as={CustomToggleGradovi} id="dropdown-custom-components">
                    {this.state.grad}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenuGradovi}>
                    {init}
                    {gradoviHtml}
                </Dropdown.Menu>
            </Dropdown>;
        };



        const prodavniciDropdown = () => {
            let init = <Dropdown.Item eventKey={`-1`} onClick={(e) => {
               this.onClickDropdown(this.state.idGrad, this.state.grad);
            }}>Сите продавници</Dropdown.Item>;

            let prodavniciHtml = this.state.prodavnici.map((prodavnica, index) => {
                return <Dropdown.Item eventKey={`${index}`} onClick={(e) => {
                    this.onClickDropdown(e.target.attributes.getNamedItem('idgrad').value,
                        e.target.attributes.getNamedItem('imegrad').value,
                        e.target.attributes.getNamedItem('idprodavnica').value,
                        e.target.attributes.getNamedItem('imeprodavnica').value);
                }}

                                      idprodavnica={prodavnica.idProdavnica}
                                      imeprodavnica={prodavnica.ime}
                                      idgrad={prodavnica.grad.idGrad}
                                      imegrad={prodavnica.grad.ime}
                                      idfirma={prodavnica.firma.idFirma}
                                      imefirma={prodavnica.firma.ime}>
                    {prodavnica.ime} - {prodavnica.grad.ime}
                </Dropdown.Item>;
            });

            return <Dropdown>
                <Dropdown.Toggle as={CustomToggleProdavnici} id="dropdown-custom-components">
                    {this.state.prodavnica}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenuProdavnici}>
                    {init}
                    {prodavniciHtml}
                </Dropdown.Menu>
            </Dropdown>;
        };

        const showEntities = () => {
            if (this.state.totalPages !== 0) {
                return <>Прикажи <div className="btn-group ">
                    <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        {this.state.pageSize}
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" onClick={click => this.changePageSize(5)}>5</a>
                        <a className="dropdown-item" onClick={click => this.changePageSize(10)}>10</a>
                        <a className="dropdown-item" onClick={click => this.changePageSize(20)}>20</a>
                        <a className="dropdown-item" onClick={click => this.changePageSize(50)}>50</a>
                        <a className="dropdown-item" onClick={click => this.changePageSize(100)}>100</a>
                    </div>
                </div> </>;
            }
        };


        return (

            <div className="container-fluid">
                <h1 className="text-center display-4">Фискални сметки</h1>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <div className="row ">
                            <div className="col-sm-3">Датум</div>
                            <div className="col-sm-3">Цена</div>
                            <div className="col-sm-3">Продавница</div>
                            <div className="col-sm-2">Град</div>
                            <div className="col-sm-1"/>
                        </div>
                        <hr/>
                        {dodadiSmetki()}
                        <div className="row">
                            <div className="col-sm-3">
                                {showEntities()}
                            </div>
                            <div className="col-sm-6 text-center">
                                {paginate()}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        {gradoviDropdown()}
                        <hr/>
                        {prodavniciDropdown()}
                        <hr/>
                        <label>Изберете ранг на цените:</label><br/>
                        <input type="range"
                               onChange={changeEvent => this.changeMinValue(changeEvent.target.value)}
                               onClick={() => this.loadSmetkiSoProdukti(this.state.page)}
                               min="0"
                               max="1000000"
                               step="100"
                               value={this.state.minIznos}
                               className="slider" id="myRange"/>
                        <input type="range"
                               onChange={changeEvent => this.changeMaxValue(changeEvent.target.value)}
                               min="0"
                               max="1000000"
                               step="100"
                               value={this.state.maxIznos}
                               onClick={() => {
                                   this.loadSmetkiSoProdukti(this.state.page)
                               }}
                               className="slider" id="myRange"/>
                        <div className="text-center">
                            <div className="text-center">{this.state.minIznos} - {this.state.maxIznos} денари</div>
                        </div>
                        <hr/>

                        <CustomPicker startDate={this.state.startDate}
                                      endDate={this.state.endDate}
                                      setNewDate={this.setNewDate}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Smetki;
