import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import PropTypes from "prop-types";


const ProfileInput = ({type, placeholder, value, setValue}) => {
    const [inputDisabled, setInputDisabled] = useState(true)
    const inputRef = useRef(null);

    const onIconClick = () => {
        setInputDisabled(false);
        requestAnimationFrame(() => inputRef.current.focus())
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            setInputDisabled(true);
        }
    }

    return <Input
        type={type}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={type}
        ref={inputRef}
        onIconClick={onIconClick}
        onBlur={() => setInputDisabled(true)}
        disabled={inputDisabled}
        extraClass="mb-6"
        onKeyDown={e => onKeyDown(e)}
    />
}

ProfileInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default ProfileInput;