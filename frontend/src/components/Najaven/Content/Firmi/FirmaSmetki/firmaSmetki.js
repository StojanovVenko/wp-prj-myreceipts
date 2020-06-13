import React, {useState} from "react";
import SmetkaDetails from "./SmetkaDetails/smetkaDetails";
import SmetkiService from "../../../../../service/smetkiService";
import SmetkiList from "./SmetkiList/smetkiList";
import Loader from "react-loader-spinner";
import SmetkaDetailsEdit from "./SmetkaDetailsEdit/smetkaDetailsEdit";

const FirmaSmetki = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [smetka, setSmetka] = useState(undefined);
    let [proizvodi, setProizvodi] = useState([]);

    const delteRemoveSmetka = (smetkaId) => {
        setSmetka(undefined);
        props.deleteSmetka(smetkaId);
    };

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

    const editSmetka = (boolean) => {
        console.log("boolean");
        console.log(boolean);
        setEditMode(boolean);
    };

    let modeHtml =  () => {
      if(!editMode){
          return  <SmetkaDetails smetkaProps={smetka}
                                 proizvodiProps={proizvodi}
                                 deleteSmetka={delteRemoveSmetka}
                                 editMode={editSmetka}/>
      }
      return <SmetkaDetailsEdit smetkaProps={smetka}
                            proizvodiProps={proizvodi}
                                editMode={editSmetka}/>
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
                {modeHtml()}
            </div>

        </div>);
    }
    return (<>asd</>);


};

export default FirmaSmetki;
