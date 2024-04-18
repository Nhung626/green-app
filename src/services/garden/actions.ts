import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { GARDEN_INFO } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getGardenAction = createAsyncThunk(
    'garden/getGardenAction',
    async (data:{}) => {
        const res = await httpClient.get(GARDEN_INFO.SELF, data)
        return res.data
    }
)

export const createGardenAction = createAsyncThunk(
    'garden/createGardenAction',
    async (data: {}) => {
        const res = await formdata.put(GARDEN_INFO.CREATE, data)
        return res.data
    }
)

export const updateGardenAction = createAsyncThunk(
    'garden/updateGardenAction',
    async (data: {}) => {
        const res = await formdata.put(GARDEN_INFO.UPDATE, data)
        return res.data
    }
)

export const updateCoverAction = createAsyncThunk(
    'garden/updateCoverAction',
    async (data: {}) => {
        const res = await formdata.put(GARDEN_INFO.UPDATE_COVER, data)
        return res.data
    }
)

export const searchGardenAction = createAsyncThunk(
    'garden/searchGardenAction',
    async (data: {}) => {
        console.log(data)
        const res = await formdata.get(GARDEN_INFO.SEARCH, data)
        return res.data
    }
)

export const deleteGardenAction = createAsyncThunk(
    'garden/deleteGardenAction',
    async (data: {}) => {
        const res = await httpClient.post(GARDEN_INFO.DELETE, data)
        return res.data
    }
)
