import { get, isEmpty, toNumber } from "lodash";
import { CurrencyConverter } from "../../../Commons/converters";
import type { FilterType, responseType } from "../../../Commons/types";
import BaseDatagridStore from "../../../Components/Stores/BaseDatagridStore";
import { Post } from "../../../Services/BaseAPI";

class DatagridFinancialSummaryStore extends BaseDatagridStore {

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
                this.data = get(response, "data.data", []) as object[]
            })

    }
    constructor() {
        super({
            data: [],
            endpoint: '/people/financial-summary',
            columns: [
                {
                    header: 'Idade',
                    accessor: 'person.age',
                    filter: 'Equals',
                    type: 'number',
                    alignment: 'center',
                    width: 20
                },
                {
                    header: 'Responsável',
                    accessor: 'person.name',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 100
                },
                {
                    header: 'Receitas',
                    accessor: 'totalRevenue',
                    alignment: 'left',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => CurrencyConverter({ value: toNumber(value) })
                },
                {
                    header: 'Despesas',
                    accessor: 'totalExpense',
                    alignment: 'left',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => CurrencyConverter({ value: toNumber(value) })
                },
                {
                    header: 'Saldo',
                    accessor: 'balance',
                    alignment: 'left',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => CurrencyConverter({ value: toNumber(value) })
                },
            ]
        });
    }
}

const store = new DatagridFinancialSummaryStore();
export default store;