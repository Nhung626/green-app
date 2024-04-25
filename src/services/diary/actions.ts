import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { DIARY } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getDiaryAction = createAsyncThunk(
    'diary/getDiaryAction',
    async () => {
        const res = await httpClient.get(DIARY.SELF)
        return res.data
    }
)

export const createDiaryAction = createAsyncThunk(
    'diary/createDiaryAction',
    async (data: {}) => {
        const res = await formdata.post(DIARY.CREATE, data)
        return res.data
    }
)

export const updateDiaryAction = createAsyncThunk(
    'diary/updateDiaryAction',
    async (data: {}) => {
        const res = await formdata.post(DIARY.UPDATE, data)
        return res.data
    }
)

export const searchDiaryAction = createAsyncThunk(
    'diary/searchDiaryAction',
    async (data: {}) => {
        const res = await formdata.post(DIARY.SEARCH, data)
        return res.data
    }
)

export const deleteDiaryAction = createAsyncThunk(
    'diary/deleteDiaryAction',
    async (data: {}) => {
        const res = await httpClient.post(DIARY.DELETE, data)
        return res.data
    }
)
