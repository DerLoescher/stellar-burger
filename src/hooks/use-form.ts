import {ChangeEvent, useState} from "react";

type Form<T> = T & { [key: string]: any };

function useForm<T extends object>(baseForm: T): [Form<T>, (payload: ChangeEvent<HTMLInputElement> | Form<T>) => void] {
    const [form, setForm] = useState(baseForm);

    function handleChange(payload: ChangeEvent<HTMLInputElement> | Form<T>):void {
        const element: HTMLInputElement = payload.target;

        if (!element) {
            setForm((pastForm) => ({...pastForm, ...payload}));
        } else {
            setForm((pastForm) => ({...pastForm, [element.name]: element.value}));
        }
    }

    return [form, handleChange];
}

export default useForm;
