/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import type { typeControl } from "../../../Commons/types"
import TextInput from "../../../Components/Inputs/TextInput"
import store from "../Stores/FormTransactionStore"
import DatagridInput from "../../../Components/Inputs/PeopleInput"
import { transactionTypesToSelect } from "../../../Commons/selectOptions"
import SelectInput from "../../../Components/Inputs/SelectInput"

type FormModalContainer = {
    object?: object
}

const FormTransactionContainer = observer((props: FormModalContainer) => {
    const { changeFormControl } = store
    const [loading, setLoading] = useState<boolean>(true);

    const onChangeControl = async (name: string, control: typeControl) => {

        setLoading(true)
        changeFormControl(name, control)
            .then(() => { setLoading(false) });
    }

    const {
        description,
        amount,
        type,
        personId,
        //categoryId
    } = store.controls

    return (
        <Grid container maxWidth={600}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DatagridInput
                        labelAcessor="name"
                        valueAcessor="id"
                        onChange={onChangeControl}
                        name="personId"
                        label={personId.label}
                        value={personId.value}
                        alias={personId.alias}
                        required={personId.required}
                    />
                </Grid>
            
                <Grid item xs={4}>
                    <SelectInput
                        name="type"
                        label={type.label}
                        value={type.value}
                        alias={type.alias}
                        required
                        onChange={onChangeControl}
                        options={transactionTypesToSelect}
                    />
                </Grid>
                
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextInput
                        name="description"
                        label={description.label}
                        value={description.value}
                        alias={description.alias}
                        type="text"
                        required
                        readOnly={false}
                        onChange={onChangeControl}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput
                        name="amount"
                        label={amount.label}
                        value={amount.value}
                        alias={amount.alias}
                        type="number"
                        required
                        readOnly={false}
                        onChange={onChangeControl}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextInput
                        name="amount"
                        label={amount.label}
                        value={amount.value}
                        alias={amount.alias}
                        type="number"
                        required
                        readOnly={false}
                        onChange={onChangeControl}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
})

export default FormTransactionContainer
