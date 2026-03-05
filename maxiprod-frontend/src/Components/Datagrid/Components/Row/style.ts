import styled from "styled-components";
import { primary, secondary } from "../../../../Commons/colors";

const RowContainer = styled.tr<{ children: React.ReactNode }>`
    display: table;
    width: 100%;
    table-layout: fixed;
    color: ${primary};
    height: 2em;
    &:hover{
        background-color: ${primary}80;
        color: ${secondary};
        //cursor: pointer;
    }
    &:active{
        background-color: ${primary};
    }
`
type cellProps = {
    children: React.ReactNode,
    alignment?: 'left' | 'center' | 'right',
    width?: number
}
const CellContainer = styled.td<cellProps>`
    padding: 2px;
    text-align: ${($props) => $props.alignment ?? 'left'};
    width: ${($props) => $props.width ? `${$props.width}px`:'auto'};
    vertical-align: middle;
`

export {
    CellContainer, RowContainer
};

