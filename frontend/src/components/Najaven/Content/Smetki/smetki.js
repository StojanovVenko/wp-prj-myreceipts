import React from "react";
import {Link} from "react-router-dom";
import SmetkiService from "../../../../service/smetkiService";
import SmetkaInfo from "./Smetka/SmetkaInfo/smetkaInfo";
import Smetka from "./Smetka/smetka";
import ReactPaginate from "react-paginate";

class Smetki extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            smetki : [],
            page: 0,
            pageSize: 5,
            totalPages: 0
        }

    }

    componentDidMount() {
        this.loadSmetkiSoProdukti(this.state.page);
    }

    loadSmetkiSoProdukti = (page=0) =>{
        SmetkiService.getSmetkiSoProdukti(page, this.state.pageSize)
            .then(response => {
                console.log("asd" + response);
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

    moja =()=> {
        return this.state.smetki.map((smetka, index) => {
            console.log(smetka);
            return <Smetka smetka={smetka} index={index}/>
        });
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
                <div className="row">
                    <div className="col-sm">
                        <div className="row ">
                            <div className="col-sm-3">Датум</div>
                            <div className="col-sm-3">Цена</div>
                            <div className="col-sm-3">Продавница</div>
                            <div className="col-sm-3">Град</div>
                        </div>
                        <hr/>
                        {this.moja()}
                        {paginate()}
                    </div>
                    <div className="col-sm-3">
                        Filtri
                    </div>
                </div>
            </div>

        )

    }



}
export default Smetki;