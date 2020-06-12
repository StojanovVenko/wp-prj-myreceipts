import React from "react";
import AuthService from "../../../../service/authService";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currUser: null
        }
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    loadUserInfo() {
        AuthService.getCurrentUser()
            .then(response => {
                this.setState({
                    currUser: response.data
                })
            })
            .catch();
    }

    render() {

        if(this.state.currUser===null) return <></>;
        return <div className="text-center">
            <br/>
            <br/>
            <img className="img-profile rounded-circle" src={require('../../../../user.png')} alt="" />
            <br/>
            <br/>
            <sub>име</sub>
            <h5> <b>{this.state.currUser.name}</b></h5>
            <br/>
            <sub>корисничко име</sub>
            <h5> <b>{this.state.currUser.username}</b></h5>
            <br/>
            <sub>електронска пошта</sub>
            <h5><b>{this.state.currUser.mail}</b></h5>
        </div>
    }
}

export default withRouter(ProfileInfo);
