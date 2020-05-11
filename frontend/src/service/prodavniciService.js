import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";


const Prodavnici = {

    getAllProdavnici: () => {
        return apiUtils.get("/api/prodavnici");
    }

};
export default Prodavnici;

