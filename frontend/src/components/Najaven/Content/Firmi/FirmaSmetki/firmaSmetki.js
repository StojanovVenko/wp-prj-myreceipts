import React, {useState} from "react";
import SmetkaDetails from "./SmetkaDetails/smetkaDetails";
import SmetkiService from "../../../../../service/smetkiService";
import SmetkiList from "./SmetkiList/smetkiList";

const FirmaSmetki = (props) => {

    let [smetka, setSmetka] = useState(undefined);
    let [proizvodi, setProizvodi] = useState([]);


    const showDetails = (smetka) => {
        if (smetka === undefined) {
            setSmetka(undefined);
            return
        }
        SmetkiService.getSmetkaIfno(smetka.smetka.idSmetka)
            .then(response => {
                setSmetka(smetka);
                setProizvodi(response.data);
            }).catch();
    };

    if (props.idFirma !== -1) {
        return (<div className="row">
            <div className="col-xl-8">
                <SmetkiList
                    listSmetki={props.listSmetki}
                    showDetails={showDetails}
                    page={props.page}
                    pageSize={props.pageSize}
                    totalPages={props.totalPages}
                    changePageSize={props.changePageSize}
                    getNewPage={props.getNewPage}
                />
            </div>
            <div className="col-xl-4 ">
                <SmetkaDetails smetkaProps={smetka}
                               proizvodiProps={proizvodi} />
            </div>

        </div>);
    }
    return (<></>);


};

export default FirmaSmetki;
