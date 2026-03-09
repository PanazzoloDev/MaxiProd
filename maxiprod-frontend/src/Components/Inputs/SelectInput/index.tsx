/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { get, isFunction, toString } from 'lodash';
import { type typeControl } from '../../../Commons/types';

interface SelectInputProps extends typeControl {
    options: SelectInputItems[],
}

type SelectInputItems = {
    label: string,
    value?: string | number | readonly string[]
}

const isBoolValue = (obj: unknown): boolean => {
    const objString = toString(obj).toLowerCase();
    return ['true', 'false',''].includes(objString);
}

const SelectInput: React.FC<SelectInputProps> = (props: SelectInputProps) => {

    const { label, name, alias, required, value, options, readOnly, onChange } = props
    const [selectedValue, setSelectedValue] = useState<unknown>(value);


    const handleUpdate = (event: SelectChangeEvent<unknown>) => {
        const newValue = event.target.value;
        if (['string', 'boolean', 'number'].includes(typeof newValue) || isBoolValue(newValue)) {
            setSelectedValue(newValue);
            isFunction(onChange) && name != null && onChange(name,{ ...props, value: newValue });
        }
    };

    return (
        <FormControl 
            variant="standard" 
            sx={{ marginTop: 0.6, minWidth: 120 }}
            fullWidth    
        >
            <InputLabel color='success' required={required}>
                {label}
            </InputLabel>
            <Select
                variant='standard'
                color='success'
                fullWidth
                name={name}
                placeholder={alias}
                required={required}
                value={selectedValue}
                onChange={handleUpdate}
                readOnly={readOnly}
            >
                {options.map((item: SelectInputItems) => 
                    <MenuItem key={item.label} value={get(item,'value')}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default SelectInput;
