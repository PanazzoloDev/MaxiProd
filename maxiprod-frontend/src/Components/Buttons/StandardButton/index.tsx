import { isFunction } from "lodash"
import { primary, secondary } from "../../../Commons/colors"
import { Button } from "./style"

type StandardButtonProps =
    {
        text: string,
        type: 'reset' | 'submit',
        onClick?: () => void
    }

const StandardButton = (props: StandardButtonProps) => {
    return (
        <Button
            type={props.type}
            color={primary}
            textcolor={secondary}
            onClick={isFunction(props.onClick) ? props.onClick : () => { }}
        >
            {props.text}
        </Button>
    )
}
export default StandardButton