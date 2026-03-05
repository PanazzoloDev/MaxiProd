import { columnDatagridType } from "../../../../Commons/types"
import { HeaderCell, TableHeader } from "./style"

type headerProps = {
    columns: columnDatagridType[]
    actionColumnCount?: number
    style?: object
}

const Header = (props: headerProps) => {
    const { actionColumnCount, columns } = props

    return (
        <TableHeader style={props.style}>
            {columns.map(column =>
                <HeaderCell
                    key={column.accessor}
                    width={column.width}
                >
                    {column.header}
                </HeaderCell>
            )}
            {actionColumnCount && actionColumnCount > 0 ?
                <HeaderCell
                    key={999}
                    width={actionColumnCount * 11}
                >
                    {actionColumnCount > 1 ? 'Ações': ''}
                </HeaderCell>
                : null
            }
        </TableHeader>
    )
}

export default Header