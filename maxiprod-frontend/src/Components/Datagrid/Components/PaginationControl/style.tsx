import styled from "styled-components";
import { primary } from "../../../../Commons/colors";

const PaginationContainer = styled.div`
    display: flex;
    border-top: 5px solid ${primary};
    flex-direction: row;
    align-items:center;
    justify-content: end;
    height: auto;
    box-sizing:border-box;
`

export {
    PaginationContainer
} 