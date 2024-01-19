import React from 'react';
import {Header} from './components/Header';
import {Table} from './components/Table';
import {BtnScrollUp} from './components/BtnScrollUp';
import {MessageAlert} from './components/MessageAlert';

function App() {

    return (
        <>
            <Header/>
            <Table/>
            <BtnScrollUp/>
            <MessageAlert/>
        </>
    );
}

export default App;
