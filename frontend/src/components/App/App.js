import React from 'react';
import './App.css';
import {Switch, withRouter} from "react-router";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Login from "../Login/login";
import Register from "../Register/register";
import Najaven from "../Najaven/Najaven";
import {ACCESS_TOKEN} from '../../constants';
import Auth from "../../service/authService";
import PrivateRoute from "../PrivateRoute/privateRoute";
import Loader from "react-loader-spinner";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
    }

    loadCurrentUser = () => {
        this.setState({
            isLoading: true
        });
        Auth.getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response.data,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    };

    handleLogin = (request) => {
        return Auth.login(request);
    };

    handleLogout = (redirectTo = "/login") => {
        this.setState({isLoading: true});
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false,
            isLoading:false
        });
    };

    componentDidMount() {
        if(this.state.currentUser!==null) {
            this.props.history.push('/login');
        }
        this.loadCurrentUser();
    }

    componentWillUnmount() {
        this.handleLogout();
    }


    render() {

        if (this.state.isLoading) {
            return <div className="container" style={{marginTop: "40vh"}}>
                <div className="text-center">
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={150}
                        width={500}
                        timeout={100000} //3 secs

                    />
                </div>
            </div>
        }


        return <div className="App">
            <Switch>
                <Route path={"/login"} exact>
                    <Login onLogin={this.handleLogin} getUser={this.loadCurrentUser} {...this.props}/>
                </Route>
                <Route path={"/register"} exact>
                    <Register/>
                </Route>
                <PrivateRoute
                    path='/'
                    component={Najaven}
                    logout={this.handleLogout}
                />
                {/*<Route path={"/"}>*/}

                    {/*<Najaven logout={this.handleLogout}/>*/}
                {/*</Route>*/}
            </Switch>
        </div>
    }


}

export default withRouter(App);
