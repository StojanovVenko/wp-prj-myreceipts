import React from "react";
import Sidebar from "./Sidebar/sidebar";
import Header from "./Header/header";
import {withRouter} from "react-router";
import Content from "./Content/content";

class Najaven extends React.Component {


    render() {

        return (
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column" >
                    <div id="content" >
                        <Header logout={this.props.logout}
                                currentUser={this.props.currentUser}
                                />
                        <Content editUser={this.props.editUser}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Najaven);
