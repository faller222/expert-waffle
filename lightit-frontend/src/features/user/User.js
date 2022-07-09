import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isShowingRegisterForm, selectToken} from './userSlice';
import {UserLogin} from "./UserLogin";
import {UserRegister} from "./UserRegister";

export function User() {

    const showingRegisterForm = useSelector(isShowingRegisterForm);

    if (showingRegisterForm) {
        return (<UserRegister/>)
    } else {
        return (<UserLogin/>)
    }
}