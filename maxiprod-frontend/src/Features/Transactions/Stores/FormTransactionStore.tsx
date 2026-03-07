import BaseStore from "../../../Components/Stores/BaseStore";
import { Create, Read, Remove, Update } from "../../../Services/TransactionsService";

class FormTransactionStore extends BaseStore {
    constructor() {
        super(
            {
                id: {
                    alias: 'Id',
                    label: 'Id',
                    value: '',
                },
                description: {
                    alias: 'Informe uma descrição',
                    label: 'Descrição',
                    value: '',
                },
                amount: {
                    alias: 'Insira o valor',
                    label: 'Valor',
                    value: '',
                },
                type: {
                    alias: 'Insira o tipo',
                    label: 'Tipo',
                    value: '',
                },
                personId: {
                    alias: 'Selecione o responsável',
                    label: 'Responsável',
                    value: '',
                },
                categoryId: {
                    alias: 'Selecione a categoria',
                    label: 'Categoria',
                    value: '',
                },
            },
            Update,
            Create,
            Read,
            Remove
        );
    }
}
const store = new FormTransactionStore();
export default store;