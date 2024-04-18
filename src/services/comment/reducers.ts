import { createSlice } from "@reduxjs/toolkit"
import { createCommentAction, deleteCommentAction, getCommentAction, searchCommentAction, updateCommentAction } from "./actions"

interface ICOMMENT {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: ICOMMENT = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCommentAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getCommentAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getCommentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })


        builder.addCase(searchCommentAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchCommentAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchCommentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})