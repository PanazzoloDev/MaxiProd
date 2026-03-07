import { observer } from "mobx-react"
import Datagrid, { type DatagridRef } from "../../../Components/Datagrid"

import ConfirmDeleteFormModal from "../../../Components/Page/ConfirmDeleteFormModal"
import FormTransactionModal from "../Modals/FormTransactionModal"
import datagridStore from "../Stores/DatagridTransactionStore"
import formStore from "../Stores/FormTransactionStore"

import { useRef } from "react"
import PDFReport from "../../../Components/Reports"

const DatagridContainer = observer(() => {

    const datagridRef = useRef<DatagridRef>(null);

    const onSuccess = () => {
        if (datagridRef.current) {
            datagridRef.current.fetchData();
        }
    }

    const toolbarActions = [
        {
            key: 1,
            component: () => <FormTransactionModal
                type="Create"
                onSuccess={onSuccess}
            />
        },
        {
            key: 2,
            component: () => <PDFReport
                orientation="landscape"
                reportTitle="Transações"
                store={datagridStore}
            />
        },
    ];

    const rowActions = [
        {
            key: 3,
            component: (obj?: object) =>
                <FormTransactionModal
                    onSuccess={onSuccess}
                    object={obj}
                    type="Update"
                />
        },
        {
            key: 4,
            component: (obj?: object) =>
                <ConfirmDeleteFormModal
                    store={formStore}
                    onSuccess={onSuccess}
                    objectType="transação"
                    object={obj}
                />
        },

    ];

    return (
        <Datagrid
            ref={datagridRef}
            store={datagridStore}
            toolbarActions={toolbarActions.filter(x => x)}
            rowActions={rowActions.filter(x => x)}
        />
    );
});

export default DatagridContainer;
