import { formatDistanceToNow, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale';

export const formatToBRL = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const formatDateDistance = (date: string) => date ? formatDistanceToNow(parseISO(date), { addSuffix: true, locale: enUS }) : ''

export const formatDateShortMonth = (date: string) => {
    const formatedDate = new Date(date)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
        .replace(/de\s+/g, '')
        .replace(/\./g, '')
        .toUpperCase()

    return formatedDate
}