import styled from "styled-components";
import { primary, secondary } from "../../../../Commons/colors";

const TableHeader = styled.tr<{ children: React.ReactNode }>`
    background-color: ${primary};
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    color: ${secondary};
    height: 2em;
`
type headerCellProps = {
    children: React.ReactNode,
    width?: number,
    maxWidth?: number
}

const HeaderCell = styled.td<headerCellProps>`
    vertical-align: middle;
    width: ${(props) => props.width ? `${props.width}px` : 'fit-content'};
    max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : 'auto'};
    &:hover{
        background: linear-gradient(${primary} 85%, ${secondary} 90%, ${primary});
        background-color: ${primary};
        color: ${secondary};
        cursor: pointer;
    }
    &:active{
        background-color: ${secondary};
    }
`
export {
    HeaderCell, TableHeader
};

