import React, {useEffect, useState} from 'react';
import {fetchDataSelector, isLoadingSelector, nasaDataSelector, useAppStore} from '../../store/app';
import {IPictureOfDayData} from '../../utils/types';
import {Spiner} from '../Spiner';
import './table.css'

export const Table = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useAppStore(fetchDataSelector)
    const isLoading = useAppStore(isLoadingSelector)
    const data = useAppStore(nasaDataSelector)

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
                <div className={'table__date'}><span>Date:</span> {el.date}</div>
                {el.media_type === 'image' && <img src={el.url} alt="image"/>}
                {el.media_type === 'video' && <iframe src={el.url} allowFullScreen/>}
                {el.copyright &&
                    <div className={'table__copyright'}><span>Copyright:</span> {el.copyright}</div>}
                <div className={'table__explanation'}><span>Explanation:</span> {el.explanation}</div>
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
                        {data.length === 0 && <div>Information no found...</div>}
                        {data.length > 5 && <div className={'table__pagination'}>{renderPagination()}</div>}
                        {renderData()}
                    </>
            }
        </div>
    </div>
}


