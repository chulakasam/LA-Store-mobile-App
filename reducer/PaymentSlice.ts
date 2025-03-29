import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Payments from "../model/Payments";




const initialState:Payments[] = [];


const api = axios.create({
    baseURL: "http://localhost:3005/payment",
});



export const savePayment = createAsyncThunk(
    "class/add",
    async (payments:Payments, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", payments);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const ClassSlice = createSlice({
    name: 'payments',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePayment.fulfilled, (state, action) => {
                state.push(action.payload);
            })

    }
});



export default ClassSlice.reducer;