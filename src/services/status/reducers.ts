import { createSlice } from "@reduxjs/toolkit"
import { createStatusAction, deleteStatusAction, getStatusAction, searchStatusAction, updateStatusAction } from "./actions"

interface ISTATUS {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: ISTATUS = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatusAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getStatusAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getStatusAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })


        builder.addCase(searchStatusAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchStatusAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchStatusAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})