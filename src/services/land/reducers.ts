import { createSlice } from "@reduxjs/toolkit"
import { createLandAction, deleteLandAction, getLandAction, searchLandAction, updateLandAction } from "./actions"

interface ICOMMENTPOST {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: ICOMMENTPOST = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'comment-post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLandAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getLandAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getLandAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(searchLandAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchLandAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchLandAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})