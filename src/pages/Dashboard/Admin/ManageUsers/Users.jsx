// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import useAllUsers from '../../../../hooks/useAllUsers';
// import Button from '@mui/material/Button';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';
// import UpdateModal from '../../../../components/Dashboard/UpdateModal/UpdateModal';
// import { useState } from 'react';
// import useAuth from '../../../../hooks/useAuth';

// const Users = () => {
//   const [users, isLoading, refetch] = useAllUsers()
//   const axiosSecure = useAxiosSecure();
//   const { user: loggedUser } = useAuth();

//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   const handleMakeAdmin = async (email, name) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Would you like add ${name} as Admin?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Make, Admin",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.patch(`/users/${email}`, { userRole: 'admin' })
//           .then(res => {
//             refetch();
//             console.log(res, 'inside handle make admin');
//             toast.success(`Now ${name} is admin!`);
//           })
//           .catch(err => {
//             console.log(err, 'inside handle make admin');
//             toast.success(err.message);
//           })
//       }
//     });
//     console.log(email, 'admin');
//   }

//   const handleMakeModerator = (email, name) => {
//     console.log(email, 'moderator');
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Would you like add ${name} as Moderator?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Make, Moderator"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.patch(`/users/${email}`, { userRole: 'moderator' })
//           .then(res => {
//             refetch();
//             console.log(res, 'inside handle make admin');
//             toast.success(`Now ${name} is moderator!`);
//           })
//           .catch(err => {
//             console.log(err, 'inside handle make admin');
//             toast.success(err.message);
//           })
//       }
//     });
//   }

//   return (
//     <div>
//       <div>
//         <h2 className='text-xl my-3'>All Users: {users?.length || 0}</h2>
//       </div>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 750 }} aria-label="simple table">
//           <TableHead sx={{ backgroundColor: '#ecf4f9' }}>
//             <TableRow>
//               <TableCell>No.</TableCell>
//               <TableCell align='left' sx={{ minWidth: '120px' }}>Name</TableCell>
//               <TableCell align="left">Email</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Role</TableCell>
//               <TableCell align="left">Action</TableCell>
//               <TableCell align="left">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>

//             {/* table row */}
//             {
//               isLoading ? <div className='flex items-center justify-center w-full text-center'>
//                 <span className="loading loading-spinner text-info loading-lg"></span>
//               </div>
//                 :
//                 users?.map((user, index) => <TableRow key={user?._id}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">#{index + 1}</TableCell>
//                   <TableCell component="th" scope="row">{user?.userName}</TableCell>
//                   <TableCell align="left">{user?.userEmail}</TableCell>
//                   <TableCell align="left">{user?.status}</TableCell>
//                   <TableCell align="left">{user?.userRole}</TableCell>
//                   <TableCell align="left">
//                     {
//                       user?.userEmail == loggedUser?.email ? "It is you" :
//                         <Button onClick={() => {
//                           handleMakeModerator(user?.userEmail, user?.userName)
//                         }} variant="outlined" size="small">
//                           Make Moderator
//                         </Button>
//                     }

//                   </TableCell>
//                   <TableCell align="left">
//                     {
//                       user?.userEmail == loggedUser?.email ? "It is you" :
//                         <Button onClick={() => {
//                           handleMakeAdmin(user?.userEmail, user?.userName)
//                         }} variant="outlined" size="small">
//                           Make Admin
//                         </Button>
//                     }

//                   </TableCell>

//                 </TableRow>)
//             }

//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* <UpdateModal open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}></UpdateModal> */}

//     </div>
//   );
// }

// export default Users;







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



import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdminBtn from '../../../../components/Button/AdminBtn';
import DisableBtn from '../../../../components/Shared/DisableBtn/DisableBtn';
import NotAdminBtn from '../../../../components/Button/NotAdminBtn';
import ModeratorBtn from '../../../../components/Button/ModeratorBtn';
import NotModeratorBtn from '../../../../components/Button/NotModeratorBtn';

const Users = () => {
  const [users, isLoading, refetch] = useAllUsers()
  const axiosSecure = useAxiosSecure();
  const { user: loggedUser } = useAuth();


  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const handleAdminOpen = (email, name) => {
    setAdminName(name);
    setAdminEmail(email)
    setAdminOpen(true);
  };
  const handleMakeAdmin = async () => {
    axiosSecure.patch(`/users/${adminEmail}`, { userRole: 'admin' })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Now ${adminName} is admin!`);
        } else if (res.data.matchedCount) {
          toast.error("This user already admin")
        }
        refetch();
        console.log(res, 'inside handle make admin');
      })
      .catch(err => {
        console.log(err, 'inside handle make admin');
        toast.success(err.message);
      })
  }


  const [modName, setModName] = useState("");
  const [modEmail, setModEmail] = useState("");
  const [modOpen, setModOpen] = useState(false);
  const handleModOpen = (email, name) => {
    setModName(name);
    setModEmail(email)
    setModOpen(true);
  };
  const handleMakeModerator = () => {
    axiosSecure.patch(`/users/${modEmail}`, { userRole: 'moderator' })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Now ${modName} is moderator!`);
        } else if (res.data.matchedCount) {
          toast.error("This user already moderator")
        }
        refetch();
        console.log(res, 'inside handle make moderator');
      })
      .catch(err => {
        console.log(err, 'inside handle make moderator');
        toast.success(err.message);
      })
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
              <TableCell align="left">Make Moderator</TableCell>
              <TableCell align="left">Make Admin</TableCell>
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
                      user?.userEmail == loggedUser?.email || user?.userRole == 'moderator' ?
                        <>
                          <button disabled>
                            {
                              user?.userRole == 'moderator' ?
                              <ModeratorBtn></ModeratorBtn> :
                              <NotModeratorBtn></NotModeratorBtn>
                            }
                          </button>
                        </>
                        :
                        <button onClick={() => {
                          handleModOpen(user?.userEmail, user?.userName)
                        }} >
                          <NotModeratorBtn></NotModeratorBtn>
                        </button>
                    }

                  </TableCell>
                  <TableCell align="left">
                    {
                      user?.userEmail == loggedUser?.email || user?.userRole == 'admin' ?
                        <button disabled>
                          <AdminBtn></AdminBtn>
                        </button>
                        :
                        <button onClick={() => {
                          handleAdminOpen(user?.userEmail, user?.userName)
                        }} >
                          <NotAdminBtn></NotAdminBtn>
                        </button>
                    }

                  </TableCell>

                </TableRow>)
            }

          </TableBody>
        </Table>
      </TableContainer>


      {/*---------- Modal Make Admin ---------------*/}
      <React.Fragment>
        <Dialog
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Do you want to make the ${adminEmail} admin?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAdminOpen(false)}>Cancel</Button>
            <Button variant='contained' onClick={() => {
              handleMakeAdmin()
              setAdminOpen(false)
            }} autoFocus>
              Yes, Make Admin
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/*---------- Modal Make Admin ---------------*/}
      <React.Fragment>
        <Dialog
          open={modOpen}
          onClose={() => setModOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Do you want to make the ${modEmail} moderator?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModOpen(false)}>Cancel</Button>
            <Button variant='contained' onClick={() => {
              handleMakeModerator()
              setModOpen(false)
            }} autoFocus>
              Yes, Make Moderator
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


    </div>
  );
}

export default Users;