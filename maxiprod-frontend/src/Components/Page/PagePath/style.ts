import styled from "styled-components";
import { primary, secondary } from "../../../Commons/colors";

const PagePathStyled = styled.div`
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    box-sizing: 'border-box';
    background-color: ${primary};
    color: ${secondary};
    width: 100%;
    font-size: 20px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`

export default PagePathStyled