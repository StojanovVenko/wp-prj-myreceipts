import React from "react";
import {MDBDataTableV5} from "mdbreact";

const ProizvodiNaSmetki = (props) => {

    let vkupno = 0.0;
    let datt = [];
    const tbody = props.proizvodi.map((proizvod, index) => {
        vkupno += proizvod[3];
        datt.push({
            ime: proizvod[1],
            kolichina: proizvod[2],
            cena: proizvod[3]
        });
        });

    if(props.proizvodi.length === 0){
        if(props.dismissible==="true") {
            return <div className={"container"}>
                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                    <h3>{props.errMessage}</h3>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        }
            return <div className={"container"}>
                <div className="alert alert-primary" role="alert">
                    <h3>{props.errMessage}</h3>
                </div>
                </div>
    }

    let datatable = {
        columns: [
            {
                label: 'Име',
                field: 'ime',
                width: 270,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'ime',
                },
            },
            {
                label: 'Количина',
                field: 'kolichina',
                width: 150,
            },
            {
                label: 'Цена',
                field: 'cena',
                width: 150,
            }
        ],
        rows: datt,
    };

    return(
        <div className="container">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{props.imeTabela}</h6>
                </div>
                <div className="card-body">
            <MDBDataTableV5 hover
                            entriesOptions={[5, 20, 25]}
                            entries={5} pagesAmount={4}
                            data={datatable}
                            searchTop
                            searchBottom={false} />
                </div>
                <div className="card-footer">
                    <h6 className="m-0 font-weight-bold text-primary">Вкупна цена од сите производи- <b>{vkupno}</b> денари</h6>

                </div>
            </div>

        </div>
    );
};


export default ProizvodiNaSmetki;

// {/*// <!-- DataTales Example -->*/}
{/*<div className="card shadow mb-4">*/}
{/*    <div className="card-header py-3">*/}
{/*        <h6 className="m-0 font-weight-bold text-primary">{props.imeTabela}</h6>*/}
{/*    </div>*/}
{/*    <div className="card-body">*/}
{/*        <div className="table-responsive">*/}
{/*            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">*/}
{/*                <thead>*/}
{/*                <tr>*/}
{/*                    <th>Име производ</th>*/}
{/*                    <th>Количина</th>*/}
{/*                    <th>Вкупно</th>*/}
{/*                </tr>*/}
{/*                </thead>*/}
{/*                <tbody>*/}
{/*                {tbody}*/}
{/*                <tr>*/}
{/*                    <td colSpan="2" className="text-right">Вкупен износ на сите производи во табелата</td>*/}
{/*                    <td>{vkupno}</td>*/}
{/*                </tr>*/}
{/*                </tbody>*/}
{/*            </table>*/}
{/*        </div>*/}
{/*    </div>*/}
{/*</div>*/}
