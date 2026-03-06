/* eslint-disable react-hooks/immutability */
import { get, isEmpty, toString } from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useState, type JSX } from 'react';
import type { FilterType, actionType } from "../../Commons/types";
import { useDialogContext } from "../../Contexts/DialogContext";
import { Filter } from "../Icons";
import BaseDatagridStore from "../Stores/BaseDatagridStore";
import BaseStore from "../Stores/BaseStore";
import Chip from "./Components/Chip";
import Header from "./Components/Header";
import PaginationControl from "./Components/PaginationControl";
import Row from "./Components/Row";
import SearchInput from "./Components/SearchInput";
import ToolbarAction from "./Components/ToolbarAction";
import {
    DatagridContainer,
    Table,
    TableWrap,
    ToolbarContainer
} from "./style";

type datagridContainerProps = {
    store: BaseDatagridStore,
    formFilterStore?: BaseStore,
    formFilterContainer?: JSX.Element,
    rowActions?: actionType[],
    toolbarActions: actionType[]
    inputContent?: boolean,
    onSelectItem?: (row: object) => void
    defaultFilters?: Array<FilterType>
    noInitalFetch?: boolean
}

const Datagrid = forwardRef((props: datagridContainerProps, ref) => {
    const [pageSize, setPageSize] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [loaded, setLoaded] = useState(true);
    const [customFilters, setCustomFilters] = useState<Array<FilterType>>([]);
    const [fetchInicial, setFetchInicial] = useState<boolean>(false);

    const { openDialog, closeDialog } = useDialogContext();
    const fetchData = () => {

        if (pageSize < 1) { setPageSize(1) }
        if (pageNumber < 1) { setPageNumber(1) }

        setLoaded(false);

        store.FetchData(pageSize, pageNumber, searchText, defaultFilters, customFilters)
            .then(() => {
                setLoaded(true);
            })
    }

    const getFilters = (): string => {
        return customFilters.map(x => x.Label).join(', ')
    }

    useImperativeHandle(ref, () => ({
        fetchData,
        getFilters
    }));

    useEffect(() => {
        if (!props.noInitalFetch || fetchInicial) {
            fetchData();
            setFetchInicial(true)
        }
        return () => {
            if (formFilterStore) {
                formFilterStore.resetStore()
                setFetchInicial(false)
            }
        };
    }, [customFilters]);

    const handleOpenFilterModal = async () => {
        openDialog({
            component: formFilterContainer,
            title: 'Filtro avançado',
            okCallback: updateCustomFilters,
            width: "xl",
            okText: "Pesquisar",
            cancelText: "Cancelar",
            isOpen: true,
        });
    };

    const updateCustomFilters = () => {

        if (formFilterStore === undefined)
            return;

        const { controls } = formFilterStore
        const keys = Object.keys(controls)

        const newFilters = new Array<FilterType>();
        keys.forEach(controlKey => {
            if (!isEmpty(controls[controlKey].value)) {
                newFilters.push({
                    Label: `${controls[controlKey].label}: ${toString(controls[controlKey].value)}`,
                    Field: controlKey,
                    Operation: controls[controlKey].operation ?? "Contains",
                    Operator: 'AND',
                    Value: toString(controls[controlKey].value)
                })
            }
        })
        setCustomFilters(newFilters);
        closeDialog();
    }

    const {
        store,
        toolbarActions,
        rowActions,
        inputContent,
        defaultFilters,
        formFilterContainer,
        formFilterStore
    } = props;

    return (
        <DatagridContainer inputContent={inputContent}>
            <ToolbarContainer>
                <div style={{ display: 'flex', flexDirection: 'row', height: '40px', verticalAlign :'center' }}>
                    {toolbarActions.map(act =>
                        <ToolbarAction
                            key={act.key}
                            component={() => act.component()}
                        />
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row',  height: '40px', verticalAlign :'center'  }}>
                    {
                        customFilters.map(filter =>
                            <Chip
                                key={filter.Label}
                                label={filter.Label}
                                object={filter.Field}
                                color="success"
                                variant="outlined"
                                onDelete={(obj) => {
                                    if (!formFilterStore) return;

                                    const result = customFilters.filter(x => x.Field !== filter.Field);
                                    formFilterStore.changeFormControl(filter.Field, { ...obj, value: '' })
                                    setCustomFilters(result);
                                }}
                            />
                        )
                    }
                    {formFilterContainer ?
                        <ToolbarAction
                            key={1}
                            component={() => <Filter onClick={handleOpenFilterModal} />}
                        /> : <div />
                    }
                    <SearchInput
                        inputContent={inputContent}
                        onSearch={fetchData}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </ToolbarContainer>
            <TableWrap>
                <Table style={{tableLayout: 'fixed'}}>
                    <thead>
                        <Header
                            columns={store.columns}
                            actionColumnCount={props.rowActions?.length}
                        />
                    </thead>
                    {loaded && (
                        <tbody>
                            {store.data.map(object =>
                                <Row
                                    key={get(object, 'id')}
                                    object={object}
                                    columns={store.columns}
                                    rowActions={rowActions}
                                    onSelectRow={props.onSelectItem}
                                />
                            )}
                        </tbody>
                    )}
                </Table>
            </TableWrap>
            <PaginationControl
                onSearch={fetchData}
                pageSize={pageSize}
                pageNumber={pageNumber}
                onChangePageNumber={(e) => setPageNumber(e)}
                onChangePageSize={(e) => setPageSize(e)}
            />
        </DatagridContainer>
    );
})

export default Datagrid;
