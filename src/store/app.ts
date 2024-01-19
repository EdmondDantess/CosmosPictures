import {create} from 'zustand';
import {IPictureOfDayData} from '../utils/types';
import {instance} from '../api/instance';


interface IAppStore {
    nasaData: IPictureOfDayData[]
    fetchData: () => void,
    fetchRangeData: (dateStart: string, dateEnd: string) => void,
    isLoading: boolean
    msg: null | string
}

export const useAppStore = create<IAppStore>((set) => ({
    nasaData: [],
    isLoading: false,
    msg: null,
    fetchData: async () => {
        try {
            set({msg: null})
            set({isLoading: true})
            const data = await instance.get('')
            set({nasaData: [data.data]})
            set({msg: 'Picture of the Day is loaded successfully'})
        } catch (e) {
            set({msg: 'An error occurred while communicating with the server'})
            console.warn(e)
        } finally {
            set({isLoading: false})
        }
    },
    fetchRangeData: async (start_date: string, end_date: string) => {
        try {
            set({msg: null})
            set({isLoading: true})
            const data = await instance.get('', {
                params: {
                    start_date,
                    end_date,
                }
            })
            set({nasaData: data.data})
            set({msg: 'Archive Pictures is loaded successfully'})
        } catch (e) {
            set({msg: 'An error occurred while communicating with the server', nasaData: []})
            console.warn(e)
        } finally {
            set({isLoading: false})
        }
    }
}))

export const fetchRangeDataSelector = (state: IAppStore) => state.fetchRangeData
export const fetchDataSelector = (state: IAppStore) => state.fetchData
export const isLoadingSelector = (state: IAppStore) => state.isLoading
export const nasaDataSelector = (state: IAppStore) => state.nasaData
export const msgSelector = (state: IAppStore) => state.msg
