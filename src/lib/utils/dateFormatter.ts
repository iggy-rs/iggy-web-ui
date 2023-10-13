import { format, parseISO } from 'date-fns';

export const formatDate = (date: number) => format(date / 1000, 'dd MMM yyyy HH:mm:ss');
