import moment from 'moment';

export const useDateFormatter = () => {
    
    const formatDateTime = (dateTime, pattern = 'dd.MM.yyyy HH:mm') => {
        return moment(dateTime, pattern).format('L')
    }

    return {
        formatDateTime
    }
}