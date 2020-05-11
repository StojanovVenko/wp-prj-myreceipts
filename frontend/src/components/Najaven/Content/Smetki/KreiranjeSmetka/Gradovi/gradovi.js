import React, {useEffect, useState} from 'react';
import GradoviService from "../../../../../../service/gradoviService";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenuGradovi, CustomToggleGradovi} from "../../../GradoviDropdown/gradoviDropdown";

class Gradovi extends React.Component {
    constructor(params){
        super(params);

        this.state = {
            gradovi : [],
            grad: "Внеси град",
            selectedGrad: "Избери град"
        }
    }

    componentDidMount() {
        GradoviService.getAllGradovi()
            .then(response => {
                this.setState({
                    gradovi : response.data
                })
            }).catch();
    }

    loadData() {
        GradoviService.getAllGradovi()
            .then(response => {
                this.setState({
                    gradovi : response.data
                })
            }).catch();
    }

    dodadiGrad (){
        const gBody = {
            ime: this.state.grad
        };
        GradoviService.addGrad(this.state.grad);
        this.setState({
            selectedGrad: this.state.grad
        });
        this.loadData();
    };

    render() {

        let gradoviHtml = this.state.gradovi.map((grad, index) => {
            return <Dropdown.Item eventKey={`${index}`} onClick={(e) => {
                this.setState({selectedGrad : e.target.attributes.getNamedItem('imegrad').value});
            }} idgrad={grad.idGrad} imegrad={grad.ime}>{grad.ime}</Dropdown.Item>;
        });


        let dropdown = <Dropdown>
            <Dropdown.Toggle as={CustomToggleGradovi} id="dropdown-custom-components">
                {this.state.selectedGrad}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenuGradovi}>
                <div className="input-group ml-3" style={{width: "210px"}}>
                    <input type="text" className="form-control" placeholder="Внеси град"
                           onChange={e => this.setState({grad: e.target.value})}
                           aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append" onClick={() => {this.dodadiGrad(); }}>
                        <button onClick={() => {this.dodadiGrad();}} className="btn btn-primary" >Додади</button>
                    </div>
                </div>
                {gradoviHtml}
            </Dropdown.Menu>

        </Dropdown>;



        return (
            <div className="col-sm-12">
                {dropdown}
            </div>
        );

    }

}

export default Gradovi;
