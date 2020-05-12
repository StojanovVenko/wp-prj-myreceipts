import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {

    const getNewPage = (e) => {
        props.getNewPage(e);
        var elems = document.querySelectorAll(".background");

        [].forEach.call(elems, function (el) {
            el.classList.remove("background");
        });
        props.showDetails(undefined);
    };


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
    return <h3 className="mt-5 text-center display-4">{props.message}</h3>;

};

export default Pagination;
