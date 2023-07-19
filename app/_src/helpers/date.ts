import { format, parseISO } from 'date-fns'

export const firebaseDateToStr = (str: string, dateFormat: string) => {
  return format(parseISO(str), dateFormat)
}
