import {
    Settings as Configuracoes,
    Edit as Editar,
    KeyboardArrowDown as Expandir,
    Cancel as Falso,
    FilterAlt as Filtro,
    Print as Impressora,
    Home as Inicio,
    DeleteSweep as Lixeira,
    Add as Novo,
    People as Pessoas,
    KeyboardArrowUp as Retrair,
    CheckCircle as Verdadeiro
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { IconBaseStyle } from './style';

/// Icones de rota
const Settings = () => <Configuracoes fontSize="large" sx={IconBaseStyle} />
const People = () => <Pessoas fontSize="large" sx={IconBaseStyle} />
const Home = () => <Inicio fontSize="large" sx={IconBaseStyle} />

/// Icones comuns
const Create = ({ ...props }) => <Tooltip title="Novo"><Novo fontSize="medium" {...props} /></Tooltip>
const Filter = ({ ...props }) => <Tooltip title="Filtro"><Filtro fontSize="medium" {...props} /></Tooltip>
const Update = ({ ...props }) => <Tooltip title="Editar"><Editar fontSize="medium" {...props} /></Tooltip>
const Expand = ({ ...props }) => <Tooltip title="Exibir"><Expandir fontSize="medium" {...props} /></Tooltip>
const Retract = ({ ...props }) => <Tooltip title="Ocultar"><Retrair fontSize="medium" {...props} /></Tooltip>
const Delete = ({ ...props }) => <Tooltip title="Exluir"><Lixeira fontSize="medium" {...props} /></Tooltip>

const True = () => <Verdadeiro fontSize="medium" color='success' />
const False = () => <Falso fontSize="medium" color='error' />
const Printer = ({ ...props }) => <Tooltip title="Imprimir"><Impressora fontSize="medium" {...props} /></Tooltip>

export {
    Create,
    Delete, Expand, False,
    Filter, Home, People, Printer, Retract,
    Settings, True, Update
};

