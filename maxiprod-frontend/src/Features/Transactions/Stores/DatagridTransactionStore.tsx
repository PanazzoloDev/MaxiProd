import { toNumber, toString } from "lodash";
import { categoryTypeSelectOptions } from "../../../Commons/selectOptions";
import BaseDatagridStore from "../../../Components/Stores/BaseDatagridStore";
import { CurrencyConverter } from "../../../Commons/converters";

class DatagridTransactionStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/transaction/query',
            columns: [
                {
                    header: 'Tipo',
                    accessor: 'type',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => categoryTypeSelectOptions[toString(value)]
                },
                {
                    header: 'Responsável',
                    accessor: 'person.name',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 60,
                    value: (value) =>
                        toString(value)
                            .substring(0, 80)
                },
                {
                    header: 'Categoria',
                    accessor: 'category.description',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'center',
                    width: 30,
                    value: (value) =>
                        toString(value)
                            .substring(0, 50)
                },
                {
                    header: 'Valor',
                    accessor: 'amount',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => CurrencyConverter({
                        value: toNumber(value),
                    }) 
                },
                {
                    header: 'Descrição',
                    accessor: 'description',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 60
                },
            ]
        });
    }
}

const store = new DatagridTransactionStore();
export default store;