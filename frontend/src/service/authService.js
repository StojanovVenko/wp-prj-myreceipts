import apiUtils from "../util/apiUtils";
import {ACCESS_TOKEN} from "../constants";
import axios from "../custom-axios/axios";



const Auth = {
    login: (request) => {
        return apiUtils.post('/api/auth/login', request);
    },
    // register: (request) => {
    //     return  apiUtils.post('/api/auth/signup', request);
    // },
    register: (request) => {
        const data = JSON.stringify(request);
            return axios.post(`/api/auth/signup`, data, {
            headers: {
                'content-type': 'application/json'
            }
        });
    },
    getCurrentUser: () => {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
        return apiUtils.get('/api/auth/me');
    },
    updateUser: (request) => {
        const data = JSON.stringify(request);
        console.log("request");
        console.log(request);
        console.log(data);
        return axios.post("/api/auth/update", data, {
            headers: {
                Authorization: token(),
                'content-type': 'application/json'
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

export default Auth;
