import React from "react";
import Sidebar from "./Sidebar/sidebar";
import Header from "./Header/header";
import {withRouter} from "react-router";
import Content from "./Content/content";
import SmetkiService from "../../service/smetkiService";
import Smetki from "./Content/Smetki/smetki";
import GradoviService from "../../service/gradoviService";
class Najaven extends React.Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <div id="wrapper">
                <Sidebar getSmetki={this.loadSmetkiSoProdukti}/>
                <div id="content-wrapper" className="d-flex flex-column" >
                    <div id="content" style={{height:" 100px !important", overflow: "scroll !important"}}>
                        <Header/>
                        <Content/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Najaven);