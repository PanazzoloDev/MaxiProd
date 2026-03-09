import BaseStore from "../../../Components/Stores/BaseStore";
import { Create, Read, Remove, Update } from "../../../Services/CategoriesService";

class FormCategoriesStore extends BaseStore {
    constructor() {
        super(
            {
                id: {
                    alias: 'Id',
                    label: 'Id',
                    value: '',
                },
                purpose: {
                    alias: 'Informe a finalidade',
                    label: 'Finalidade',
                    value: '',
                },
                description: {
                    alias: 'Insira a descrição',
                    label: 'Descrição',
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
const store = new FormCategoriesStore();
export default store;