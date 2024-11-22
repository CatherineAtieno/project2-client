import axios from "axios";

export const BASE_URL = window.location.href.includes('local')
    ? "http://localhost:5000"
    : "http://localhost:5000"


const appApi = axios.create({
    baseURL: `${BASE_URL}/api/app`,
    withCredentials: true
})

export default appApi

