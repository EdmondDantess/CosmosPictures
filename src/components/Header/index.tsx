import './header.css'
import React from 'react';
import {DateInput} from '../DateInput';

export const Header = () => {
    return <div className={'header'}>
        <div className={'header__container'}>
            <span>Astronomy Picture of the Day</span>
            <a target={'_blank'} href="https://github.com/EdmondDantess/CosmosPictures">
                <button>Open in github</button>
            </a>
            <DateInput/>
        </div>
    </div>
}

