import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const NavDrawerMenuItems = () => {
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Products"} />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default NavDrawerMenuItems;