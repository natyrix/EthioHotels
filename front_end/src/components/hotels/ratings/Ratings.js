import React from "react";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Rating from './Rating'

export default function Ratings ({ratings}) {
  const [open, setOpen] = React.useState(true);
  if(ratings.length === 0) return (
    <>
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This hotel have no ratings currently
        </Alert>
      </Collapse>
    </>
);
  const ratingComponents = ratings.map(rating =>{
    return <Rating rating={rating} key={rating.id+100}/>
  });
  return (
    <div>
      <h5>Individual Ratings:</h5>
      <div className="row">
        {ratingComponents}
      </div>
    </div>
  );
}
