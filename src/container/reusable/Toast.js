import React from 'react';
import { Snackbar, Alert } from '@mui/material';


const Toast = (props) => {
  console.log('Toast Component Render');
 
  const [open, setOpen] = React.useState(props.data_props.status);

  React.useEffect(() => {
    if(props.data_props.status === true){
      setOpen(true);
    }
  }, [props]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return <div>

    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'right',}}>
      <Alert onClose={handleClose} severity={props.data_props.type} sx={{ width: '100%' }}>
        {props.data_props.message}
      </Alert>
    </Snackbar>

  </div>;
};  

export default React.memo(Toast);