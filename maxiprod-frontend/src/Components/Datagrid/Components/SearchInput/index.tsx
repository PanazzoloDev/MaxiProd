import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { isFunction } from 'lodash';
import type{ ChangeEvent, KeyboardEvent } from 'react';
import { SearchInputContainer } from './styled';

type searchInputProps = {
    onSearch: () => void,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    inputContent?: boolean
}

const SearchInput = (props: searchInputProps) => {
    const { onSearch, onChange } = props;

    const handleTextFieldKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.onSearch()
        }
    };

    return (
        <SearchInputContainer>
            <TextField
                label="Pesquisar"
                variant="outlined"
                size="small"
                color='success'
                onChange={isFunction(props.onChange) ? (e) => onChange(e) : () => { }}
                onKeyDown={handleTextFieldKeyPress}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={isFunction(onSearch) ? onSearch : () => { }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </SearchInputContainer>
    );
}

export default SearchInput;