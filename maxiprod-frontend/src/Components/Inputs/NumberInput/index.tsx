/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { TextField } from '@mui/material';
import { isFunction } from 'lodash';

import React, { type ChangeEvent, type KeyboardEvent, useEffect, useState } from 'react';
import type { typeControl } from '../../../Commons/types';

interface NumberInputProps extends typeControl {
    fullwidth?: boolean;
    size?: 'small' | 'medium',
    InputProps?: any,
    variant?: 'outlined' | 'standard'
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
    sx?: object,
    onKeyDown?: (e: KeyboardEvent<Element>) => void
}

const NumberInput = (props: NumberInputProps) => {

    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    const handleUpdate: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isFunction(props.onChange) && props.name != null ?
            props.onChange(
                props.name,
                { ...props, value: event.target.value }
            ) : () => { }
    }

    return (
        <TextField
            variant={props.variant ?? 'outlined'}
            name={props.name}
            label={props.label}
            placeholder={props.alias}
            type='number'
            color='success'
            fullWidth={props.fullwidth ?? false}
            required={props.required}
            size={props.size ?? 'small'}
            sx={props.sx ? props.sx : { margin: '5px 0px' }}
            disabled={props.readOnly}
            value={value}
            InputProps={props.InputProps}
            onChange={props.onUpdate ? props.onUpdate : handleUpdate}
            onKeyDown={props.onKeyDown}
        >
        </TextField>
    )
}
export default NumberInput;