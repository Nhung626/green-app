import { createSlice } from "@reduxjs/toolkit"
import { createCommentPostAction, deleteCommentPostAction, getCommentPostAction, searchCommentPostAction, updateCommentPostAction } from "./actions"

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
        builder.addCase(getCommentPostAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getCommentPostAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getCommentPostAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })


        builder.addCase(searchCommentPostAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchCommentPostAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchCommentPostAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})