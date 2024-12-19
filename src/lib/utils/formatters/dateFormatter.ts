import { format } from 'date-fns';

export const formatDate = (date: number) => format(date / 1000, 'dd MMM yyyy HH:mm:ss');

export const formatDateWithMicroseconds = (timestamp: number) => {
    return format(timestamp / 1000, 'yyyy-MM-dd HH:mm:ss.SSS');
};
