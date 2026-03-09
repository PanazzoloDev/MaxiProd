/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import type { typeControl } from "../../../Commons/types"
import TextInput from "../../../Components/Inputs/TextInput"
import store from "../Stores/FormCategoriesStore"
import SelectInput from "../../../Components/Inputs/SelectInput"
import { categoryTypesToSelect } from "../../../Commons/selectOptions"

type FormModalContainer = {
    object?: object
}

const FormCategoriesContainer = observer((props: FormModalContainer) => {
    const { changeFormControl } = store
    const [loading, setLoading] = useState<boolean>(true);

    const onChangeControl = async (name: string, control: typeControl) => {

        setLoading(true)
        changeFormControl(name, control)
            .then(() => { setLoading(false) });
    }

    const {
        purpose,
        description,
    } = store.controls

    return (
        <Grid container maxWidth={600}>
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
                <Grid item xs={12}>
                    <SelectInput
                        name="purpose"
                        label={purpose.label}
                        value={purpose.value}
                        alias={purpose.alias}
                        required
                        onChange={onChangeControl}
                        options={categoryTypesToSelect}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
})

export default FormCategoriesContainer
