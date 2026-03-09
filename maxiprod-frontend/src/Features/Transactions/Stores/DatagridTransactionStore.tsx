import { toNumber, toString } from "lodash";
import { CurrencyConverter } from "../../../Commons/converters";
import { transactionTypeDictionary } from "../../../Commons/selectOptions";
import BaseDatagridStore from "../../../Components/Stores/BaseDatagridStore";

class DatagridTransactionStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/transaction/query',
            columns: [
                {
                    header: 'Código',
                    accessor: 'id',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 10
                },
                {
                    header: 'Tipo',
                    accessor: 'type',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => transactionTypeDictionary[toString(value)]
                },
                {
                    header: 'Responsável',
                    accessor: 'person.name',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 40,
                },
                {
                    header: 'Categoria',
                    accessor: 'category.description',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 25,
                },
                {
                    header: 'Valor',
                    accessor: 'amount',
                    alignment: 'left',
                    filter: 'Equals',
                    type: 'number',
                    width: 25,
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