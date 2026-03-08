import { toString } from "lodash";
import { categoryTypeDictionary } from "../../../../Commons/selectOptions";
import BaseDatagridStore from "../../../Stores/BaseDatagridStore";

class DatagridCategoryStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/category/query',
            columns: [
                {
                    header: 'Codigo',
                    accessor: 'id',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 20
                },
                {
                    header: 'Descrição',
                    accessor: 'description',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 120
                },
                {
                    header: 'Tipo',
                    accessor: 'type',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 30,
                    value: (value) => categoryTypeDictionary[toString(value)]
                },
            ]
        }
        );
    }
}

const store = new DatagridCategoryStore();
export default store;