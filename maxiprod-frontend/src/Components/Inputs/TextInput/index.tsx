/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/set-state-in-effect */
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const TextInput = ({...props}) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    },[props.value])

    const handleUpdate: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        props.onChange && props.name != null ?
            props.onChange(
                props.name,
                { ...props, value: event.target.value }
            ) : () => { }
        setValue(event.target.value);
    }

    return (
        <TextField
            variant={props.variant? props.variant : "standard"}
            color='success'
            type={props.type}
            name={props.name}
            label={props.label}
            disabled={props.readOnly}
            required={props.required}
            placeholder={props.alias}
            onChange={handleUpdate}
            sx={{margin: '5px 0px'}}
            fullWidth
            value={value}
            InputProps={props.InputProps}
            autoComplete='off'
        />
    )
}
export default TextInput;