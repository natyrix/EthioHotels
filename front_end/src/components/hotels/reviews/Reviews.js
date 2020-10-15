import React from "react";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Review from './Review'

export default function Reviews ({reviews}) {
  const [open, setOpen] = React.useState(true);
  if(reviews.length === 0) return (
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
          This hotel have no reviews currently
        </Alert>
      </Collapse>
    </>
  );
  const reviewComponents = reviews.map(review=>{
    return <Review review={review} key={review.id+10}/>
  });
  return (
    <div>
      <h5>Reviews:</h5>
      <div className="row">
        {reviewComponents}
      </div>
    </div>
  );
}
