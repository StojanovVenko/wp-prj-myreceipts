import React from "react";
import Sidebar from "../Najaven/Sidebar/sidebar";
import Header from "../Najaven/Header/header";
import Table from "react-bootstrap/Table";
import SmetkiService from "../../service/smetkiService";
import PrikazhiSmetki from "./PrikazhiSmetki/prikazhiSmetki";

class Smetki extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            fiskalni : []
        }
    }

    getFiskalni = SmetkiService.getAllFiskalni()
        .then(response => {
            this.setState({
                fiskalni : response.data
            });
        }).catch();

    render() {

        return(
            <div id="wrapper" style={{overflow: "auto"}}>
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header/>
                        <h1>Fiskalni smetki:</h1>
                        <PrikazhiSmetki fiskalni={this.getFiskalni} />
                    </div>
                </div>
            </div>

        )
    }
};

export default Smetki;