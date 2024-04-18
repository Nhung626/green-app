import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { STATUS } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getStatusAction = createAsyncThunk(
    'status/getStatusAction',
    async () => {
        const res = await httpClient.get(STATUS.SELF)
        return res.data
    }
)

export const createStatusAction = createAsyncThunk(
    'status/createStatusAction',
    async (data: {}) => {
        const res = await formdata.put(STATUS.CREATE, data)
        return res.data
    }
)

export const updateStatusAction = createAsyncThunk(
    'status/updateStatusAction',
    async (data: {}) => {
        const res = await formdata.put(STATUS.UPDATE, data)
        return res.data
    }
)

export const searchStatusAction = createAsyncThunk(
    'status/searchStatusAction',
    async (data: {}) => {
        const res = await httpClient.get(STATUS.SEARCH, data)
        return res.data
    }
)

export const deleteStatusAction = createAsyncThunk(
    'status/deleteStatusAction',
    async (data: {}) => {
        const res = await httpClient.post(STATUS.DELETE, data)
        return res.data
    }
)

export const likeStatusAction = createAsyncThunk(
    'status/likeStatusAction',
    async (data: {}) => {
        const res = await httpClient.post(STATUS.LIKE, data)
        return res.data
    }
)

export const unlikeStatusAction = createAsyncThunk(
    'status/unlikeStatusAction',
    async (data: {}) => {
        const res = await httpClient.post(STATUS.UNLIKE, data)
        return res.data
    }
)
