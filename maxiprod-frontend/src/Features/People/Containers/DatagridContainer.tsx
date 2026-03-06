import { observer } from "mobx-react"
import Datagrid from "../../../Components/Datagrid"

import ConfirmDeleteFormModal from "../../../Components/Page/ConfirmDeleteFormModal"
import FormPeopleModal from "../Modals/FormPeopleModal"
import datagridStore from "../Stores/DatagridPeopleStore"
import formStore from "../Stores/FormPeopleStore"

//import PDFReport from "../../../Components/Reports"
import type { actionType } from "../../../Commons/types"

const DatagridContainer = observer(() => {

    const toolbarActions:actionType[] = [];

    const rowActions = [
        {
            key: 3,
            component: (obj?: object) =>
                <FormPeopleModal
                    object={obj}
                    type="Update"
                />
        },
        {
            key: 4,
            component: (obj?: object) =>
                <ConfirmDeleteFormModal
                    store={formStore}
                    objectType="pessoa"
                    object={obj}
                />
        },

    ];

    return (
        <Datagrid
            store={datagridStore}
            toolbarActions={toolbarActions.filter(x => x)}
            rowActions={rowActions.filter(x => x)}
        />
    );
});

export default DatagridContainer;
