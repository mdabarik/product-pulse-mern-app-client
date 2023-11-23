import { NavLink, useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Menus = () => {
    const navigate = useNavigate();
    const user = true;
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        console.log('logout clicked');
    }

    return (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/all-products">Products</NavLink>
            </li>
            {
                !user ? <div>
                    <button className="btn btn-secondary">Login</button>
                </div> :
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile" src="https://images.unsplash.com/photo-1682687220161-e3e7388e4fad?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8" />
                            </IconButton>
                        </Tooltip>
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
                            {/* <MenuItem onClick={handleCloseUserMenu}> */}
                            <Typography textAlign="center">User Name</Typography>
                            {/* </MenuItem> */}
                            <MenuItem onClick={() => {
                                handleCloseUserMenu()
                                navigate('/dashboard')
                            }}>
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu()
                                handleLogout()
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
            }
        </>
    );
};

export default Menus;