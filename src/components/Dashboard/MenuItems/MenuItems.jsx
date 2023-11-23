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
import { useNavigate } from 'react-router-dom';

const MenuItems = () => {

    const navigate = useNavigate();

    return (
        <>
            {/* normaluser routes */}
            <ListItem onClick={() => navigate('/dashboard/add-product')} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LibraryAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Poduct" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-products')} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ManageHistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Products" />
                </ListItemButton>
            </ListItem>

            {/* moderator routes */}
            <ListItem onClick={() => navigate('/dashboard/review-products')} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review Products" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/reported-content')} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reported Content" />
                </ListItemButton>
            </ListItem>

            {/* admin routes */}
            <ListItem onClick={() => navigate('/dashboard/statistics')} disablePadding selected={true}>
                <ListItemButton>
                    <ListItemIcon>
                        <AutoGraphIcon />
                    </ListItemIcon>
                    <ListItemText primary="Statistics" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-users')} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manager Users" />
                </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate('/dashboard/manage-coupons')} disablePadding>
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