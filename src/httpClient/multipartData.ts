import axios from "axios";
import { BASE_URL } from "../constants/api";
import { getItemObjectAsyncStorage } from "../../utils/asyncStorage";
import { KEY_STORAGE } from "../constants/storage";

const formdata = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    }
})

let token
const getToken = async () => {
    token = await getItemObjectAsyncStorage(KEY_STORAGE.SAVED_INFO);
}
formdata.interceptors.request.use(function (config) {
    getToken()
    config.headers.Authorization = token ? `Bearer ${token.token}` : '';
    return config;
});

formdata.interceptors.response.use(
    function (response) {
        return response;
    },
);

export default formdata