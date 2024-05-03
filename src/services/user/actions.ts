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
        const res = await formdata.post(USER_INFO.CREATE, data)
        return res.data
    }
)

export const updateInfoUserAction = createAsyncThunk(
    'user/updateInfoUserAction',
    async (data: {}) => {
        const res = await formdata.post(USER_INFO.UPDATE, data)
        return res.data
    }
)

export const updateAvatarAction = createAsyncThunk(
    'user/updateAatarAction',
    async (data: {}) => {
        const res = await formdata.post(USER_INFO.UPDATE_AVATAR, data)
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

export const followAction = createAsyncThunk(
    'status/followAction',
    async (data: {}) => {
        const res = await formdata.post(USER_INFO.FOLLOW, data)
        console.log(data)
        return res.data
    }
)

export const unfollowAction = createAsyncThunk(
    'status/unfollowAction',
    async (data: {}) => {
        const res = await formdata.post(USER_INFO.UNFOLLOW, data)
        return res.data
    }
)

