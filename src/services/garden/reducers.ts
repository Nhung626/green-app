import { createSlice } from "@reduxjs/toolkit"
import { createGardenAction, deleteGardenAction, getGardenAction, searchGardenAction, updateGardenAction } from "./actions"

interface IGARDEN {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: IGARDEN = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGardenAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getGardenAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getGardenAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(searchGardenAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchGardenAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchGardenAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(createGardenAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(createGardenAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(createGardenAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(updateGardenAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(updateGardenAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(updateGardenAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(deleteGardenAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(deleteGardenAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(deleteGardenAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

    }
})