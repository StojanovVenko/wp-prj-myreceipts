import React, {useState} from "react";
import SmetkiList from "./SmetkiList/smetkiList";
import SmetkaDetails from "./SmetkaDetails/smetkaDetails";
import SmetkiService from "../../../../../service/smetkiService";

class FirmaSmetki extends React.Component {

    // let [smetka, setSmetka] = useState(undefined);
    // let [proizvodi, setProizvodi] = useState([]);

   constructor(props) {
       super(props);

       this.state = {
           smetka: undefined,
           proizvodi: []
       }
   }

    showDetails = (smetka) => {
        if(smetka===undefined){
            this.setState({
                smetka: undefined
            });
            return
        }
        SmetkiService.getSmetkaIfno(smetka.smetka.idSmetka)
            .then(response => {
                this.setState({
                    smetka: smetka,
                    proizvodi: response.data
                })
            }).catch();
    };

    render() {


       if(this.props.idFirma!==-1){
           return (<div className="row" >
               <div className="col-xl-8">
                   <SmetkiList idFirma={this.props.idFirma} idProdavnica={this.props.idProdavnica} showDetails={this.showDetails}/>
               </div>
               <div className="col-xl-4 ">
                   <SmetkaDetails smetka={this.state.smetka} proizvodi={this.state.proizvodi}/>
               </div>

           </div>);
       }
       return (<></>);

   }




};

export default FirmaSmetki;
