import BaseDatagridStore from "../../../Components/Stores/BaseDatagridStore";

class DatagridPeopleStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/people/query',
            columns: [
                {
                    header: 'Código',
                    accessor: 'id',
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
                    width: 140
                },
                {
                    header: 'Idade',
                    accessor: 'age',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 20
                },
            ]
        });
    }
}

const store = new DatagridPeopleStore();
export default store;