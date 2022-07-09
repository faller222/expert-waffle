import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {medic} from '../../api/client'

export const getSymptoms = createAsyncThunk('medic/getSymptoms', async () => {
    const response = await medic.symptoms()
    return response.data
})

export const getDiagnosis = createAsyncThunk('medic/getDiagnosis', async ({symptoms, gender, year_of_birth}) => {
    console.log(symptoms, gender, year_of_birth)
    const response = await medic.diagnosis(symptoms, gender, year_of_birth)
    return response.data
})

export const medicSlice = createSlice({
    name: 'medic',
    initialState: {
        symptoms: [],
        diagnosis: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSymptoms.fulfilled, (state, action) => {
                const reducer = (a, c) => { a[c.ID] = c; return a}
                state.symptoms = action.payload.reduce(reducer, {})
                console.log('symptoms.fulfilled', state.symptoms)
            })
            .addCase(getDiagnosis.fulfilled, (state, action) => {
                console.log('diagnosis.fulfilled', action.payload)
                state.diagnosis = action.payload;
            });
    },
});

export const selectSymptoms = (state) => state.medic.symptoms;
export const selectDiagnosis = (state) => state.medic.diagnosis;


export default medicSlice.reducer;