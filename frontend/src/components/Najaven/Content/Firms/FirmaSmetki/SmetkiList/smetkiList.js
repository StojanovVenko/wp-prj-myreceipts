import React, {useState} from "react";
import SmetkiService from "../../../../../../service/smetkiService";
import {Link} from "react-router-dom";
import "./../firmi_css.css"
import ReactPaginate from "react-paginate";

const SmetkiList = (props) => {


    let [pageSize, setPageSize] = useState(props.pageSize);

    const changeBackground = (id) => {
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function (el) {
            el.classList.remove("background");
        });
        let el = document.getElementById(id);
        el.classList.add("background")
    };

    const removeBackground = () => {
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
    };

    const getNewPage = (e) => {
        props.getNewPage(e);
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function(el) {
            el.classList.remove("background");
        });
        props.showDetails(undefined);
    };

    const showEntities = () => {
        if (props.totalPages !== 0) {
            return <>Прикажи <div className="btn-group ">
                <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    {props.pageSize}
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={click => props.changePageSize(5)}>5</a>
                    <a className="dropdown-item" onClick={click => props.changePageSize(10)}>10</a>
                    <a className="dropdown-item" onClick={click => props.changePageSize(20)}>20</a>
                    <a className="dropdown-item" onClick={click => props.changePageSize(50)}>50</a>
                    <a className="dropdown-item" onClick={click => props.changePageSize(100)}>100</a>
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
        let rows = props.listFirmaSmetki.map((smetka, index) => {
            return <tr
                key={index}
                id={"tr"+index}
                onClick={() => {
                    props.showDetails({smetka});
                    changeBackground("tr"+index)} }
            >
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
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"претходна"}
                               nextLabel={"следна"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={getNewPage}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
        return <h3 className="mt-5 text-center display-4">Нема фискални сметки</h3>;
    };

    return (<>
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


};

export default SmetkiList;
