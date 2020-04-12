import apiUtils from "../util/apiUtils";
import axios from "../custom-axios/axios";


const Smetki = {

    getSmetkaIfno: (id) => {
        return apiUtils.get(`/smetki/${id}`);
    },

    getSmetkiSoProdukti:(page,pageSize)=>{
        return axios.get(`/smetki`,{
            headers: {
                'page':page,
                'page-size':pageSize
            }
        })
    },


};
export default Smetki;