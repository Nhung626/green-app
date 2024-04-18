import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient";
import { AUTH } from "../../constants/api";

export const registerActions = createAsyncThunk(
    'auth/registerActions',
    async (payload: {}) => {
        const res = await httpClient.post(AUTH.REGISTER, payload)
        return res.data
    }
)

export const loginActions = createAsyncThunk(
    'auth/loginActions',
    async (payload: {}) => {
        const res = await httpClient.post(AUTH.LOGIN, payload)
        console.log("payload", res)
        return res.data
    }
)