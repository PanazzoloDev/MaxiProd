import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import type { typeControl } from "../../../Commons/types"
import TextInput from "../../../Components/Inputs/TextInput"
import store from "../Stores/FormPeopleStore"

const FormUsersContainer = observer(() => {

    const { changeFormControl } = store
    const [loading, setLoading] = useState(true);

    const onChangeControl = async (name: string, control: typeControl) => {

        setLoading(true)
        changeFormControl(name, control)
            .then(() => { setLoading(false) });
    }

    const {
        code,
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
                        readOnly={loading}
                        onChange={onChangeControl}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput
                        name="code"
                        label={code.label}
                        value={code.value}
                        alias={code.alias}
                        type="number"
                        required
                        readOnly={loading}
                        onChange={onChangeControl}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
})

export default FormUsersContainer
