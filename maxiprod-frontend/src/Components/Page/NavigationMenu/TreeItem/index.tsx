import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { type JSX } from "react";
import { secondary } from "../../../../Commons/colors";

type menuItemProps = {
    children?: React.ReactNode
    label: string,
    icon: JSX.Element
}

const MenuItem = (props: menuItemProps) => {
    return (
        <ListItemButton sx={{ height: '30px', color: secondary}}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.label} sx={{fontWeight: 'Bold' }}/>
        </ListItemButton>
    );
}

export default MenuItem