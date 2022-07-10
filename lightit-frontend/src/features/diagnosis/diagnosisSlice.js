import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {diagnosis} from '../../api/client'

export const getDiagnosis = createAsyncThunk('diagnosis/getDiagnosis', async () => {
    const response = await diagnosis.get()
    return response.data
})

export const confirmDiagnosis = createAsyncThunk('diagnosis/confirmDiagnosis', async (newDiagnosis) => {
    await diagnosis.create(newDiagnosis)
})

export const diagnosisSlice = createSlice({
    name: 'diagnosis',
    initialState: {
        diagnosis: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDiagnosis.fulfilled, (state, action) => {
                state.diagnosis = action.payload;
                console.log('getDiagnosis.fulfilled', state.diagnosis)
            })
            .addCase(confirmDiagnosis.fulfilled, (state, action) => {
                console.log('confirmDiagnosis.fulfilled', action.payload)
                state.diagnosis = action.payload;
            });
    },
});

export const selectDiagnosis = (state) => state.medic.diagnosis;


export default diagnosisSlice.reducer;