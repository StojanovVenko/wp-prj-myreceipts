import React from "react";
import {Redirect, Route, Switch} from "react-router";
import Smetki from "./Smetki/smetki";
import SmetkiService from "../../../service/smetkiService";

class Content extends React.Component{

    constructor(props){
        super(props);

    }

    render() {

        return(
            <Switch>
                <Route path={"/pochetna"} exact>
                    Pochetna
                </Route>
                <Route path={"/smetki/dodadi"} exact>
                    Kreiranje smetka
                </Route>
                <Route path={"/smetki"} exact>
                    <Smetki/>
                </Route>
                <Route path={"/zadachi"} exact>
                    Zadachi
                </Route>
                <Route path={"zadachi/dodadi"} exact>
                    Dodadi zadacha
                </Route>
                <Route path={"/profil"} exact>
                    Informacii za profilot
                </Route>
                <Route path={"/odjava" } exact>
                    Odjava
                </Route>
                <Route path={"/postavki" } exact>
                    Postavki
                </Route>
                <Route path={"/prodavnici" } exact>
                    Prodavnici
                </Route>
                <Route path={"/firmi" } exact>
                    Firmi
                </Route>
                <Route path={"/gradovi" } exact>
                    Gradovi
                </Route>
                <Redirect to={"/login"} />
            </Switch>

        )

    }

}
export default Content;