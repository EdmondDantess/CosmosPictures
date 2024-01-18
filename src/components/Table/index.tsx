import './table.css'
import {useEffect} from 'react';
import {useAppStore} from '../../store/app.store';

export const Table = () => {
    const fetchData = useAppStore(state => state.fetchData)
    const title = useAppStore(state => state.nasaData.title)
    const picture = useAppStore(state => state.nasaData.url)
    const copyright = useAppStore(state => state.nasaData.copyright)
    const explanation = useAppStore(state => state.nasaData.explanation)
    const date = useAppStore(state => state.nasaData.date)

    useEffect(() => {
        fetchData()
    }, [])

    return <div className={'table'}>
        <div className={'table__container'}>
            <h2 className={'table__title'}>{title}</h2>
            <div className={'table__date'}>{date}</div>
            {picture && <img src={picture} alt="image"/>}
            <div className={'table__copyright'}><span>Copyright:</span> {copyright}</div>
            <div className={'table__explanation'}><span>Explanation: </span>{explanation}</div>
        </div>
    </div>
}

