import { format, parseISO } from 'date-fns';

export const formatDate = (date: number) => format(date / 1000, 'yyyy-MM-dd, HH:mm:ss');
