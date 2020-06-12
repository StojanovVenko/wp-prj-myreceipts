import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";
import {ACCESS_TOKEN} from "../constants";


const Smetki = {

    getSmetkaIfno: (id) => {
        return apiUtils.get(`/api/smetki/${id}`);
    },

    getMinMaxIznosAndDateForSmetka: (id) => {
        return apiUtils.get(`/api/smetki/user/min-max`);
    },

    getSmetkiSoProdukti:(page,pageSize)=>{
        return axios.get(`/api/smetki`,{
            headers: {
                Authorization: token(),
                'page':page,
                'page-size':pageSize
            }
        })
    },

    getInfoZaPoslednaNedela:(page,pageSize)=>{
        return axios.get(`/api/smetki/last-seven-days`,{
            headers: {
                Authorization: token(),
            }
        })
    },

    getSmetkiSoProduktiSoFiltri: (page, size, idGrad, idProdavnica, startPrice, endPrice, satartDate, endDate) => {
        return axios.get(`/api/smetki`, {
            params: {
                gr: idGrad,
                pr: idProdavnica,
                sp: startPrice,
                ep: endPrice,
                sd: satartDate,
                ed: endDate
            },
            headers: {
                Authorization: token(),
                'page':page,
                'page-size': size
            }
        });
    },
    getSmetkiSoProduktiSoFiltriZaFirma: (page, size, idFirma, idProdavnica, startPrice, endPrice, satartDate, endDate) => {
        return axios.get(`/api/firmi/${idFirma}/smetki`, {
            params: {
                // firma: idFirma,
                pr: idProdavnica,
                sp: startPrice,
                ep: endPrice,
                sd: satartDate,
                ed: endDate
            },
            headers: {
                Authorization: token(),
                'page':page,
                'page-size': size
            }
        });
    },

    getSmetkiSoProduktiSoFiltriZaGrad: (page, size, idGrad, idProdavnica, startPrice, endPrice, satartDate, endDate) => {
        return axios.get(`/api/gradovi/${idGrad}/smetki`, {
            params: {
                pr: idProdavnica,
                sp: startPrice,
                ep: endPrice,
                sd: satartDate,
                ed: endDate
            },
            headers: {
                Authorization: token(),
                'page':page,
                'page-size': size
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
export default Smetki;
