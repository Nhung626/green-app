import { createSlice } from "@reduxjs/toolkit"
import { createTreeAction, deleteTreeAction, getTreeAction, searchTreeAction, updateTreeAction } from "./actions"

interface ITREE {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: ITREE = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTreeAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getTreeAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getTreeAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(searchTreeAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchTreeAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchTreeAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})