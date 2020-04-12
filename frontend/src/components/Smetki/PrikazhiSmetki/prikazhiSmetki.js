import React from "react";
import Table from "react-bootstrap/Table";

const PrikazhiSmetki = (props) => {

    console.log(props.fiskalni);

    const tabeliHtml = () => {

        let thead = <thead className="fixed">
        <tr className="text-primary">
            <th>#</th>
            <th>Датум</th>
            <th>Цена</th>
            <th>Продавница</th>
            <th>Фирма</th>
        </tr>
        </thead>;

        let tbody = props.fiskalni.map((fiskalna, index) => {
            return <tr>
                <td>{index + 1} </td>
                <td>{fiskalna.datum}</td>
                <td>{fiskalna.vkupenPromet}</td>
                <td>{fiskalna.prodavnica.ime}</td>
                <td>{fiskalna.firma.ime}</td>
            </tr>
        });

        return <Table striped bordered hover variant="dark">
            {thead}
            {tbody}
        </Table>

    };

    return(
        <div
            style={{opacity: ".9", maxHeight: "80vh"}}>
            {tabeliHtml}
        </div>
    )
};

export default PrikazhiSmetki;