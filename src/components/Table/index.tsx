import './table.css'
import React, {useEffect, useState} from 'react';
import {useAppStore} from '../../store/app.store';
import {IPictureOfDayData} from '../../lib/definitions';
import {Spiner} from '../Spiner';

export const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const fetchData = useAppStore(state => state.fetchData)
    const isLoading = useAppStore(state => state.isLoading)
    const data = useAppStore(state => state.nasaData)

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchData()
    }, [])

    const renderData = () => {
        const start = (currentPage - 1) * 5;
        const end = start + 5;
        return data.slice(start, end).map((el: IPictureOfDayData) => {
            return <div className={'table__card'} key={el.explanation}>
                <div className={'table__title'}>{el.title}</div>
                <div className={'table__date'}>{el.date}</div>
                {el.media_type === 'image' && <img src={el.url} alt="image"/>}
                {el.media_type === 'video' && <iframe src={el.url} allowFullScreen/>}
                {el.copyright &&
                    <div className={'table__copyright'}><span>Copyright:</span> {el.copyright}</div>}
                <div className={'table__explanation'}><span>Explanation: </span>{el.explanation}</div>
            </div>
        })
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(data.length / 5);
        const pageNumbers: React.ReactElement[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div key={i} className={currentPage === i ? 'table__pagination_active' : ''}>
                    <button onClick={() => handleClick(i)}>{i}</button>
                </div>
            );
        }
        return pageNumbers;
    };

    return <div className={'table'}>
        <div className={'table__container'}>
            {
                isLoading
                    ? <Spiner/>
                    : <>
                        {data.length > 5 && <div className={'table__pagination'}>{renderPagination()}</div>}
                        {data.length !== 0
                            ?   renderData()
                        :<div className={'table__no-data'}>Empty</div>
                        }
                    </>
            }
        </div>
    </div>
}


