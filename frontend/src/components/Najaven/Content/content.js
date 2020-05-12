import React from "react";
import {Redirect, Route, Switch} from "react-router";
import Smetki from "./Smetki/smetki";
import KreiranjeSmetka from "./Smetki/KreiranjeSmetka/kreiranjeSmetka";
import Gradovi from "./Gradovi/gradovi";
import Firms from "./Firmi/firmi";

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
                    <KreiranjeSmetka/>
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
                <Route path={"/firmi"} component={Firms} >
                </Route>
                <Route path={"/gradovi" } exact>
                    <Gradovi />
                </Route>
                <Redirect to={"/login"} />
            </Switch>
        )

    }

}
export default Content;
