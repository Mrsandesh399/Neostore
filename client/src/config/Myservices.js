import axios from "axios"
import {MAIN_URL} from "./Url"

export function signup(data){
    return axios.post(`${MAIN_URL}posts/signup`,data)
}

export function login(data){
    return axios.post(`${MAIN_URL}posts/login`,data)
}

export function verifyOtp(data){
    return axios.post(`${MAIN_URL}posts/verify-otp`,data)
}

export function emailSend(data){
    return axios.post(`${MAIN_URL}posts/email-send`,data)
}

export function changePassword(values){
    return axios.post(`${MAIN_URL}posts/change-password`,values)
}

export function addAddress(data){
    return axios.post(`${MAIN_URL}posts/add-address/${data.email}`,data)
}

export function getUser(data){
    return axios.get(`${MAIN_URL}posts/get-user/${data}`)
}

export function addCart(data){
    return axios.post(`${MAIN_URL}posts/add-cart`,data)
}

export function getInvoice(id){
    return axios.get(`${MAIN_URL}posts/get-invoice/${id}`)
}

export function newPassword(data){
    return axios.post(`${MAIN_URL}posts/new-password/${data.email}`,data)
}



