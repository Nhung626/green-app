import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { USER_INFO } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getInfoUserAction = createAsyncThunk(
    'user/getInfoUserAction',
    async (data: {}) => {
        const res = await httpClient.get(USER_INFO.SELF, data)
        return res.data
    }
)

export const createInfoUserAction = createAsyncThunk(
    'user/createInfoUserAction',
    async (data: {}) => {
        const res = await formdata.put(USER_INFO.CREATE, data)
        return res.data
    }
)

export const updateInfoUserAction = createAsyncThunk(
    'user/updateInfoUserAction',
    async (data: {}) => {
        const res = await formdata.put(USER_INFO.UPDATE, data)
        return res.data
    }
)

export const updateAatarAction = createAsyncThunk(
    'user/updateAatarAction',
    async (data: {}) => {
        const res = await formdata.put(USER_INFO.UPDATE_AVATAR, data)
        return res.data
    }
)

export const searchInfoUserAction = createAsyncThunk(
    'user/searchInfoUserAction',
    async (data: {}) => {
        console.log('req search',data)
        const res = await formdata.get(USER_INFO.SEARCH, data)
        return res.data
    }
)

// export const resetPasswordAction = createAsyncThunk(
//     'user/resetPasswordAction',
//     async (data: {}) => {
//         const res = await httpClient.put(USER_INFO.RESET_PASSWORD, data)
//         return res.data
//     }
// )
