import {toast, ToastContainer} from 'react-toastify';
import React, {useEffect} from 'react';
import {msgSelector, useAppStore} from '../../store/app';
import 'react-toastify/dist/ReactToastify.css';

export const MessageAlert = () => {

    const msg = useAppStore(msgSelector)

    useEffect(() => {
        toast(msg)
    }, [msg]);

    return <ToastContainer
        position="top-center"
        autoClose={3500}
        newestOnTop={false}
        closeOnClick
        theme="dark"
    />
}
