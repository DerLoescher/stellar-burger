import {useMemo} from "react";

function useOrderStatus(status: TOrderStatus | undefined): string {
    return useMemo(() => {
        let result;

        switch (status) {
            case 'done':
                result = 'Выполнен';
                break;
            case 'pending':
                result = 'Готовится';
                break;
            case 'created':
                result = 'Создан';
                break;
            default:
                result = 'Неизвестно';
        }

        return result;
    }, [status])
}

export default useOrderStatus;
