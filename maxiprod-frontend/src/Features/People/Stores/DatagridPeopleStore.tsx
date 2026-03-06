import BaseDatagridStore from "../../../Components/Stores/BaseDatagridStore";

class DatagridUsersStore extends BaseDatagridStore {
    constructor() {
        super({
            data: [],
            endpoint: '/people',
            columns: [
                {
                    header: 'Idade',
                    accessor: 'age',
                    alignment: 'center',
                    filter: 'Equals',
                    type: 'number',
                    width: 10
                },
                {
                    header: 'Nome',
                    accessor: 'name',
                    filter: 'Contains',
                    type: 'string',
                    alignment: 'left',
                    width: 60
                }
            ]
        });
    }
}

const store = new DatagridUsersStore();
export default store;