import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import type{ FilterType } from "../../../../Commons/types";
import Datagrid from "../../../Datagrid";
import store from "../DatagridStore";

interface DatagridCategoryContainerProps {
    valueAcessor: string
    labelAcessor: string
    handleUpdate: (row: object) => void
    defaultFilters: Array<FilterType>
}

const DatagridCategoryContainer = observer((props: DatagridCategoryContainerProps) => {
    return (

        <Grid container maxWidth={800}>
            <Datagrid
                inputContent={true}
                store={store}
                toolbarActions={[]}
                onSelectItem={props.handleUpdate}
                defaultFilters={props.defaultFilters}
            />
        </Grid>

    );
});

export default DatagridCategoryContainer;