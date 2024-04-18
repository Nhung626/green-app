import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { LAND } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getLandAction = createAsyncThunk(
    'land/getLandAction',
    async () => {
        const res = await httpClient.get(LAND.SELF)
        return res.data
    }
)

export const createLandAction = createAsyncThunk(
    'land/createLandAction',
    async (data: {}) => {
        const res = await formdata.put(LAND.CREATE, data)
        return res.data
    }
)

export const updateLandAction = createAsyncThunk(
    'land/updateLandAction',
    async (data: {}) => {
        const res = await formdata.put(LAND.UPDATE, data)
        return res.data
    }
)

export const searchLandAction = createAsyncThunk(
    'land/searchLandAction',
    async (data: {}) => {
        const res = await httpClient.get(LAND.SEARCH, data)
        return res.data
    }
)

export const deleteLandAction = createAsyncThunk(
    'land/deleteLandAction',
    async (data: {}) => {
        const res = await httpClient.post(LAND.DELETE, data)
        return res.data
    }
)
