/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import type { typeControl } from "../../../Commons/types"
import TextInput from "../../../Components/Inputs/TextInput"
import store from "../Stores/FormPeopleStore"

type FormModalContainer = {
    object?: object
}

const FormPeopleContainer = observer((props: FormModalContainer) => {
    const { changeFormControl } = store
    const [loading, setLoading] = useState<boolean>(true);

    const onChangeControl = async (name: string, control: typeControl) => {

        setLoading(true)
        changeFormControl(name, control)
            .then(() => { setLoading(false) });
    }

    const {
        age,
        name,
    } = store.controls

    return (
        <Grid container maxWidth={600}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextInput
                        name="name"
                        label={name.label}
                        value={name.value}
                        alias={name.alias}
                        type="text"
                        required
                        readOnly={false}
                        onChange={onChangeControl}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput
                        name="age"
                        label={age.label}
                        value={age.value}
                        alias={age.alias}
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

export default FormPeopleContainer
