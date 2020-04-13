import React from "react";
import Gradovi from "./Gradovi/gradovi";

class KreiranjeSmetka extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idGrad : -1
        }

    }




    render() {

    return(
        <div className="container">
            <h1 className="text-center display-4">Внесување нова фискална сметка</h1>
            <hr/>
            <div className="row">
                <div className="col-sm-9">
                    <div className="row ">
                        <Gradovi />
                    </div>
                    <hr/>
                </div>
                <div className="col-sm-3">
                </div>
            </div>
        </div>

    )
    }

}
export default KreiranjeSmetka;