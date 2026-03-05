import styled from "styled-components";
import { primary, secondary } from "../../../../Commons/colors";

const ActionButton = styled.button<{ children: React.ReactNode }>`
    border: none;
    padding: 5px;
    margin-right: 10px;
    background-color: ${secondary};
    transition: 0.5s;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
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
    ActionButton
};

