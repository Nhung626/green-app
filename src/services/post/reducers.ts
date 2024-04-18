import { createSlice } from "@reduxjs/toolkit"
import { createPostAction, deletePostAction, getPostAction, searchPostAction, updatePostAction } from "./actions"

interface IPOST {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: IPOST = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPostAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getPostAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getPostAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })


        builder.addCase(searchPostAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchPostAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchPostAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})