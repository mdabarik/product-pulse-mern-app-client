import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FlagIcon from '@mui/icons-material/Flag';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DiscountIcon from '@mui/icons-material/Discount';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuItems = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    return (
        <>
            {/* normaluser routes */}
            <ListItem onClick={() => navigate('/dashboard/add-product')} disablePadding selected={location.pathname == '/dashboard/add-product'}>
                <ListItemButton>
                    <ListItemIcon>
                        <LibraryAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Poduct" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-products')} disablePadding selected={location.pathname == '/dashboard/manage-products'}>
                <ListItemButton>
                    <ListItemIcon>
                        <ManageHistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Products" />
                </ListItemButton>
            </ListItem>

            {/* moderator routes */}
            <ListItem onClick={() => navigate('/dashboard/review-products')} disablePadding selected={location.pathname == '/dashboard/review-products'}>
                <ListItemButton>
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review Products" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/reported-content')} disablePadding selected={location.pathname == '/dashboard/reported-content'}>
                <ListItemButton>
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reported Content" />
                </ListItemButton>
            </ListItem>

            {/* admin routes */}
            <ListItem onClick={() => navigate('/dashboard/statistics')} disablePadding selected={location.pathname == '/dashboard/statistics'}>
                <ListItemButton>
                    <ListItemIcon>
                        <AutoGraphIcon />
                    </ListItemIcon>
                    <ListItemText primary="Statistics" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-users')} disablePadding selected={location.pathname == '/dashboard/manage-users'}>
                <ListItemButton>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manager Users" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-coupons')} disablePadding selected={location.pathname == '/dashboard/manage-coupons'}>
                <ListItemButton>
                    <ListItemIcon>
                        <DiscountIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Coupons" />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default MenuItems;