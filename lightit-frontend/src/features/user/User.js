import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, selectToken} from './userSlice';


export function User() {

    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            Token: {token}
            <input placeholder="username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button
                onClick={() => dispatch(login({username, password}))}
            >
                Login
            </button>
        </div>
    );
}