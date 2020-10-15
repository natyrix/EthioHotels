import React from "react";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import {useStoreActions, useStoreState} from "easy-peasy";
import GalleryItem from "./GalleryItem";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ErrorMessage from "../ErrorMessage";

const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 275,
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Gallery () {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const {gallery, loading, error, message} = useStoreState(state => state.hotel);
  const {getGallery, uploadImage} = useStoreActions(actions => actions.hotel);
  const [img, setImg] = React.useState(null);
  const [valErr, setValErr] = React.useState('');
  const [severity, setSeverity] = React.useState(null);

  React.useEffect(()=>{
    getGallery()
  },[]);

  function handleSubmit(e) {
    e.preventDefault();
    if(valErr.length ===0){
      setValErr('');
      const form_data = new FormData();
      form_data.append('img_location', img, img.name);
      uploadImage(form_data);
      getGallery();
    }
    else{
      alert('Can not upload, please check image size or file type and upload again.')
    }
  }

  function handleImageChange(e) {
    let pattern = /image-*/;
    const file = e.target.files[0];
    if(!file.type.match(pattern)){
      setValErr('Only images with an extension of *.jpeg, *.jpg, *.png are supported!');
      setSeverity(null)
    }
    else{
      const fsize = file.size/1024/1024;
      if(fsize > 5){
        setValErr('Image can not exceed 5MB!');
        setSeverity(null)
      }
      else{
        setValErr('');
        setImg(e.target.files[0]);
      }
    }
  }

  if(gallery.length === 0) return (
    <div className='col'>
      {error && <ErrorMessage error={error}/>}
      {valErr.length !== 0 && <ErrorMessage error={valErr} severity={severity}/>}
      {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
      <div className='col-6'>
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
            This hotel have no Gallery collection.
          </Alert>
        </Collapse>
      </div>
      <hr/>
      <div className="col-4">
        <Card className={classes.root}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <input
                className='form-control'
                type="file"
                id="image"
                accept=".png, .jpeg"
                onChange={handleImageChange} required
              />
              <br/>
                <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                type='submit'
              >
                Upload
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  const GalleryComponent = gallery.map(g =>{
    return <GalleryItem gallery={g} key={g.id}/>
  });
  return (
    <div>
      {error && <ErrorMessage error={error}/>}
      {valErr.length !== 0 && <ErrorMessage error={valErr} severity={severity}/>}
      {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
      {loading &&
      <div className={classes.alignCenter}>
        <CircularProgress/>
      </div>
      }
        <div className="row">
          <div className={classes.alignCenter} style={{width:'18rem', height:'18rem'}}>
            <Card className={classes.root}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <input
                    className='form-control'
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange} required
                  />
                  <br/>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    type='submit'
                  >
                    Upload
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          {GalleryComponent}
        </div>
    </div>
  );
}
