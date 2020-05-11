import React, {useState} from "react";
import {withRouter} from "react-router";
import FirmaSmetki from "./FirmaSmetki/firmaSmetki";
import FirmaStatistiki from "./FirmaStatistiki/firmaStatistiki";
import FirmiService from "./../../../../service/firmiService"
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuFirmi, CustomToggleFirmi} from "../FirimDropdown/FirmiDropdown";

class Firmi extends React.Component{

    constructor(props) {
        super(props);
        console.log(props.location.state);

        this.state = {
            imeFirma: props.location.state.firma.ime,
            idFirma: props.location.state.firma.idFirma,
            gradFirma: props.location.state.firma.grad.ime,
            idProdavnica: -1,
            firmi: [],
            firmaData: []
        }
    }

    componentDidMount() {
        this.loadFirmi();
    }

    loadFirmi() {
        FirmiService.getAllFirmi()
            .then(response => {
                this.setState({
                    firmi: response.data
                });
            })
            .catch();
    }



    // changeFirma = (firma) => {
    //     this.setState({
    //         imeFirma: firma.f.ime,
    //         idFirma: firma.f.idFirma,
    //         idProdavnica: -1,
    //         gradFirma: firma.f.grad.ime
    //     });
    // };

    changeFirma(idFirma=-1, imeFirma="Избери фирма", gradFirma="град"){
        this.setState({
            idFirma: idFirma,
            imeFirma: imeFirma,
            gradFirma: gradFirma
        });
    }

    render() {

        const firmiDropdown = () => {
            let firmiHtml = this.state.firmi.map((f, index) => {
                return <Dropdown.Item eventKey={`${index}`}
                                      onClick={(e) => {
                                         this.changeFirma(e.target.attributes.getNamedItem('idfirma').value,
                                             e.target.attributes.getNamedItem('imeFirma').value,
                                             e.target.attributes.getNamedItem('gradFirma').value);
                                      }}
                idfirma={f.idFirma} imeFirma={f.ime} gradFirma={f.grad.ime}>
                    {f.ime} - {f.grad.ime}
                </Dropdown.Item>;
            });

            return <Dropdown>
                <Dropdown.Toggle as={CustomToggleFirmi} id="dropdown-custom-components">
                    {this.state.imeFirma} - {this.state.gradFirma}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenuFirmi}>
                    {firmiHtml}
                </Dropdown.Menu>
            </Dropdown>;
        };



            return (
                <>


                    {/*<FirmaStatistiki imeFirma={this.state.imeFirma}*/}
                    {/*                 changeFirma={this.changeFirma}*/}
                    {/*                 firmi={this.state.firmi}*/}
                    {/*                 gradFirma={this.state.gradFirma}/>*/}
                    {firmiDropdown()}

                    <FirmaSmetki idFirma={this.state.idFirma}
                                 idProdavnica={this.state.idProdavnica}/>
                </>

            );
    }

}

export default withRouter(Firmi);
