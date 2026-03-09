import { observer } from "mobx-react"
import Datagrid, { type DatagridRef } from "../../../Components/Datagrid"

import ConfirmDeleteFormModal from "../../../Components/Page/ConfirmDeleteFormModal"
import FormPeopleModal from "../Modals/FormPeopleModal"
import datagridStore from "../Stores/DatagridPeopleStore"
import formStore from "../Stores/FormPeopleStore"

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
            component: () => <FormPeopleModal
                type="Create"
                onSuccess={onSuccess}
            />
        },
        {
            key: 2,
            component: () => <PDFReport
                orientation="portrait"
                reportTitle="Pessoas"
                store={datagridStore}
            />
        },
    ];

    const rowActions = [
        {
            key: 3,
            component: (obj?: object) =>
                <FormPeopleModal
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
                    objectType="pessoa"
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
