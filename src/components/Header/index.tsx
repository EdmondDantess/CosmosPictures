import './header.css'
import React from 'react';
import {DateInput} from '../DateInput';
import {isLoadingSelector, useAppStore} from '../../store/app';

export const Header = () => {

    const isLoading = useAppStore(isLoadingSelector)

    return <div className={'header'}>
        <div className={'header__container'}>
            <span>Astronomy Picture of the Day</span>
            <a target={'_blank'} href="https://github.com/EdmondDantess/CosmosPictures">
                <button disabled={isLoading}>Open in github</button>
            </a>
            <DateInput/>
        </div>
    </div>
}

