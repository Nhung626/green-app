import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { TREE } from "../../constants/api";
import formdata from "../../httpClient/multipartData";

export const getTreeAction = createAsyncThunk(
    'tree/getTreeAction',
    async () => {
        const res = await httpClient.get(TREE.SELF)
        return res.data
    }
)

export const createTreeAction = createAsyncThunk(
    'tree/createTreeAction',
    async (data: {}) => {
        const res = await formdata.post(TREE.CREATE, data)
        return res.data
    }
)

export const updateTreeAction = createAsyncThunk(
    'tree/updateTreeAction',
    async (data: {}) => {
        const res = await formdata.post(TREE.UPDATE, data)
        return res.data
    }
)

export const searchTreeAction = createAsyncThunk(
    'tree/searchTreeAction',
    async (data: {}) => {
        const res = await formdata.post(TREE.SEARCH, data)
        return res.data
    }
)

export const deleteTreeAction = createAsyncThunk(
    'tree/deleteTreeAction',
    async (data: {}) => {
        const res = await httpClient.post(TREE.DELETE, data)
        return res.data
    }
)
