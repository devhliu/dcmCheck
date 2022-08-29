import React, { useState } from 'react';
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
  <h2>Products</h2>

  <div *ngFor="let product of products">

      <h3>
        <a [title]="product.name + ' details'">
          {{ product.name }}
        </a>
      </h3>

      <p *ngIf="product.description">
        Description: {{ product.description }}
      </p>

  </div>

  `
)

const obj2 = (
  `
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';

  import { Product, products } from '../products';
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
      <div style={{ width: '100%', height: '350px', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px', marginBottom: '18%' }}>

        <div style={{ paddingBottom: '3%' }}>
          <h3>Angular Basics</h3>
          <Card className={`ReactAngularHTMLCard ${classes.root} `} style={{ marginBottom: '2%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
            <CardContent className='CardContent'>
              <pre>
                <code>
                  {obj}

                </code>

              </pre>

            </CardContent>
            <div style={{ textAlign: 'end' }}>
              {/* <Button onClick={() => { copy(obj) }}>Copy</Button> */}
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
              {/* <Button onClick={() => { copy(obj2) }}>Copy</Button> */}
              <Button>
                <FileCopyIcon onClick={() => { copy(obj2) }} className={'copyIcon'} />

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
