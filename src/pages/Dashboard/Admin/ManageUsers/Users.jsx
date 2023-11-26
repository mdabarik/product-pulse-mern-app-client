import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAllUsers from '../../../../hooks/useAllUsers';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import UpdateModal from '../../../../components/Dashboard/UpdateModal/UpdateModal';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const Users = () => {
  const [users, isLoading, refetch] = useAllUsers()
  const axiosSecure = useAxiosSecure();
  const { user: loggedUser } = useAuth();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleMakeAdmin = async (email, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Would you like add ${name} as Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make, Admin"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${email}`, { userRole: 'admin' })
          .then(res => {
            refetch();
            console.log(res, 'inside handle make admin');
            toast.success(`Now ${name} is admin!`);
          })
          .catch(err => {
            console.log(err, 'inside handle make admin');
            toast.success(err.message);
          })
      }
    });
    console.log(email, 'admin');
  }

  const handleMakeModerator = (email, name) => {
    console.log(email, 'moderator');
    Swal.fire({
      title: "Are you sure?",
      text: `Would you like add ${name} as Moderator?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make, Moderator"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${email}`, { userRole: 'moderator' })
          .then(res => {
            refetch();
            console.log(res, 'inside handle make admin');
            toast.success(`Now ${name} is moderator!`);
          })
          .catch(err => {
            console.log(err, 'inside handle make admin');
            toast.success(err.message);
          })
      }
    });
  }

  return (
    <div>
      <div>
        <h2 className='text-xl my-3'>All Users: {users?.length || 0}</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#ecf4f9' }}>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align='left' sx={{ minWidth: '120px' }}>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {/* table row */}
            {
              isLoading ? <div className='flex items-center justify-center w-full text-center'>
                <span className="loading loading-spinner text-info loading-lg"></span>
              </div>
                :
                users?.map((user, index) => <TableRow key={user?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">#{index + 1}</TableCell>
                  <TableCell component="th" scope="row">{user?.userName}</TableCell>
                  <TableCell align="left">{user?.userEmail}</TableCell>
                  <TableCell align="left">{user?.status}</TableCell>
                  <TableCell align="left">{user?.userRole}</TableCell>
                  <TableCell align="left">
                    {
                      user?.userEmail == loggedUser?.email ? "It is you" :
                        <Button onClick={() => {
                          handleMakeModerator(user?.userEmail, user?.userName)
                        }} variant="outlined" size="small">
                          Make Moderator
                        </Button>
                    }

                  </TableCell>
                  <TableCell align="left">
                    {
                      user?.userEmail == loggedUser?.email ? "It is you" :
                        <Button onClick={() => {
                          handleMakeAdmin(user?.userEmail, user?.userName)
                        }} variant="outlined" size="small">
                          Make Admin
                        </Button>
                    }

                  </TableCell>

                </TableRow>)
            }

          </TableBody>
        </Table>
      </TableContainer>
      {/* <UpdateModal open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}></UpdateModal> */}
    </div>
  );
}

export default Users;