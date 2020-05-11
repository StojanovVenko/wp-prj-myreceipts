import React, {useEffect, useState} from 'react';
import GradoviService from "../../../../../service/gradoviService";
import Dropdown from "react-bootstrap/Dropdown";
import {CustomMenu, CustomToggle} from "../../GradoviDropdown/gradoviDropdown";

const Gradovi = (props) => {

    let [gradovi, setGradovi] = useState([]);
    let [selectedGrad, setSelectedGrad] = useState("Избери град");

    useEffect(()=>{
        GradoviService.getAllGradovi()
            .then(response => {
                setGradovi(response.data);
            })
            .catch();
    }, []);

    const loadData = () => {
        GradoviService.getAllGradovi()
            .then(response => {
                    setGradovi(response.data);
                })
            .catch();
    };

    const getGrad = (id, ime) => {
        props.changeGrad(id, ime);
    };

    let gradoviHtml = gradovi.map((grad, index) => {
        return <Dropdown.Item eventKey={`${index}`} onClick={(e) => {
            getGrad(e.target.attributes.getNamedItem('idgrad').value,
                e.target.attributes.getNamedItem('imegrad').value);
        }} idgrad={grad.idGrad} imegrad={grad.ime}>{grad.ime}</Dropdown.Item>;
    });

};

export default Gradovi;
