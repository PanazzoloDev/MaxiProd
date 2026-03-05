import styled from "styled-components";
import { primary, secondary } from "../../../../Commons/colors";

const RowActionContainer = styled.button<{ children: React.ReactNode }>`
    border: none;
    padding: 1px;
    vertical-align: middle;
    text-align: center;
    margin-right: 10px;
    background-color: ${secondary};
    transition: 0.5s;
    border-radius: 2px;
    &:hover{
        background-color: ${primary};
        color: ${secondary};
        cursor: pointer;
    }
    &:active{
        background-color: ${secondary};
    }
`

export {
    RowActionContainer
};
