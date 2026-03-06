import styled from "styled-components";
import { primary, secondary } from "../../Commons/colors";

const DatagridContainer = styled.div<{ inputContent?: boolean, children: React.ReactNode }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    padding: ${(props) => props.inputContent ? '0px' : '20px'};
    background-color: ${secondary};
    border-radius: 20px;
    ${(props) => props.inputContent ? '' : 'margin: 20px;'}
    ${(props) => props.inputContent ? '' : 'box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);'}
    height: ${(props) => props.inputContent ? '40vh' : '95%'};
`
const ToolbarContainer = styled.div<{ children?: React.ReactNode }>`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`
const FiltersBar = styled.div<{ children?: React.ReactNode }>`
    display:flex;
    flex-direction: row;
    height:50px;
    justify-content: space-between;
    margin: 0px 0px;
    border-bottom: 1px solid ${primary};
`
const TableWrap = styled.div`
    height: 100%;
    overflow: auto;
`

const Table = styled.table<{ children: React.ReactNode }>`
    width: 100%;
    //background-color: ${secondary + '1A'};
    font-size: 14px;
`
export {
    DatagridContainer, Table, ToolbarContainer,FiltersBar,TableWrap
};