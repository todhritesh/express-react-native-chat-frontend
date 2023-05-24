import axios from "axios";
// import {BASE_URL} from "@env"
// console.log(BASE_URL)
const api = axios.create({
    baseURL:'http://192.168.1.6:4000/api'
})

export default api