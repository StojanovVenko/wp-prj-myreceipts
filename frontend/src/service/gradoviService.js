import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";


const Gradovi = {

    getAllGradovi: () => {
        return apiUtils.get("/api/gradovi");
    },

    addGrad: (param) => {
        return axios.post("/api/gradovi", param, {
            headers: {
                'content-type': 'application/json'
            }
        });
    }

};
export default Gradovi;

