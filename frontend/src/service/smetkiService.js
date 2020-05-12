import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";


const Smetki = {

    getSmetkaIfno: (id) => {
        return apiUtils.get(`/api/smetki/${id}`);
    },

    getSmetkiSoProdukti:(page,pageSize)=>{
        return axios.get(`/api/smetki`,{
            headers: {
                'page':page,
                'page-size':pageSize
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
                'page':page,
                'page-size': size
            }
        });
    }

};
export default Smetki;
