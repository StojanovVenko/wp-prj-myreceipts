import React from "react";
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
            pageSize: 8,
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

    getNewPage = (e) => {
        this.loadSmetkiSoProdukti(e.selected);
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

        let htmlShowing = () => {
            if (this.state.totalPages === 0) {
                return <div className="alert alert-primary mt-5" role="alert">
                    <h3>Не се пронајдени фискални сметки</h3>
                </div>
            } else{
                return <><div className="row container ">
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
                </div></>
            }
        };



        return (

            <div className="container-fluid">
                <h1 className="text-center display-4">Фискални сметки</h1>
                <hr/>
                <div className="row pb-5 mb-5" >
                    <div className="container">
                        {htmlShowing()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Smetki;
