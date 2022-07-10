import React from 'react';
import {useSelector} from 'react-redux';
import {isShowingRegisterForm} from './userSlice';
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