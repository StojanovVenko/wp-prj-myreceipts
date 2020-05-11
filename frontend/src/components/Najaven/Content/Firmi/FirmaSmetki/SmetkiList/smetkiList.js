import React from "react";
import SmetkiService from "../../../../../../service/smetkiService";
import {Link} from "react-router-dom";
import "./../firmi_css.css"
import ReactPaginate from "react-paginate";

class SmetkiList extends React.Component {

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
            sortiraj: 1, //1-datum rastecki, 2-datum opagjachki, 3-cena rastechki, 4-cena opagjachki
            startDate: new Date("2020/01/01"),
            endDate: new Date()
        }
    }

    componentDidMount() {
        this.loadSmetkiSoProdukti(this.state.page);
    }

    loadSmetkiSoProdukti(page = 0) {

    }

    changeBackground (id){
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
        let el = document.getElementById(id);
        el.classList.add("background")
    };

    changePageSize = (e) => {
        SmetkiService.getSmetkiSoProduktiSoFiltriZaFirma(0, e, this.props.idFirma, -1,
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
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
        this.props.showDetails(undefined);
    };


    render() {

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

        const table = () => {

            let thead = <thead>
            <tr id="firstRow">
                <th>Град</th>
                <th>Маркет</th>
                <th>Датум</th>
                <th>Цена</th>
            </tr>
            </thead>;
            let rows = this.state.smetki.map((smetka, index) => {
                return <tr key={index} id={"tr"+index} onClick={() => {this.props.showDetails({smetka}); this.changeBackground("tr"+index)} }>
                    <td>{smetka.prodavnica.grad.ime}</td>
                    <td>{smetka.prodavnica.ime}</td>
                    <td>{smetka.datum}</td>
                    <td>{smetka.vkupenPromet}</td>
                </tr>;
            });
            return <table className="table table-striped table-bordered table-hover" >
                {thead}
                <tbody id="smetkiTable" >
                {rows}
                </tbody >
            </table>;
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

        return(<>
            <div className="mb-3">
                {table()}
            </div>

            <div className="row">
                <div className="col-sm-3">
                    {showEntities()}
                </div>
                <div className="col-sm-6 text-center">
                    {paginate()}
                </div>
            </div>
        </>)
    }

}

export default SmetkiList;
