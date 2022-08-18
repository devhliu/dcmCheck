import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './DashboardPage.css'
import MiniDrawer from './DashboardPage';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
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


const obj = (
  `
  <script>
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
  </script>
  <noscript>Sorry, your browser does not support JavaScript!</noscript>
  `
)

const obj2 = (
  `<!DOCTYPE html>
  <html>
  <head>
  <style>
  .note {
    font-size: 120%;
    color: red;
  }
  </style>
  </head>
  <body>

  <h1>My <span class="note">Important</span> Heading</h1>
  <p>This is some <span class="note">important</span> text.</p>

  </body>
  </html>
  `
)




export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function copy(text) {
    navigator.clipboard.writeText(text)
    handleClick()
  }

  return (
    <MiniDrawer>
    <div style={{ width: '100%', height: '450px', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px' }}>
    
    <div style={{ paddingBottom: '3%' }}>
      <h3>HTML Basics</h3>
      <Card className={`ReactAngularHTMLCard ${classes.root} `} style={{ marginBottom: '2%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
        <CardContent>
          <pre>
            <code>
              {obj}

            </code>

          </pre>

        </CardContent>
        <div style={{ textAlign: 'end' }}>
          <Button>
            <FileCopyIcon onClick={() => { copy(obj) }} className={'copyIcon'} />

          </Button>

        </div>
      </Card>
      <p>In product-details.component.ts, import ActivatedRoute from @angular/router, and the products array from ../products.</p>
      <Card className={`ReactAngularHTMLCard ${classes.root} `} variant="outlined" style={{ marginTop: '1%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
        <CardContent>
          <pre>
            <code>
              {obj2}

            </code>

          </pre>

        </CardContent>
        <div style={{ textAlign: 'end' }}>
          <Button>
            <FileCopyIcon onClick={() => { copy(obj) }} className={'copyIcon'} />

          </Button>

        </div>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Copied to Clipboard"
        action={action}
      />
    </div>

  </div>

    </MiniDrawer>
  );
}
