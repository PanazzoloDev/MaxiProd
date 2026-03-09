import MUIChip , { type ChipProps } from '@mui/material/Chip';

interface MeuChipProps extends ChipProps {
  object?: string;
}

const Chip = ({ object, ...props } : MeuChipProps) => {
  return (
    <MUIChip 
      sx={{marginRight: '10px'}}
      {...props}
      onDelete={() => props.onDelete ? props.onDelete(object) : () => {}}
    />
  );
};

export default Chip;
