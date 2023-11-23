import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';


const MenuItems = () => {
    return (
        <>
            <ListItem disablePadding selected={true}>
                <ListItemButton>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Booking" />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default MenuItems;