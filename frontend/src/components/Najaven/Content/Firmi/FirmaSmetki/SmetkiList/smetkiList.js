import React, {useState} from "react";
import "./../firmi_css.css"
import Pagination from "../Pagination/pagination";

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
        <tr id="firstRow" className="topbar">
            <th>Град</th>
            <th>Маркет</th>
            <th>Датум</th>
            <th>Цена</th>
        </tr>
        </thead>;
        let rows = props.listSmetki.map((smetka, index) => {
            return <tr
                key={index}
                id={"tr"+index}
                onClick={() => {
                    props.showDetails({smetka});
                    changeBackground("tr"+index)} }
            >
                <td>{smetka.prodavnica.grad.ime.slice(0,1).toUpperCase()}{smetka.prodavnica.grad.ime.slice(1).toLowerCase()}</td>
                <td>{smetka.prodavnica.ime.slice(0,1).toUpperCase()}{smetka.prodavnica.ime.slice(1).toLowerCase()}</td>
                <td> {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(new Date(smetka.datum))}</td>
                <td>{smetka.vkupenPromet}</td>
            </tr>;
        });
        return <table className="table table-striped table-bordered table-hover" >
            {thead}
            <tbody id="smetkiTable">
            {rows}
            </tbody >
        </table>;
    };



    return (<>
        <div className="mb-3" style={{maxHeight: "60vh", overflowY:"auto"}}>
            {table()}
        </div>

        <div className="row">
            <div className="col-sm-3">
                {showEntities()}
            </div>
            <div className="col-sm-6 text-center">
                <Pagination
                    page={props.page}
                    totalPages={props.totalPages}
                    getNewPage={props.getNewPage}
                    showDetails={props.showDetails}
                    message="Нема фискални сметки"/>
            </div>
        </div>
    </>)


};

export default SmetkiList;
