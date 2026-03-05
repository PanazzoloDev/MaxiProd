import { actionType } from "../../../../Commons/types";
import { ActionButton } from "./style";


const ToolbarAction = (props: actionType) => {
    const { component } = props
    return (
        <ActionButton type="button">
            {component()}
        </ActionButton>
    )
}

export default ToolbarAction;