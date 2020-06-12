import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";
import {ACCESS_TOKEN} from "../constants";


const ProizvodiNaSmetki = {

    getStatsForProizvodiInCity: (idGrad, minPrice, maxPrice, startDate, endDate) => {
        return axios.get(`/api/proizvodi-na-smetki/grad`, {
            params: {
                min_price: minPrice,
                max_price: maxPrice,
                start_date: startDate,
                end_date: endDate,
                id_grad: idGrad
            },
            headers: {
                Authorization: token(),
            }
        });
    },

    getStatsForProizvodiInFirma: (idFirma, minPrice, maxPrice, startDate, endDate) => {
        return axios.get(`/api/proizvodi-na-smetki/firma`, {
            params: {
                min_price: minPrice,
                max_price: maxPrice,
                start_date: startDate,
                end_date: endDate,
                id_firma: idFirma
            },
            headers: {
                Authorization: token(),
            }
        });
    },

    getStatsForProizvodiInProdavnica: (idProdavnica, minPrice, maxPrice, startDate, endDate) => {
        return axios.get(`/api/proizvodi-na-smetki/prodavnica`, {
            params: {
                min_price: minPrice,
                max_price: maxPrice,
                start_date: startDate,
                end_date: endDate,
                id_prodavnica: idProdavnica
            },
            headers: {
                Authorization: token(),
            }
        });
    },

    getStatsForProizvodiAll: (minPrice, maxPrice, startDate, endDate) => {
        return axios.get(`/api/proizvodi-na-smetki/all`, {
            params: {
                min_price: minPrice,
                max_price: maxPrice,
                start_date: startDate,
                end_date: endDate
            },
            headers: {
                Authorization: token(),
            }
        });
    }
};

function token() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        return 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }
    return '';
}
export default ProizvodiNaSmetki;
