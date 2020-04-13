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


};
export default Smetki;