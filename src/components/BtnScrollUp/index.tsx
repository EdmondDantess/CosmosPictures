import React, {useEffect, useRef} from 'react';
import './btnScroll.css'

export const BtnScrollUp = () => {

    const btn = useRef<HTMLDivElement | null>(null);

    const handlerScrollUp = () => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }

    const scrollhandler = () => {
        if (window.scrollY > 100 && btn.current) {
            btn.current.style.display = 'block'
        }
        if (window.scrollY < 100 && btn.current) {
            btn.current.style.display = 'none'
        }
    }


    useEffect(() => {
        window.onscroll = () => {
            scrollhandler()
        }
    }, [window.scrollY]);

    return (
        <div className={'btn_scroll-up'} onClick={handlerScrollUp} ref={btn}>Up</div>
    )
}
