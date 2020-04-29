import React from "react";
import {Link} from "react-router-dom";
import SmetkiService from "../../../../service/smetkiService";
import Smetka from "./Smetka/smetka";
import ReactPaginate from "react-paginate";
import "./input_ranges.css";

class Smetki extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            smetki : [],
            page: 0,
            pageSize: 5,
            totalPages: 0,
            minIznos:0,
            maxIznos:1000000
        }

    }

    componentDidMount() {
        this.loadSmetkiSoProdukti(this.state.page);
    }

    loadSmetkiSoProdukti = (page=0) =>{
        SmetkiService.getSmetkiSoProdukti(page, this.state.pageSize)
            .then(response => {
                this.setState({
                    smetki : response.data.content,
                    page : response.data.page,
                    pageSize : response.data.pageSize,
                    totalPages : response.data.totalPages
                });
            }).catch();
    };

    getNewPage = (e) => {
        this.loadSmetkiSoProdukti(e.selected);
    };

    dodadiSmetki =()=> {
        return this.state.smetki.map((smetka, index) => {
            return <Smetka smetka={smetka} index={index} prikazhi="colapse hide" />
        });
    };

    changeMinValue = (e) => {
        if(parseFloat(e) > parseFloat(this.state.maxIznos)){
            this.setState({
                minIznos:e,
                maxIznos:e
            })
        } else {
            this.setState({minIznos: e});
        }
    };

    changeMaxValue = (e) => {
        if(parseFloat(e) < parseFloat(this.state.minIznos)){
            this.setState({
                maxIznos: e,
                minIznos: e
            })
        } else {
            this.setState({maxIznos: e});
        }
    };

    changePageSize = (e) => {
        SmetkiService.getSmetkiSoProdukti(0, e)
            .then(response => {
                this.setState({
                    smetki : response.data.content,
                    page : response.data.page,
                    pageSize : response.data.pageSize,
                    totalPages : response.data.totalPages
                });
            }).catch();
    };


    render() {
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

        return(

            <div className="container">
                <h1 className="text-center display-4">Фискални сметки</h1>
                <hr/>
                <div className="row" >
                    <div className="col-sm" >
                        <div className="row "  >
                            <div className="col-sm-3">Датум</div>
                            <div className="col-sm-3">Цена</div>
                            <div className="col-sm-3">Продавница</div>
                            <div className="col-sm-3">Град</div>
                        </div>
                        <hr/>
                        {this.dodadiSmetki()}
                        {paginate()}
                    </div>
                    <div className="col-sm-3">
                        <div className="btn-group btn-block">
                        <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            прикажи по {this.state.pageSize} ставки
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={click => this.changePageSize(5)}>5</a>
                            <a className="dropdown-item" onClick={click => this.changePageSize(10)}>10</a>
                            <a className="dropdown-item" onClick={click => this.changePageSize(20)}>20</a>
                            <a className="dropdown-item" onClick={click => this.changePageSize(50)}>50</a>
                            <a className="dropdown-item" onClick={click => this.changePageSize(100)}>100</a>
                        </div>
                    </div>
                        <hr/>
                        <label >Изберете ранг на цените:</label><br/>
                        <input type="range" onChange={ changeEvent => this.changeMinValue(changeEvent.target.value)}
                               min="0" max="1000000" step="100" value={this.state.minIznos}
                               className="slider" id="myRange"/>
                        <input type="range" onChange={changeEvent => this.changeMaxValue(changeEvent.target.value)}
                               min="0" max="1000000" step="100" value={this.state.maxIznos}
                               className="slider" id="myRange"/>
                        <div className="text-center">
                            <div className="text-center">{this.state.minIznos} - {this.state.maxIznos} денари</div>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }


}
export default Smetki;
