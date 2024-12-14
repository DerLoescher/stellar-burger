import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FC, useRef, useState} from "react";

interface IProfileInput {
    type: string;
    name: string;
    placeholder: string;
    value?: string;
    setValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput: FC<IProfileInput> = ({type, name, placeholder, value, setValue}) => {
    const [inputDisabled, setInputDisabled] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setInputDisabled(false);
        requestAnimationFrame(() => inputRef.current?.focus())
    }

    const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
            setInputDisabled(true);
        }
    }

    return <Input
        type={type}
        placeholder={placeholder}
        onChange={setValue}
        icon={'EditIcon'}
        value={value}
        name={name}
        ref={inputRef}
        onIconClick={onIconClick}
        onBlur={() => setInputDisabled(true)}
        disabled={inputDisabled}
        extraClass="mb-6"
        onKeyDown={onKeyDown}
    />
}

export default ProfileInput;