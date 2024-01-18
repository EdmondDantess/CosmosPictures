export const transformDateForQuery = (date: Date | null) => {
    if (date) {
        return JSON.stringify(date).slice(1, 11)
    } else {
        return 'invalidDate'
    }
}
