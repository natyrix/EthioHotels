import React from "react";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Alert from "@material-ui/lab/Alert/Alert";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function ({error, severity}) {
  const [openAlert, setOpenAlert] = React.useState(true);
  return(
    <Collapse in={openAlert}>
      <Alert
        severity={severity?severity:'error'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {error}
      </Alert>
    </Collapse>
  );
}