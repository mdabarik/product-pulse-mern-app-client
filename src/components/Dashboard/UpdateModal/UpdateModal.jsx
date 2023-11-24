import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const UpdateModal = ({open, name, role, handleClickOpen, handleClose}) => {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle sx={{textAlign: 'center', fontWeight: 'bold'}} style={{ cursor: 'move' }} id="draggable-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Would you like to make ${name} as ${role}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button variant='outlined' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleClose}>Make Admin</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UpdateModal;