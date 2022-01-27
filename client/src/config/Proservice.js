import axios from "axios"
import {MAIN_URL} from "./Url"

export function getProducts(){
    return axios.get(`${MAIN_URL}products/getting-pro`)
}

export function productDetails(id){
    return axios.get(`${MAIN_URL}products/product-details/${id}`)
}

export function getColor(id){
    return axios.get(`${MAIN_URL}products/col/${id}`)
}

export function getAllColor(){
    return axios.get(`${MAIN_URL}products/col-all`)
}
export function getAllCategory(){
    return axios.get(`${MAIN_URL}products/cat-all`)
}

export function addOrder(data){
    return axios.post(`${MAIN_URL}products/get-order`,data)
}

export function getOrderDetails(data){
    return axios.get(`${MAIN_URL}products/get-orderdetail/${data}`)
}


