import { RowActionContainer } from "./style"
type RowActionProps = {
    children: React.ReactNode
}
const RowAction = (props: RowActionProps) => {

    return (
        <RowActionContainer
            type="button"
        >
            {props.children}
        </RowActionContainer>
    )
}

export default RowAction