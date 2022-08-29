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
import UploadFile from './UserPreferences/UploadFile';
import AngularComponent from './AngularComponent'

const useStyles = makeStyles({
  root: {
    minWidth: 375,
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
  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }

    return (
      <div className="warning">
        Warning!
      </div>
    );
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
      this.setState(state => ({
        showWarning: !state.showWarning
      }));
    }

    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Page />);
  `
)

const obj2 = (
  `
   [AngularComponent]
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
      <div className='ReactAngularHTML_Div' style={{ width: '100%', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px' }}>


        <div style={{ paddingBottom: '3%' }}>
          <h3>React Basics</h3>
          <Card className={`ReactAngularHTMLCard ${classes.root} `} style={{ marginBottom: '2%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
            <CardContent className='CardContent'>
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
          {/* <Card className={classes.root} variant="outlined" style={{ marginTop: '1%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
            <CardContent>
              <pre>
                <code>
                  {obj2}

                </code>

              </pre>

            </CardContent>
            <div style={{ textAlign: 'end' }}>
              <Button onClick={() => { copy(obj2) }}>Copy</Button>

            </div>
          </Card> */}
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
