import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {setToken, users} from '../../api/client'

export const login = createAsyncThunk(
    'users/auth',
    async ({username, password}) => {
        const response = await users.auth(username, password)
        return response.data
    })

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        status: 'idle',
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        changePwd: (state, action) => {

        },
        create: (state, action) => {

        },
    },
    extraReducers: (builder) => {
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

            });
    },
});

export const selectToken = (state) => state.user.token;

export const {changePwd, create} = userSlice.actions;

export default userSlice.reducer;