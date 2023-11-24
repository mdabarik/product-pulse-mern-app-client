import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useAllUsers from '../../../../hooks/useAllUsers';

const Users = () => {

  const [users, isLoading] = useAllUsers();
  // console.log(users, 'inside users.jsx');

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
              users?.map((user, index) => <TableRow key={user?._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">#{index + 1}</TableCell>
                <TableCell component="th" scope="row">{user?.userName}</TableCell>
                <TableCell align="left">{user?.userEmail}</TableCell>
                <TableCell align="left">{user?.status}</TableCell>
                <TableCell align="left">{user?.userRole}</TableCell>
                <TableCell align="left">
                  <Button variant="outlined" size="small">
                    Make Moderator
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined" size="small">
                    Make Admin
                  </Button>
                </TableCell>
              </TableRow>)
            }


          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;