import {create} from 'zustand';
import {IPictureOfDayData} from '../lib/definitions';
import {instance} from '../api/instance';


interface IAppStore {
    nasaData: IPictureOfDayData[]
    fetchData: () => void,
    fetchRangeData: (dateStart: string, dateEnd: string) => void,
    isLoading: boolean
}

export const useAppStore = create<IAppStore>((set) => ({
    nasaData:
    //data
        []
    ,
    isLoading: false,
    fetchData: async () => {
        try {
            set({isLoading: true})
            const data = await instance.get('')
            set({nasaData: [data.data]})
        } catch (e) {
            console.warn(e)
        } finally {
            set({isLoading: false})
        }
    },
    fetchRangeData: async (start_date: string, end_date: string) => {
        try {
            set({isLoading: true})
            const data = await instance.get('', {
                params: {
                    start_date,
                    end_date,
                }
            })
            set({nasaData: data.data})
        } catch (e) {
            console.warn(e)
        } finally {
            set({isLoading: false})
        }
    }
}))
