/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';
interface CounterState {
    value: number
}
const initialState: CounterState = {
    value: 0,
}

export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        add: (state: any) => {
            state.value += 1
        },
        sub: (state: any) => {
            state.value -= 1
        },
    },
});

export const { add, sub } = CounterSlice.actions;

export default CounterSlice.reducer;
