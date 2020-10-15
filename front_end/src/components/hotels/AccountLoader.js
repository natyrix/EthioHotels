import React from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {makeStyles} from "@material-ui/core/styles";
import ErrorMessage from "./ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Account from "./Account";

const useStyles = makeStyles((theme) => ({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function AccountLoader() {
  const classes = useStyles();
  const {account, loading, error, message} = useStoreState(state => state.hotel);
  const {getAccount} = useStoreActions(actions => actions.hotel);

  React.useEffect(()=>{
    getAccount();
  }, []);

  return (
    <>
      {error && <ErrorMessage error={error}/>}
      {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
      {loading ?
        <div className={classes.alignCenter}>
          <CircularProgress/>
        </div>
        :
        <Account account={account}/>}
    </>
  );
}