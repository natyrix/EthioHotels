import React from "react";
import Ratings from "./ratings/Ratings";
import Reviews from './reviews/Reviews'
import RatingSummary from "./ratings/RatingSummary";
import {useStoreActions, useStoreState} from "easy-peasy";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorMessage from "./ErrorMessage";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  alignCenter: {
    display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
}));
export default function RatesandReviews() {
  const classes = useStyles();
  const theme = useTheme();
  const getRatingAndReviews = useStoreActions(actions => actions.hotel.getRatingAndReviews);
  const {error, loading, ratings, reviews} = useStoreState(state => state.hotel);
  React.useEffect(()=>{
    getRatingAndReviews();
  },[]);
  return(
    <div>
      {loading &&
      <div className={classes.alignCenter}>
        <CircularProgress />
      </div>}
      {error && <ErrorMessage error={error}/>}
      { ratings.length !== 0 && <RatingSummary ratings={ratings}/>}
      {!loading &&
      <>
        <hr/>
        <Ratings ratings={ratings} />
        <hr/>
        <Reviews reviews={reviews} />
      </>
      }
    </div>
  )
}