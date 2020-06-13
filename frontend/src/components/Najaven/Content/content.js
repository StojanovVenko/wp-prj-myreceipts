import React from "react";
import {Redirect, Route, Switch} from "react-router";
import Smetki from "./Smetki/smetki";
import KreiranjeSmetka from "./Smetki/KreiranjeSmetka/kreiranjeSmetka";
import Gradovi from "./Gradovi/gradovi";
import Firms from "./Firmi/firmi";
import ProfileInfo from "./ProfileInfo/profileInfo";
import ProfileInfoEdit from "./ProfileInfoEdit/profileInfoEdit";

import SmetkiService from "../../../service/smetkiService";
import Pochetna from "./../Content/Pochetna/pochetna";
import ProizvodiStats from "./ProizvodiStats/proizvodiStats";

class Content extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 1000,
            startDate: new Date(),
            endDate: new Date()
        }
    }

    componentDidMount() {
        this.loadMinMaxInfo();
    }

    loadMinMaxInfo() {
        SmetkiService.getMinMaxIznosAndDateForSmetka()
            .then(response => {
                if(response.data[0]!==null) {
                    this.setState({
                        minPrice: response.data[0],
                        maxPrice: response.data[1],
                        startDate: new Date(response.data[2]),
                        endDate: new Date(response.data[3])
                    });
                }
            })
            .catch();
    }

    render() {

        return (
            <Switch>
                <Route path={"/pochetna"} exact>
                    <Pochetna />
                </Route>
                <Route path={"/smetki/dodadi"} exact>
                    <KreiranjeSmetka/>
                </Route>
                <Route path={"/smetki"} exact>
                    <Smetki minPrice={this.state.minPrice}
                            maxPrice={this.state.maxPrice}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}/>
                </Route>
                <Route path={"/proizvodi"} exact
                       component={() => <ProizvodiStats
                           minPrice={this.state.minPrice}
                           maxPrice={this.state.maxPrice}
                           startDate={this.state.startDate}
                           endDate={this.state.endDate}/>}>
                </Route>
                <Route path={"/profil"} exact>
                    <ProfileInfo/>
                </Route>
                <Route path={"/profil/edit"}>
                    <ProfileInfoEdit
                        editUser={this.props.editUser}/>
                </Route>
                <Route path={"/firmi"} exact
                       component={() => <Firms
                           minPrice={this.state.minPrice}
                           maxPrice={this.state.maxPrice}
                           startDate={this.state.startDate}
                           endDate={this.state.endDate}/>} >
                </Route>
                <Route path={"/gradovi"} exact>
                    <Gradovi/>
                </Route>
                <Redirect to={"/pochetna"}/>
            </Switch>
        )
    }

}
export default Content;
