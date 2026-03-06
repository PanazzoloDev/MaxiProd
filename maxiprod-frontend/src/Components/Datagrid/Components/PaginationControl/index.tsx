
import type { ChangeEvent, KeyboardEvent } from "react"
import NumberInput from "../../../Inputs/NumberInput"
import { PaginationContainer } from "./style"
import { toNumber } from "lodash"

type paginationControlProps = {
    onSearch: () => void,
    pageSize: number,
    pageNumber: number,
    onChangePageSize: (newSize: number) => void
    onChangePageNumber: (page: number) => void
}

const PaginationControl = (props: paginationControlProps) => {

    const handleNumberFieldKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.onSearch()
        }
    };

    return(
        <PaginationContainer>
            <NumberInput 
                label="Página"
                value={props.pageNumber}
                size="small"
                onUpdate={(e: ChangeEvent<HTMLInputElement>) => props.onChangePageNumber(toNumber(e.target.value))}
                onKeyDown={handleNumberFieldKeyPress } 
                alias={""}   
                sx = {{margin: '10px 10px 0px 5px', width: '100px'}}          
            />
            <NumberInput 
                label="Registros"
                value= {props.pageSize} 
                size="small"
                onUpdate={(e: ChangeEvent<HTMLInputElement>) => props.onChangePageSize(toNumber(e.target.value))}
                onKeyDown={handleNumberFieldKeyPress} 
                alias={""} 
                sx = {{margin: '10px 0px 0px 5px', width: '100px'}} 
            />
        </PaginationContainer>
    )
}

export default PaginationControl