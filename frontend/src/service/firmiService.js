import apiUtils from "../util/apiUtils";

const Firmi = {

    getAllFirmi: () => {
        return apiUtils.get(`/api/firmi`);
    },

    getFirma: (idFirma) => {
        return apiUtils.get(`/api/firmi/${idFirma}`);
    },

    getAllProdavniciVoFirma: (idFirma) => {
        return apiUtils.get(`/api/firmi/${idFirma}/prodavnici`);
    }

};
export default Firmi;

