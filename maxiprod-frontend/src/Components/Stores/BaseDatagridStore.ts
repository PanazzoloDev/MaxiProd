import { get, isEmpty } from "lodash";
import { action, observable } from "mobx";
import type { BaseDatagridStoreType, FilterType, columnDatagridType, responseType } from "../../Commons/types";
import { Post } from "../../Services/BaseAPI";

class BaseDatagridStore {
    @observable columns: columnDatagridType[];
    @observable subColumns?: columnDatagridType[];
    @observable endpoint: string;
    @observable data: object[];

    constructor(props: BaseDatagridStoreType) {
        this.columns = props.columns;
        this.endpoint = props.endpoint;
        this.data = props.data;
        this.subColumns = props.subColumns;
    }

    @action
    FetchData = async (
        pageSize: number,
        pageNumber: number,
        search: string = '',
        defaultFilters: Array<FilterType> = [],
        customFilters: Array<FilterType> = []
    ): Promise<void | responseType | Error> => {
        const filters = !isEmpty(customFilters) ? customFilters : new Array<FilterType>()

        if (!isEmpty(defaultFilters)) {
            defaultFilters.map(defaultFilter => {
                filters.push(defaultFilter)
            })
        }

        if (!isEmpty(search)) {
            this.columns.forEach(column => {
                if (column.filter && this.verifySearch(search, column.type)) {
                    filters.push({
                        Field: column.accessor,
                        Operation: column.filter,
                        Value: search,
                    })
                }
            });
        }

        return await Post(`${this.endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`, filters)
            .then((response) => {
                this.data = get(response, 'data.data.data', [])
            })

    }

    verifySearch = (
        valor: string,
        tipo: 'number' | 'boolean' | 'string' = 'string'
    ): boolean => {
        try {
            switch (tipo) {
                case 'number': return !isNaN(Number(valor));
                case 'boolean': return ['true', 'false'].includes(valor.toLowerCase());
                case 'string': return typeof valor === 'string';
                default: return false;
            }
        } catch {
            return false;
        }
    }
}

export default BaseDatagridStore;