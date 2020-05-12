import apiUtils from "../util/apiUtils";

const Prodavnici = {

    getAllProdavnici: () => {
        return apiUtils.get("/api/prodavnici");
    }

};
export default Prodavnici;

