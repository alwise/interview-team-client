/* eslint-disable import/no-anonymous-default-export */
// import axios from 'axios';
import {requests as API} from './api_request'
import { LocalStorage } from '.';
// const FormData = require('form-data');
// import * as FormData from 'form-data';


export default {

    login: async(data) =>{
        const result = await (await API.post(API.baseUrl.users(API.endpoint.login),data)).data;
        return result;
    },

    register: async(data) =>{
        const result = await (await API.post(API.baseUrl.users(API.endpoint.create),data)).data;
        return result;
    },

    requestPasswordReset: async(data) =>{
        const result = await (await API.post(API.baseUrl.users(API.endpoint.requestPasswordReset),data)).data;
        return result;
    },
    resetPassword: async(data) =>{
        const result = await (await API.patch(API.baseUrl.users(API.endpoint.resetPassword),data)).data;
        return result;
    },

    update: async(data) =>{
        const result = await (await API.patch(API.baseUrl.users(API.endpoint.update),data)).data;
        return result;
    },

    setUserData: (value)=>value && LocalStorage.setUser(value),

    getCurrentUser: ()=>JSON.parse(LocalStorage.getUser()),

    logout:()=>LocalStorage.clear()
}

