import {useState} from "react";

function useForm(baseForm) {
    const [form, setForm] = useState(baseForm);

    function handleChange(payload) {
        const element = payload.target;

        if (!element) {
            setForm((pastForm) => ({...pastForm, ...payload}));
        } else {
            setForm((pastForm) => ({...pastForm, [element.name]: element.value}));
        }
    }

    return [form, handleChange];
}

export default useForm;
