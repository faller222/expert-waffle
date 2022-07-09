import React from 'react';
import {useSelector} from "react-redux";
import {User} from './features/user/User';
import {Medic} from './features/medic/Medic';
import {selectToken} from "./features/user/userSlice";


function App() {

    const token = useSelector(selectToken);

    const content = token ?   <Medic/> : <User/>
    return (
        <div className="App">
            <header className="App-header">
                {content}
            </header>
        </div>
    );
}

export default App;
