import axios from "axios";
import { BASE_URL } from "../constants/api";
import { getItemObjectAsyncStorage } from "../../utils/asyncStorage";
import { KEY_STORAGE } from "../constants/storage";

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    }
})

let token
const getToken = async () => {
  token = await getItemObjectAsyncStorage(KEY_STORAGE.SAVED_INFO);
} 

httpClient.interceptors.request.use(async function (config) {
  await getToken(); // Chờ hàm này hoàn thành trước khi tiếp tục
  config.headers.Authorization = token ? `Bearer ${token.token}` : '';
  console.log(config.headers.Authorization);
  return config;
});


httpClient.interceptors.response.use(
  function (response) {
    console.log('API', response);
    return response;
  },
);

export default httpClient