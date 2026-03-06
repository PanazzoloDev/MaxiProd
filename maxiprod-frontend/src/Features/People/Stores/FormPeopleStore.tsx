import BaseStore from "../../../Components/Stores/BaseStore";
import { Create, Read, Remove, Update } from "../../../Services/PeopleService";

class FormPeopleStore extends BaseStore {
    constructor() {
        super(
            {
                id: {
                    alias: 'Id',
                    label: 'Id',
                    value: '',
                },
                age: {
                    alias: 'Informe a idade',
                    label: 'Idade',
                    value: '',
                },
                name: {
                    alias: 'Insira o seu nome',
                    label: 'Nome',
                    value: '',
                }
            },
            Update,
            Create,
            Read,
            Remove
        );
    }
}
const store = new FormPeopleStore();
export default store;