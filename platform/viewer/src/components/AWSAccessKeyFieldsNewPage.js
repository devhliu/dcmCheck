import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import MaterialTable from 'material-table'
import { useHistory } from 'react-router';
import Swal from "sweetalert2";
import Button from '@material-ui/core/Button';

import { Base64 } from 'js-base64';
// import 'antd/dist/antd.css';
// import { Space, Table, Tag } from 'antd';


import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FacebookIcon from '@material-ui/icons/Facebook';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


//   Material TABLE ****
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStylesofModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    width:'32%'
  },
}));



// OVERLAY LOADER
// import { Loader } from 'react-overlay-loader';

// // OVERLAY LOADER CSS
// import 'react-overlay-loader/styles.css';

// // Importing Google authentications
// import GoogleLogin from 'react-google-login';

// // Importing Facebook authentications
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// // import FacebookLogin from 'react-facebook-login';

// // EMAIL VALIDATOR
// import validator from 'validator';




const useStyles = makeStyles((theme) => ({

  
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 395,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//  Material TABLE CONTENT ***********
const columns = [
  { id: 'name', label: 'AccessKeyId', minWidth: 120 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 40 },
  {
    id: 'population',
    label: 'Bucket Name',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    // label: 'Size\u00a0(km\u00b2)',
    label: 'Secret Access Key',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'DCMC Key',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  { id: 'status', label: 'status', minWidth: 120 },
  { id: 'action', label: 'action', minWidth: 60 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


const useMaterialStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
//  Material TABLE CONTENT ***********

const AWSAccessKeyFieldsNewPage = () => {

  const classes = useStyles();
  const Classes = useMaterialStyles();

  const classesofModal = useStylesofModal();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const history = useHistory();
//   const userData = JSON.parse(localStorage.getItem('userData'))
//   const token = localStorage.getItem('token')
//   if (token !== null && userData.stripeId) {
//     history.push('/studylist')
//   } else if (token !== null && userData.stripeId === undefined) {
//     history.push('/package')
//   }
  
 
  


  const [AccessKeyID, setAccessKeyID] = useState('');
  const [SecretAccessKey, setSecretAccessKey] = useState('');
  const [BucketName, setBucketName] = useState('')
  const [DCMCAccessKey, setDCMCAccessKey] = useState('')
  const [LocalData, setLocalData] = useState([])
  const [Deleted, setDeleted] = useState('')

  // const [GoogleAccessKeyID, setGoogleAccessKeyID] = useState('');
  // const [GoogleSecretAccessKey, setGoogleSecretAccessKey] = useState('');
  // const [GoogleBucketName, setGoogleBucketName] = useState('')

  useEffect(() => {
    
    // var local_storage_Data = JSON.parse(localStorage.getItem('Data'))
    setLocalData( JSON.parse(localStorage.getItem('Data')))
    // console.log("Data",local_storage_Data)
    
  }, [Deleted])

  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    // setAge(event.target.value);

    // console.log(event.target.value)
    if(event.target.value == "AWSAccessKey"){
      setshowAWS(false)
    }
    else{
      setshowAWS(true)
    }
  };

  const [showAWS, setshowAWS] = useState(false)


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const connect =()=>{

    // let latin = 'vendorsAuthenticateSignUp';
    let result1 = Base64.encode(AccessKeyID)
    let result2 = Base64.encode(SecretAccessKey, true)
    let result3 = Base64.encode(BucketName, true)
    // console.log('first',result1,result2,result3)
    // var finalRes = result1.concat(result2,result3)
    setDCMCAccessKey(result1.concat(result2,result3))
    // console.log("result",finalRes)
    
    // var decode = Base64.atob(result1)+Base64.atob(result2)+Base64.atob(result3)
    // console.log("decode",decode)
    // console.log("decode",Base64.decode(      finalRes))
   

  }

  const addData = ()=>{

    // var arr = []
    if(LocalData != null ){
      var obj ={
        id:AccessKeyID,
        secret_access_key:SecretAccessKey,
        bucket_name:BucketName,
        dcmc_key:DCMCAccessKey,
        status:'Disconnected'
      }
      var arr = [...LocalData, obj]
      localStorage.setItem('Data',JSON.stringify(arr))
      setDeleted(arr)
      console.log('LocalData == undefined')
    }
    else{
      var arr = []
      var obj ={
        id:AccessKeyID,
        secret_access_key:SecretAccessKey,
        bucket_name:BucketName,
        dcmc_key:DCMCAccessKey,
        status:'Disconnected'
      }
      arr = [...arr, obj]
      localStorage.setItem('Data',JSON.stringify(arr))
      setDeleted(arr)
      console.log('[...arr, obj]')
    }
    console.log("first",arr)
    setAccessKeyID('')
    setSecretAccessKey('')
    setBucketName('')
    setDCMCAccessKey('')
    handleClose()
  }

  const deleteData = id =>{
    console.log('id',id)

    var filteredData = LocalData.filter(f => f.id != id)
    localStorage.setItem('Data',JSON.stringify(filteredData))
    setDeleted(filteredData)
    // console.log('filteredData',filteredData)
    
  }

  const changeStatus = data =>{


    // var fullFilter = LocalData.filter(f => f.id != data.id)
    var fullarray = []
    LocalData.map(d => {
        if(d.id == data.id){
          if(data.status == 'Disconnected')
          {
            data.status = "Connected"
            fullarray.push(data)
          }
          else
          {
            data.status = "Disconnected"
            fullarray.push(data)
          }
        }
        else{
          fullarray.push(d)
        }
    })
    console.log("changeStatus",fullarray)
    localStorage.setItem('Data',JSON.stringify(fullarray))
    setDeleted(fullarray)
    // data.status = 'connected'
    // fullFilter = [...fullFilter, data]
    // localStorage.setItem('Data',JSON.stringify(fullFilter))
    // console.log('dataaa',data)

  }

  const connectGoogle =()=>{

    // let latin = 'vendorsAuthenticateSignUp';
    let result1 = Base64.encode(AccessKeyID)
    let result2 = Base64.encode(SecretAccessKey, true)
    let result3 = Base64.encode(BucketName, true)
    // console.log('first',result1,result2,result3)
    var finalRes = result1.concat(result2,result3)
    setDCMCAccessKey(finalRes)
    // console.log("result",finalRes)
    
    // var decode = Base64.atob(result1)+Base64.atob(result2)+Base64.atob(result3)
    // console.log("decode",decode)
    // console.log("decode",Base64.decode(      finalRes))
 
  }

  

  return (
    <>
      {/* {loader == true ? <Loader fullPage loading /> : null} */}

      <Container component="main" maxWidth="xs" style={{overflow:'hidden'}}>
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
            
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classesofModal.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classesofModal.paper}>
                  {/* <h2 id="transition-modal-title">Transition modal</h2>
                  <p id="transition-modal-description">react-transition-group animates me.</p> */}
                  
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple" >Select AccessKeys</InputLabel>
                      <Select
                      
                      // labelId="demo-simple-select-outlined-label"
                      // id="demo-simple-select-outlined"
                      value={age}
                      native
                      onChange={handleChange}
                      label="Select AccessKeys"
                      inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                      }}
                    
                      >
                          {/* <MenuItem onClick={()=>{setshowAWS(false)}}>AWSAccessKey</MenuItem>
                          <MenuItem onClick={()=>{setshowAWS(true)}}>GoogleAccessKey</MenuItem> */}
                            <option ></option>
                            <option value={'AWSAccessKey'} onClick={()=>{setshowAWS(false)}} >AWSAccessKey</option>
                            <option value={'GoogleAccessKey'} onClick={()=>{setshowAWS(true)}} >GoogleAccessKey</option>
                      </Select>
                </FormControl>
                <form className={classes.form} noValidate>
                      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                    <div style={{display:showAWS ? 'none':'block'}}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="AccessKey ID"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={AccessKeyID}
                          onChange={(e) => handleInputChange(e, setAccessKeyID)}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Secret Access Key"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={SecretAccessKey}
                          onChange={(e) => handleInputChange(e, setSecretAccessKey)}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Bucket Name"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={BucketName}
                          onChange={(e) => handleInputChange(e, setBucketName)}
                        />
                        {/* DCMC Generated KEY ************ */}
                        <TextField
                          // variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="DCMC key"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={DCMCAccessKey}
                          inputProps={
                            { readOnly: true, }
                          }
                        />
                    
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => connect()}
                          style={{  padding: "12px 0px" }} 
                        >
                          Generate Key
                        </Button>

                        {DCMCAccessKey && 
                            <Button
                              type="button"
                              // fullWidth
                              variant="contained"
                              color="primary"
                              // className={classes.submit}
                              onClick={() => addData()}
                              style={{  padding: "8px 17px" }} 
                            >
                              Add to Table
                            </Button>
                        }

                    </div>

                    <div style={{width:'100%',display:showAWS ? 'block':'none'}}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Google AccessKey ID"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={AccessKeyID}
                          onChange={(e) => handleInputChange(e, setAccessKeyID)}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Google Secret Access Key"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={SecretAccessKey}
                          onChange={(e) => handleInputChange(e, setSecretAccessKey)}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Google Bucket Name"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={BucketName}
                          onChange={(e) => handleInputChange(e, setBucketName)}
                        />
                      

                        {/* DCMC Generated KEY ************ */}
                        <TextField
                          // variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="DCMC key"
                          type="text"
                          id="password"
                          autoComplete="current-password"
                          value={DCMCAccessKey}
                          inputProps={
                            { readOnly: true, }
                          }
                        />
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => connectGoogle()}
                          style={{  padding: "12px 0px" }} 
                        >
                          Generate Key
                        </Button>

                        {DCMCAccessKey && 
                            <Button
                              type="button"
                              // fullWidth
                              variant="contained"
                              color="primary"
                              // className={classes.submit}
                              onClick={() => addData()}
                              style={{  padding: "8px 17px" }} 
                            >
                              Add to Table
                            </Button>
                        }

                    </div>
                </form>
                </div>
              </Fade>
            </Modal>

    
        </div>

      </Container>
      <div style={{paddingLeft:15, paddingBottom:10}}>
        <Button  color='primary' variant='outlined' type="button" onClick={handleOpen}>
          AWS AccessKey / Google AccessKey
        </Button>

      </div>
      <Paper className={Classes.root} style={{padding:5}}>
        <TableContainer className={Classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
                {LocalData && LocalData.map(e=>
              <TableRow key={e.id}>
                <>
                    <TableCell>
                      {e.id}
                    </TableCell>
                    <TableCell>
                      {e.bucket_name}
                    </TableCell>
                    <TableCell>
                      {e.secret_access_key}
                    </TableCell>
                    <TableCell>
                      {e.dcmc_key}
                    </TableCell>
                    <TableCell>
                      {
                        e.status == "Disconnected" &&
                          <a style={{color:'red',cursor:'pointer'}} onClick={()=>changeStatus(e)}>
                            {e.status}
                          </a>
                      }
                      {
                        e.status == "Connected" &&
                          <a style={{color:'green',cursor:'pointer'}} onClick={()=>changeStatus(e)}>
                            {e.status}
                          </a>
                      }
                    </TableCell>
                    <TableCell>
                      <DeleteIcon style={{color:'red',cursor:'pointer'}} onClick={()=> deleteData(e.id)}/>
                    </TableCell>
                </>

              </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
    </Paper>

   


    </>
  )
}

export default AWSAccessKeyFieldsNewPage



