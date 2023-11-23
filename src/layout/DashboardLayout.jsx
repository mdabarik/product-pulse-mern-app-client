// import { Outlet } from 'react-router-dom';

// const DashboardLayout = () => {
//     return (
//         <div>
//             <Outlet></Outlet>
//         </div>
//     );
// };

// export default DashboardLayout;


// const drawer = (
//     <div>
//         <Toolbar />
//         <Divider />
//         <List>
//             <ListItem disablePadding selected="true">
//                 <ListItemButton>
//                     <ListItemIcon>
//                         <MailIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Home" />
//                 </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//                 <ListItemButton>
//                     <ListItemIcon>
//                         <MailIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Booking" />
//                 </ListItemButton>
//             </ListItem>
//         </List>


//         <Divider />
//         <List>
//             <ListItem disablePadding>
//                 <ListItemButton>
//                     <ListItemIcon>
//                        <AccountBoxIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" />
//                 </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//                 <ListItemButton>
//                     <ListItemIcon>
//                         <ExitToAppIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Logout" />
//                 </ListItemButton>
//             </ListItem>
//         </List>

//     </div>
// );


import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuItems from '../components/Dashboard/MenuItems/MenuItems';
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader';


const drawerWidth = 240;
const DashboardLayout = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className='flex flex-col justify-between h-[100%]'>
            {/* <Toolbar /> */}
            <div>
                <div className='px-4 py-[10px] bg-blue-600 text-white'>
                    <DashboardIcon></DashboardIcon>
                    <Button sx={{ fontSize: '16px', color: 'white', fontWeight: 'bold', padding: '8px' }} size="large">Dashboard</Button>
                </div>
                {/* <Divider /> */}
                <List>
                    <MenuItems></MenuItems>
                </List>
            </div>

            
            <List>
                <Divider />
                <ListItem onClick={() => navigate('/dashboard/profile') } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <DashboardHeader handleDrawerToggle={handleDrawerToggle}></DashboardHeader>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {/* render your content here */}
                <Outlet></Outlet>

            </Box>
        </Box>
    );
}

export default DashboardLayout;