import { CssBaseline, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view/';
import { useNavigate } from 'react-router-dom';
import { primary } from '../../../Commons/colors';
import { Home, People, Settings } from '../../Icons';

import type { JSX } from 'react';
import TopBar from '../TopBar';
import MenuItem from './TreeItem';

const drawerWidth = 240;

type navItemType = {
    id: string,
    route: string,
    text: string,
    icon: JSX.Element,
    children: navItemType[]
    roles: string[] // vazio é All 
}

const navItems: navItemType[] = [
    {
        id: '0',
        text: 'Home',
        icon: <Home />,
        route: '/home',
        children: [],
        roles: []
    },
    {
        id: '1',
        text: 'Pessoas',
        icon: <People />,
        route: '/people',
        children: [
            { id: '2', route: '/financial-summary', text: 'Resumo Financeiro', icon: <People />, roles: [], children: [] },
        ],
        roles: []
    }
];

const specialNavItems: navItemType[] = [
    {
        id: '13',
        text: 'Pessoas',
        route: '/users',
        icon: <People />,
        children: [],
        roles: []
    },
    {
        id: '14',
        text: 'Parâmetros',
        route: '/settings',
        icon: <Settings />,
        children: [],
        roles: ['ADM']
    },
]


const NavigationMenu = () => {

    const OnClickItem = (route: string) => {
        const navigate = useNavigate();
        return () => navigate(route);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: `${primary}EC`,
                        boxShadow: '5px 5px 5px 5px rgba(0, 0, 0,0.2)'
                    },
                }}
            >
                <Toolbar style={{ height: '100px' }} />
                <SimpleTreeView>
                    <List>
                        {navItems.map(item =>
                            <TreeItem
                                key={item.id}
                                itemId={item.id}
                                onClick={OnClickItem(item.route)}
                                label={
                                    <MenuItem
                                        icon={item.icon}
                                        label={item.text}
                                    />
                                }>
                                {item.children.map(child =>
                                    <TreeItem
                                        key={child.id}
                                        itemId={child.id}
                                        label={<MenuItem icon={child.icon} label={child.text} />}
                                        onClick={OnClickItem(child.route)}
                                    />
                                )}
                            </TreeItem>
                        )}
                    </List>
                    <Divider />
                    <List>
                        {specialNavItems.map(item =>
                            <TreeItem
                                key={item.id}
                                itemId={item.id}
                                onClick={OnClickItem(item.route)}
                                label={
                                    <MenuItem
                                        icon={item.icon}
                                        label={item.text}
                                    />
                                }>
                                {item.children.map(child =>
                                    <TreeItem
                                        key={child.id}
                                        itemId={child.id}
                                        label={<MenuItem icon={child.icon} label={child.text} />}
                                        onClick={OnClickItem(child.route)}
                                    />
                                )}
                            </TreeItem>
                        )}
                    </List>
                </SimpleTreeView>
            </Drawer>
        </Box>
    );
}

export default NavigationMenu