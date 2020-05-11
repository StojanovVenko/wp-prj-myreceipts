import React from 'react';
import './App.css';
import {Switch, withRouter} from "react-router";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Login from "../Login/login";
import Register from "../Register/register";
import Najaven from "../Najaven/Najaven";

class App extends React.Component{

    constructor(props) {
      super(props);

    }


  render() {

    const routing = (
        <Switch>
            <Route path={"/login"} exact>
                <Login/>
            </Route>
            <Route path={"/register"} exact>
                <Register/>
            </Route>
            <Route path={"/"} >
                <Najaven />

            </Route>
        </Switch>

    );


    return (

        <div className="App">
          {routing}
        </div>

    );

  }


}
export default withRouter(App);
