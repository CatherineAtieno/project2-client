import appApi, {BASE_URL} from "./api.ts";
import api from "./api.ts";
import axios, {AxiosResponse} from "axios";


export const fetchPlaces = (): Promise<BusinessObjFrmDb[]> => new Promise((resolve, reject) => {
    try {
        appApi.get("/businesses")
            .then(result => {
                resolve(result.data)
            })
            .catch(err => reject(err));
    } catch (e) {
        reject(e);
    }
})

export const submitReview = (review: ReviewObj): Promise<{ message: string }> =>
    new Promise((resolve, reject) => {
        try {
            appApi.post("/write-review", review)
                .then(result => resolve(result.data))
                .catch(err => reject(err));
        } catch (err) {
            reject(err);
        }
    })

export const signupQuery = (form: object): Promise<AxiosResponse> =>
    new Promise((resolve, reject) => {
        try {
            resolve(axios.post(`${BASE_URL}/api/auth/user-signup`, form))
        } catch (err) {
            reject(err);
        }
    })

export const loginQuery = (form: object): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        try {
            resolve(api.post(`${BASE_URL}/api/auth/user-login`, form))
        } catch (err) {
            reject(err);
        }
    })
}
