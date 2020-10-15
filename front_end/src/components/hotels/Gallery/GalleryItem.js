import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {formatDistance} from "date-fns";
import {useStoreActions} from "easy-peasy";

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
  margin: {
    margin: theme.spacing(1),
  },
  pos: {
    marginBottom: 5,
  },
}));

export default function GalleryItem({gallery}) {
  const classes = useStyles();
  const img_url = `http://localhost:8000${gallery.img_location}`;
  const {deleteImage} = useStoreActions(actions => actions.hotel);
  function handleDelete(pk) {
    deleteImage(pk);
  }
  return (
    <div className='m-2'>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img_url}
            title={gallery.hotel_name}
          />
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              uploaded at: {new Date(gallery.updated_at).toDateString()},
              ({formatDistance(new Date(gallery.updated_at), new Date())} ago).
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="delete" className={classes.margin} onClick={()=>handleDelete(gallery.id)}>
            <DeleteIcon titleAccess='Remove Image' color="error" fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
