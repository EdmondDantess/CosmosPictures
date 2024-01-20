export const transformDateForQuery = (date: Date | null) => {
    if (date) {
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    } else {
        return 'invalidDate'
    }
}

export const utcTimeNow = () => new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000)
