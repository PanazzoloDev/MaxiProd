/* eslint-disable @typescript-eslint/no-unused-expressions */
import { get, isFunction } from "lodash"
import type { actionType, columnDatagridType } from "../../../../Commons/types"
import RowAction from "../RowAction"
import { CellContainer, RowContainer } from "./style"

type rowProps = {
    columns: columnDatagridType[]
    rowActions?: actionType[]
    object: object
    onSelectRow?: (row: object) => void
}

const Row = (props: rowProps) => {
    const { columns, object, rowActions } = props

    const handleRowClick = () => {
        isFunction(props.onSelectRow) ? props.onSelectRow(object) : () => { }
    };

    return (
        <RowContainer
            onClick={handleRowClick}
        >
            {columns.map((column, index) =>
                <CellContainer
                    key={index}
                    alignment={column.alignment}
                    width={column.width}
                >
                    {isFunction(column.value) ? column.value(get(object, column.accessor)) : get(object, column.accessor)}
                </CellContainer>
            )}
            {rowActions && rowActions.length > 0 ?
                <CellContainer
                    key={999}
                    alignment={'right'}
                    width={rowActions.length * 11}
                >
                    {rowActions.map(action =>
                        <RowAction
                            key={action.key}
                        >
                            {action.component(object)}
                        </RowAction>
                    )}
                </CellContainer>
                : null
            }
        </RowContainer>
    )
}

export default Row