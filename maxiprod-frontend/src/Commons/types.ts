import type { JSX } from "react";

/* eslint-disable react-refresh/only-export-components */
interface Controls {
    [key: string]: typeControl;
}

interface responseType {
    statusCode: number;
    messages: string | string[];
    data?: object;
}

export type DialogWidthType = "xl" | "lg" | "md" | "sm";

export type OpenDialogType = (args: {
  component: React.ReactNode;
  title: string;
  okCallback: () => void;
  cancelCallback?: () => void;
  width?: DialogWidthType;
  okText?: string;
  cancelText?: string;
}) => void;

export interface DialogPropTypes {
  openDialog: OpenDialogType;
  closeDialog: EmptyFunctionType;
}

export type EmptyFunctionType = () => void;


type BaseDatagridStoreType = {
    endpoint: string,
    data: object[],
    columns: columnDatagridType[],
    subColumns?: columnDatagridType[],
    FetchData?: 
        (
            pageSize: number,
            pageNumber: number,
            search?: string,
            defaultFilters?: Array<FilterType>,
            customFilters?: Array<FilterType>
        ) => Promise<responseType | Error>
}

type actionType = {
    key: number,
    component: (row?:object) => JSX.Element
}

type columnDatagridType = {
    type?: 'number' | 'boolean' | 'string';
    header?: string,
    accessor: string,
    width?: number,
    alignment?: "right" | "center" | "left",
    filter?: 'Contains' | 'Equals' | 'LessThanOrEqual' | 'GreaterThanOrEqual',
    value?: (obj: object) => unknown,
}

interface userType {
    id: number;
    name: string;
}

type typeControl = {
    name?: string;
    value: unknown;
    alias: string;
    label: string;
    type?: string;
    required?: boolean
    readOnly?: boolean;
    operation?: 'Contains' | 'Equals' | 'LessThanOrEqual' | 'GreaterThanOrEqual'
    onChange?: (controlName: string, control: typeControl) => void;
}

type FilterType = {
    Field: string,
    Label?: string,
    Value: string,
    Operator?: 'OR' | 'AND' | 'ANY'
    Operation: 'Contains' | 'Equals' | 'LessThanOrEqual' | 'GreaterThanOrEqual'
}

type snackbarProps = {
    open: boolean,
    label?: string,
    type?: 'success' | 'error' | 'warning'
    duration?: number
}


export type {
    Controls,
    BaseDatagridStoreType,
    columnDatagridType,
    responseType,
    snackbarProps,
    actionType,
    typeControl,
    userType,
    FilterType
};
