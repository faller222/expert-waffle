import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {diagnosis} from '../../api/client'

export const getHistoricDiagnosis = createAsyncThunk('diagnosis/getDiagnosis', async () => {
    const response = await diagnosis.get()
    return response.data
})

export const confirmDiagnosis = createAsyncThunk('diagnosis/confirmDiagnosis', async (newDiagnosis) => {
    await diagnosis.create(newDiagnosis)
    return newDiagnosis
})

export const diagnosisSlice = createSlice({
    name: 'diagnosis',
    initialState: {
        historic: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistoricDiagnosis.fulfilled, (state, action) => {
                state.historic = action.payload.map(d => {
                    d.datetime = new Date(d._datetime);
                    return d
                });

                console.log('getHistoricDiagnosis.fulfilled', state.historic)
            })
            .addCase(confirmDiagnosis.fulfilled, (state, action) => {
                console.log('confirmDiagnosis.fulfilled', action.payload)
                // Fake Backend response
                state.historic = [...state.historic, {...action.payload, _datetime: '__'}]
            });
    },
});

export const selectHistoricDiagnosis = (state) => state.diagnosis.historic;

export default diagnosisSlice.reducer;