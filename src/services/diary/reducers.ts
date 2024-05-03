import { createSlice } from "@reduxjs/toolkit"
import { createDiaryAction, deleteDiaryAction, getDiaryAction, searchDiaryAction, updateDiaryAction } from "./actions"

interface IDIARY {
    loading: boolean,
    res: [],
    message: string,
}

const initialState: IDIARY = {
    res: [],
    loading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDiaryAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(getDiaryAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
            };
        })
        builder.addCase(getDiaryAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(searchDiaryAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(searchDiaryAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(searchDiaryAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(createDiaryAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(createDiaryAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(createDiaryAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(updateDiaryAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(updateDiaryAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(updateDiaryAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })

        builder.addCase(deleteDiaryAction.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
        builder.addCase(deleteDiaryAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
            };
        })
        builder.addCase(deleteDiaryAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
            };
        })
    }
})