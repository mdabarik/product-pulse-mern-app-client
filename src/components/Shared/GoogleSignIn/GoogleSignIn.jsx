import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FcGoogle } from "react-icons/fc";



const GoogleSignIn = () => {
    return (
        <Stack direction="row" spacing={10}>
            <Button sx={{borderRadius: '50px', minWidth: '300px', padding: '8px'}} variant="outlined" startIcon={<FcGoogle className="text-5xl"></FcGoogle>}>
                Sign In with Google
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;

