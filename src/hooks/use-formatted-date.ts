import {useMemo} from "react";
import {differenceInDays, format, isToday, isYesterday} from "date-fns";

function useFormattedDate(date: string | undefined): string {
    return useMemo(() => {
        if (!date) return 'Неизвестно';
        
        const stamp = new Date(date);

        if (isToday(stamp)) {
            return `Сегодня, ${format(stamp, 'HH:mm')}`;
        } else if (isYesterday(stamp)) {
            return `Вчера, ${format(stamp, 'HH:mm')}`;
        } else {
            const daysDifference = differenceInDays(new Date(), stamp);
            if (daysDifference < 7) {
                return `${daysDifference} дня${daysDifference > 1 ? ' назад' : ''}, ${format(stamp, 'HH:mm')}`;
            } else {
                return format(stamp, 'dd.MM.yyyy, HH:mm');
            }
        }
    }, [date])
}

export default useFormattedDate;
