import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";
import {ACCESS_TOKEN} from "../constants";


const Gradovi = {

    getAllGradovi: () => {
        return apiUtils.get("/api/gradovi");
    },

    addGrad: (param) => {
        const data = JSON.stringify(param);
        return axios.post("/api/gradovi", data, {
            headers: {
                Authorization: token(),
                'content-type': 'application/json'
            }
        });
    },
    getAllProdavniciVoGrad: (idGrad) => {
        return apiUtils.get(`/api/gradovi/${idGrad}/prodavnici`);
    }

};

function token() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }
    return '';
}

export default Gradovi;

