/* eslint-disable @typescript-eslint/no-unused-expressions */
import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { cloneDeep, get, toString } from "lodash";
import { type KeyboardEvent, useEffect, useState } from "react";
import type { FilterType, typeControl } from "../../../Commons/types";
import { useDialogContext } from "../../../Contexts/DialogContext";
import DatagridContainer from "./DatagridContainer";
import store from './DatagridStore';

import NumberInput from "../NumberInput";
import TextInput from "../TextInput";
import { SearchInputContainer } from "./style";

interface DatagridInputProps extends typeControl {
    valueAcessor: string,
    labelAcessor: string,
    defaultFilters?: Array<FilterType>
}

const DatagridInput = (props: DatagridInputProps) => {
    const { openDialog, closeDialog } = useDialogContext();
    const [value, setValue] = useState(props.value);
    const [text, setText] = useState('');

    const handleUpdate = (row: object) => {
        setText(get(row, props.labelAcessor));
        setValue(get(row, props.valueAcessor));
        props.onChange && props.name != null ?
            props.onChange(
                props.name,
                {
                    ...props,
                    value: get(row, props.valueAcessor)
                }
            ) : () => { }
        closeDialog()
    }

    // Abre o modal com o grid
    const handleOpenModal = () => {
        openDialog({
            component:
                <DatagridContainer
                    {...props}
                    handleUpdate={handleUpdate}
                    defaultFilters={props.defaultFilters ?? []}
                />,
            title: props.alias,
            okCallback: closeDialog,
            width: "xl",
            okText: "Confirmar",
            isOpen: true,
        });
    };

    const FetchData = (type: 'Code' | 'Id') => {
        if (!['', undefined, 0].includes(toString(value)) && text == '') {
            const defaultFilters = cloneDeep(props.defaultFilters) ?? []
            defaultFilters.push({
                Field: type,
                Operation: 'Equals',
                Value: toString(value),
                Operator: 'AND'
            })
            store.FetchData(1, 1, undefined, defaultFilters, undefined)
                .then(() => {
                    const newLabel = get(store, `data[0].${props.labelAcessor}`)
                    const newValue = get(store, `data[0].${props.valueAcessor}`)
                    if (newLabel && newValue && props.onChange && props.name) {
                        setText(newLabel)
                        setValue(newValue)
                        props.onChange(props.name, { ...props, value: newValue })
                    }
                })
        }
    }

    useEffect(() => {

        FetchData('Id')
    }, [])

    const onWrite = (_controlName: string, control: typeControl) => {
        setValue(control.value)
        setText('')
    }

    const onChange = (e: KeyboardEvent<Element>) => {
        if (e.key == 'Enter') {
            FetchData('Code')
        }
    }

    return (
        <SearchInputContainer>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <NumberInput
                        name={props.name}
                        label={props.label}
                        alias={props.alias}
                        readOnly={props.readOnly}
                        required={props.required}
                        value={value}
                        variant='standard'
                        size='medium'
                        onKeyDown={onChange}
                        onChange={onWrite}
                        fullwidth={true}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={props.readOnly ? () => { } : handleOpenModal}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextInput
                        name={props.name}
                        label={props.label}
                        value={text}
                        alias={props.alias}
                        readOnly={props.readOnly}
                        required={props.required}
                    />
                </Grid>
            </Grid>
        </SearchInputContainer>
    )
}

export default DatagridInput