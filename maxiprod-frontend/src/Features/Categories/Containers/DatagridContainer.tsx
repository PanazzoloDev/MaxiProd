import { observer } from "mobx-react"
import Datagrid, { type DatagridRef } from "../../../Components/Datagrid"

import ConfirmDeleteFormModal from "../../../Components/Page/ConfirmDeleteFormModal"
import FormCategoriesModal from "../Modals/FormCategoriesModal"
import datagridStore from "../Stores/DatagridCategoriesStore"
import formStore from "../Stores/FormCategoriesStore"

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
            component: () => <FormCategoriesModal
                type="Create"
                onSuccess={onSuccess}
            />
        },
        {
            key: 2,
            component: () => <PDFReport
                orientation="portrait"
                reportTitle="Categorias"
                store={datagridStore}
            />
        },
    ];

    const rowActions = [
        {
            key: 4,
            component: (obj?: object) =>
                <ConfirmDeleteFormModal
                    store={formStore}
                    onSuccess={onSuccess}
                    objectType="categoria"
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
