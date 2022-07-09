import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {setToken, users} from '../../api/client'

export const login = createAsyncThunk('users/auth', async ({username, password}) => {
    const response = await users.auth(username, password)
    return response.data
})

export const create = createAsyncThunk('users/create', async ({first_name, last_name, email, username, password}) => {
    const response = await users.create({first_name, last_name, email, username, password})
    return response.data
})

export const userSlice = createSlice({
    name: 'user', initialState: {
        token: null,
        showingRegisterForm: false,
        status: 'idle',
    }, // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        showRegisterForm: (state, action) => {
            console.log('showRegisterForm', action.payload)
            state.showingRegisterForm = action.payload
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.token) {
                    state.token = action.payload.token;
                    setToken(state.token)
                } else {
                    state.token = null
                }

            })
            .addCase(create.fulfilled, (state, action) => {
                state.status = 'idle';
                state.showingRegisterForm = false;
                console.log('create', action.payload)
            });
    },
});

export const selectToken = (state) => state.user.token;
export const isShowingRegisterForm = (state) => state.user.showingRegisterForm;

export const {showRegisterForm} = userSlice.actions;

export default userSlice.reducer;