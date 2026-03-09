/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import { transactionTypesToSelect } from "../../../Commons/selectOptions"
import type { typeControl } from "../../../Commons/types"
import PeopleInput from "../../../Components/Inputs/PeopleInput"
import CategoryInput from "../../../Components/Inputs/CategoryInput"
import SelectInput from "../../../Components/Inputs/SelectInput"
import TextInput from "../../../Components/Inputs/TextInput"
import store from "../Stores/FormTransactionStore"

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
        categoryId
    } = store.controls

    return (
        <Grid container maxWidth={600}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
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
                <Grid item xs={5}>
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
                <Grid item xs={12}>
                    <PeopleInput
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
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <CategoryInput
                            labelAcessor="description"
                            valueAcessor="id"
                            onChange={onChangeControl}
                            name="categoryId"
                            label={categoryId.label}
                            value={categoryId.value}
                            alias={categoryId.alias}
                            required={categoryId.required}
                        />
                    </Grid>
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
            </Grid>
        </Grid>
    )
})

export default FormTransactionContainer
