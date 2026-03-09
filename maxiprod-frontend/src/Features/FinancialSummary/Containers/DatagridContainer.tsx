import { observer } from "mobx-react";
import Datagrid from "../../../Components/Datagrid";

import datagridStore from "../Stores/DatagridFinancialSummaryStore";

import PDFReport from "../../../Components/Reports";

const DatagridContainer = observer(() => {

    const toolbarActions = [
        {
            key: 2,
            component: () => <PDFReport
                orientation="landscape"
                reportTitle="Resumo Financeiro"
                store={datagridStore}
            />
        },
    ];


    return (
        <Datagrid
            store={datagridStore}
            toolbarActions={toolbarActions.filter(x => x)}
        />
    );
});

export default DatagridContainer;
