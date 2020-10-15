import React from 'react';
import { formatDistance, format, subDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RatingIcon from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Rating({rating}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className='m-3'>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            Rating Type: {rating.rating_name}
          </Typography>
          {/*<Typography variant="h6" component="h4">*/}
          {/*  {stars} ({rating.rating_value} stars)*/}
          {/*</Typography>*/}
          <Typography className={classes.pos} color="textSecondary">
            <RatingIcon readOnly name='medium' defaultValue={rating.rating_value} size="medium" /> ({rating.rating_value} stars)
          </Typography>
          <Typography variant="body2" component="p">
            Rated by: {rating.user_name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Rated at: {new Date(rating.updated_at).toDateString()},
            ({formatDistance(new Date(rating.updated_at), new Date())} ago).
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
