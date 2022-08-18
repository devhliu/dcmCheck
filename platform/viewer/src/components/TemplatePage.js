import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import './TemplatePage.css'
import { baseUrl } from './baseUrl/BaseUrl';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import img1 from './socialIcons/f.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    height: '100%'
  },
  media: {
    height: 150,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  // const image = 'assets/download (1).jfif'

  const CardData = [
    {
      img: 'assets/download.jfif',
      title: 'React Template',
      desc: 'Metronic | Bootstrap HTML, VueJS, React',
      price: 20,

    },
    {
      img: '/assets/download (1).jfif',
      title: 'Vue Template',
      desc: 'Metronic | Bootstrap HTML, VueJS, React',
      price: 30,

    },
    {
      img: '/assets/download (2).jfif',
      title: 'Angular Template',
      desc: 'Metronic | Bootstrap HTML, VueJS, React',
      price: 45,

    },
    {
      img: '/assets/download (3).jfif',
      title: 'NextJS Template',
      desc: 'Metronic | Bootstrap HTML, VueJS, React',
      price: 15,

    },
  ]

  useEffect(() => {

    getCardData()
    getFromLocalStorage()
    // console.log("getarr", getarr)

  }, [])

  const selectedCARD = JSON.parse(localStorage.getItem("selectedCard"))


  const [cardData, setcardData] = useState([])
  const [ReactTemplates, setReactTemplates] = useState([])
  const [AngularTemplates, setAngularTemplates] = useState([])
  const [VueTemplates, setVueTemplates] = useState([])
  const [HTMLTemplates, setHTMLTemplates] = useState([])
  const [selectedcardData, setselectedcardData] = useState([])

  const [ShowReact, setShowReact] = useState(true)
  const [ShowAngular, setShowAngular] = useState(true)
  const [ShowVue, setShowVue] = useState(true)
  const [ShowHTML, setShowHTML] = useState(true)

  const showMoreReact = () => setShowReact(!ShowReact)
  const showMoreAngular = () => setShowAngular(!ShowAngular)
  const showMoreVue = () => setShowVue(!ShowVue)
  const showMoreHTML = () => setShowHTML(!ShowHTML)

  const getCardData = async () => {

    var requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(data),
    };
    // setLoader(true);
    const hello = await fetch(`http://192.168.100.10:8000/api/v1/templates/getAll`, requestOptions)
    const resp = await hello.json();
    // localStorage.setItem('userData', JSON.stringify(resp.data))
    // setStripeCount(`${resp.data.count} uploads remaining`)
    console.log("template resp ", resp);
    if (resp.success) {
      // setcardData(resp.data)
      // console.log(JSON.parse(localStorage.getItem("selectedCard")))
      var react = resp.data.filter(find => find.category == "react")
      localStorage.setItem("react", JSON.stringify(react))
      setReactTemplates(react)
      var angular = resp.data.filter(find => find.category == "angular")
      localStorage.setItem("angular", JSON.stringify(angular))
      setAngularTemplates(angular)
      var vue = resp.data.filter(find => find.category == "vue")
      localStorage.setItem("vue", JSON.stringify(vue))
      setVueTemplates(vue)
      var html = resp.data.filter(find => find.category == "html")
      localStorage.setItem("html", JSON.stringify(html))
      setHTMLTemplates(html)
    }
    else {
      console.log(resp.error)
    }
  }


  const getFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem("selectedCard")) != null) {

      setselectedcardData(JSON.parse(localStorage.getItem("selectedCard")))
    }
  }

  const SelectTemplate = (item) => {
    console.log("item", item)

    if (selectedcardData != "") {
      var exist = selectedcardData.filter(find => find._id == item._id)
      console.log(exist)
      if (exist.length < 1) {
        var appendArr = selectedcardData
        appendArr.push(item)
        localStorage.setItem("selectedCard", JSON.stringify(appendArr))

        getFromLocalStorage()
      } else {
        console.log("already exist..........")

      }
    }
    else {
      var arr = []
      arr.push(item)
      console.log(arr)
      localStorage.setItem("selectedCard", JSON.stringify(arr))
      getFromLocalStorage()

    }
  }

  const deleteTemplate = (item) => {
    var delArr = []
    delArr = selectedcardData.filter(f => f._id != item._id)
    localStorage.setItem("selectedCard", JSON.stringify(delArr))
    getFromLocalStorage()
  }

  // console.log("selectedcardData", selectedcardData)

  // var resularr = ReactTemplates.filter(r => {
  //   selectedcardData.filter(s => {
  //     if (r._id == s._id) {
  //       return r
  //     }
  //   })
  // })
  // console.log("selectedcardData", resularr)
  console.log("selected....", ReactTemplates)
  return (
    <>
      {/* React JS Templates  */}
      <div className='heading-Div'>

        <h2>React JS Templates </h2>

      </div>
      {/*  */}
      {
        ShowReact ?
          // Displaying 4 cards.
          <Grid container spacing={1} className='TemplateContainer'>
            {
              ReactTemplates.map((e, i) => (
                i < 4 ?

                  <Grid item xs={3} className='TemplateCard'>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={`${baseUrl}${e.img[0]}`}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                      <CardContent>
                        <div className='title-and-price'>
                          <p>
                            {e.title}

                          </p>
                          <strong>
                            ${e.price}

                          </strong>

                        </div>

                        <Typography variant="body2" color="textSecondary" component="p">
                          {e.description}

                        </Typography>
                      </CardContent>
                      <CardActions className='cardActionButtons'>
                        <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                          <AddIcon fontSize='small' />Template
                        </Button>

                        <Button size="medium" color="primary" variant='outlined'>
                          Live Preview
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid> : null

              )
              )
            }

          </Grid>
          :
          // Displaying ALL  cards.
          <Grid container spacing={1} className='TemplateContainer'>
            {
              ReactTemplates.map((e, i) => (
                <Grid item xs={3} className='TemplateCard'>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${baseUrl}${e.img[0]}`}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                    <CardContent>
                      <div className='title-and-price'>
                        <p>
                          {e.title}

                        </p>
                        <strong>
                          ${e.price}

                        </strong>

                      </div>


                      {/* <Typography color="textPrimary" >
                  </Typography> */}

                      {/* <Typography color="textPrimary" component="p">
                  </Typography> */}
                      <Typography variant="body2" color="textSecondary" component="p">
                        {e.description}

                      </Typography>
                    </CardContent>
                    <CardActions className='cardActionButtons'>
                      <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                        <AddIcon fontSize='small' />Template
                      </Button>
                      <Button size="medium" color="primary" variant='outlined'>
                        Live Preview
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              ))
            }



          </Grid>

      }

      {/* React Show more/less Button */}
      {ShowReact && ReactTemplates.length > 5 ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a style={{ cursor: 'pointer' }} onClick={() => showMoreReact()}>Show More</a>
        </div>
        : ReactTemplates.length < 4 ?
          null
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a style={{ cursor: 'pointer' }} onClick={() => showMoreReact()}>Show Less</a>
          </div>
      }


      {/* Angular JS Templates */}
      <div className='heading-Div'>

        <h2>Angular JS Templates</h2>

      </div>
      {
        ShowAngular ?
          <Grid container spacing={1} className='TemplateContainer'>
            {
              AngularTemplates.map((e, i) => (
                i < 4 ?
                  <Grid item xs={3} className='TemplateCard'>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={`${baseUrl}${e.img[0]}`}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                      <CardContent>
                        <div className='title-and-price'>
                          <p>
                            {e.title}

                          </p>
                          <strong>
                            ${e.price}

                          </strong>

                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {e.description}

                        </Typography>
                      </CardContent>
                      <CardActions className='cardActionButtons'>
                        <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                          <AddIcon fontSize='small' />Template
                        </Button>
                        <Button size="medium" color="primary" variant='outlined'>
                          Live Preview
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  : null

              ))
            }

          </Grid> :
          <Grid container spacing={1} className='TemplateContainer'>
            {
              AngularTemplates.map(e => (
                <Grid item xs={3} className='TemplateCard'>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${baseUrl}${e.img[0]}`}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                    <CardContent>
                      <div className='title-and-price'>
                        <p>
                          {e.title}

                        </p>
                        <strong>
                          ${e.price}

                        </strong>

                      </div>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {e.description}

                      </Typography>
                    </CardContent>
                    <CardActions className='cardActionButtons'>
                      <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                        <AddIcon fontSize='small' />Template
                      </Button>
                      <Button size="medium" color="primary" variant='outlined'>
                        Live Preview
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              ))
            }


          </Grid>

      }
      {/* Angular Show more/less Button */}
      {ShowAngular && AngularTemplates.length > 5 ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a style={{ cursor: 'pointer' }} onClick={() => showMoreAngular()}>Show More</a>
        </div>
        : AngularTemplates.length < 4 ?
          null
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a style={{ cursor: 'pointer' }} onClick={() => showMoreAngular()}>Show Less</a>
          </div>
      }



      <div className='heading-Div'>

        <h2>Vue Templates</h2>

      </div>
      {
        ShowVue ?
          <Grid container spacing={1} className='TemplateContainer'>
            {
              VueTemplates.map((e, i) => (
                i < 4 ?
                  <Grid item xs={3} className='TemplateCard'>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={`${baseUrl}${e.img}`}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                      <CardContent>
                        <div className='title-and-price'>
                          <p>
                            {e.title}

                          </p>
                          <strong>
                            ${e.price}

                          </strong>

                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {e.description}

                        </Typography>

                      </CardContent>
                      <CardActions className='cardActionButtons'>
                        <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                          <AddIcon fontSize='small' />Template
                        </Button>
                        <Button size="medium" color="primary" variant='outlined'>
                          Live Preview
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  : null

              ))
            }

          </Grid>
          :
          <Grid container spacing={1} className='TemplateContainer'>
            {
              VueTemplates.map(e => (
                <Grid item xs={3} className='TemplateCard'>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${baseUrl}${e.img}`}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                    <CardContent>
                      <div className='title-and-price'>
                        <p>
                          {e.title}

                        </p>
                        <strong>
                          ${e.price}

                        </strong>

                      </div>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {e.description}

                      </Typography>

                    </CardContent>
                    <CardActions className='cardActionButtons'>
                      <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                        <AddIcon fontSize='small' />Template
                      </Button>
                      <Button size="medium" color="primary" variant='outlined'>
                        Live Preview
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              ))
            }



          </Grid>
      }

      {/* Vue Show more/less Button */}
      {ShowVue && VueTemplates.length > 5 ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a style={{ cursor: 'pointer' }} onClick={() => showMoreVue()}>Show More</a>
        </div>
        : VueTemplates.length < 4 ?
          null
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a style={{ cursor: 'pointer' }} onClick={() => showMoreVue()}>Show Less</a>
          </div>
      }


      {/* HTML Templates */}

      <div className='heading-Div'>

        <h2>HTML Templates</h2>

      </div>

      {
        ShowHTML ?

          <Grid container spacing={1} className='TemplateContainer'>
            {
              HTMLTemplates.map((e, i) => (
                i < 4 ?
                  <Grid item xs={3} className='TemplateCard'>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={`${baseUrl}${e.img}`}
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                      <CardContent>
                        <div className='title-and-price'>
                          <p>
                            {e.title}

                          </p>
                          <strong>
                            ${e.price}

                          </strong>

                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {e.description}

                        </Typography>

                      </CardContent>
                      <CardActions className='cardActionButtons'>
                        <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                          <AddIcon fontSize='small' />Template
                        </Button>
                        <Button size="medium" color="primary" variant='outlined'>
                          Live Preview
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  : null
              ))
            }



          </Grid>
          :
          <Grid container spacing={1} className='TemplateContainer'>
            {
              HTMLTemplates.map(e => (
                <Grid item xs={3} className='TemplateCard'>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${baseUrl}${e.img}`}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                    <CardContent>
                      <div className='title-and-price'>
                        <p>
                          {e.title}

                        </p>
                        <strong>
                          ${e.price}

                        </strong>

                      </div>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {e.description}

                      </Typography>

                    </CardContent>
                    <CardActions className='cardActionButtons'>
                      <Button onClick={() => { SelectTemplate(e) }} size="medium" color="primary" variant='outlined'>
                        <AddIcon fontSize='small' />Template
                      </Button>
                      <Button size="medium" color="primary" variant='outlined'>
                        Live Preview
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              ))
            }



          </Grid>
      }


      {/* HTML Show more/less Button */}
      {ShowHTML && HTMLTemplates.length > 5 ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a style={{ cursor: 'pointer' }} onClick={() => showMoreHTML()}>Show More</a>
        </div>
        : HTMLTemplates.length < 4 ?
          null
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a style={{ cursor: 'pointer' }} onClick={() => showMoreHTML()}>Show Less</a>
          </div>
      }

      <span style={{ padding: '30px 0 0 50px' }}><strong>Selected Template</strong></span>
      <Grid container spacing={1} className='TemplateContainer'>
        {
          selectedcardData.map(e => (
            <Grid item xs={3} className='SelectedTemplateCard'>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${baseUrl}${e.img[0]}`}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
                <CardContent>
                  <div className='title-and-price'>
                    <p>
                      {e.title}

                    </p>
                    <strong>
                      ${e.price}

                    </strong>

                  </div>

                  <Typography variant="body2" color="textSecondary" component="p">
                    {e.description}

                  </Typography>
                </CardContent>
                <CardActions className='delete-cardActionButtons'>
                  <Button className='DeleteButton' onClick={() => { deleteTemplate(e) }} size="medium" color="error" variant='outlined'>
                    <DeleteOutlineIcon size='small' />

                  </Button>

                </CardActions>
              </Card>
            </Grid>

          ))
        }

      </Grid>



    </>

  );
}
