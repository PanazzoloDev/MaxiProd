import BaseDatagridStore from "../../../Stores/BaseDatagridStore";

class DatagridPeopleStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/people/query',
            columns: [
                {
                    header: 'Idade',
                    accessor: 'age',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 20
                },
                {
                    header: 'Nome',
                    accessor: 'name',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 120
                }
            ]
        }
        );
    }
}

const store = new DatagridPeopleStore();
export default store;