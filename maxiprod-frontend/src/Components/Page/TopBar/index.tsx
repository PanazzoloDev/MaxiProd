import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { primary, secondary } from '../../../Commons/colors';
import { MaxiProd } from './style';

const pages = new Array<string>()

const TopBar = () => {
    const navigate = useNavigate();

    const settings = [
        {
            label: 'Perfil', onClick: () => {
                handleCloseUserMenu()
                navigate('/profile')
            }
        },
        {
            label: 'Configurações', onClick: () => {
                handleCloseUserMenu()
                navigate('/settings')
            }
        },
    ];

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleCloseUserMenu = () => { setAnchorElUser(null); };

    return (
        <AppBar
            position="fixed"
            variant='elevation'
            sx={{
                zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1,
                backgroundColor: primary
            }}
        >
            <Toolbar>
                <MaxiProd />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            sx={{
                                my: 2,
                                color: secondary,
                                display: 'block',
                                margin: '0px 55px',
                                fontSize: '20px',
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0, display: 'flex' }}>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting.label}
                                onClick={setting.onClick}
                            >
                                <Typography textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default TopBar
