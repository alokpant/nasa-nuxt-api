import { format } from 'date-fns';

const DATE_KEY =  'yyyy-MM-dd';

export function formatDate(date: Date): string {
  return format(date, DATE_KEY);
}

