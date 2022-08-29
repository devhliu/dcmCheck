import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckIcon from '@material-ui/icons/Check';


import './Package.css'
import { baseUrl } from './baseUrl/BaseUrl';


const PackagePrice = () => {


  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('token')
  if (token === null) {
    history.push('/')
  }
  // console.log("pack>", userData.stripeId)


  const [loader, setLoader] = useState(false);
  const [PayAsYouGo, setPayAsYouGo] = useState('');
  const [FreePackage, setFreePackage] = useState('');
  const [MonthlyPackage1, setMonthlyPackage1] = useState('');
  const [MonthlyPackage2, setMonthlyPackage2] = useState('');
  const [MonthlyPackage3, setMonthlyPackage3] = useState('');

  // const navigate = useNavigate()

  useEffect(() => {

    getPayAsYouGoPackage();
    getMonthlyPackage1();
    getMonthlyPackage2();
    getMonthlyPackage3();


  }, [])

  const getFreePackage = async () => {
    // setLoader(true);
    var data = {
      token: token
    }
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    // const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/`, requestOptions)
    const hello = await fetch(`${baseUrl}api/v1/stripe/freeAccount`, requestOptions)
    const result = await hello.json();
    console.log("getFreePackage", result);
    if (result.success == "true") {
      history.push('/success')
      // setFreePackage(result.data.session.url);
      // history.push('/success')
    }

  }

  const getPayAsYouGoPackage = async () => {
    setLoader(true);
    var data = {
      token: token
    }
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    // const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/`, requestOptions)
    const hello = await fetch(`${baseUrl}api/v1/stripe/`, requestOptions)
    const result = await hello.json();
    console.log("setPayAsYouGo", result);
    if (result.status) {
      setPayAsYouGo(result.data.session.url);
    }

  }

  const getMonthlyPackage1 = async (token1) => {
    setLoader(true);
    var data = {
      token: token
    }
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/1`, requestOptions)
    const resp = await hello.json();

    console.log("resp1", resp)
    if (resp.status) {
      setMonthlyPackage1(resp.data.session.url);
    }


  }

  const getMonthlyPackage2 = async (token1) => {
    setLoader(true);
    var data = {
      token: token
    }
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/2`, requestOptions)
    const resp = await hello.json();

    console.log("resp2", resp)
    if (resp.status) {
      setMonthlyPackage2(resp.data.session.url);
    }
  }

  const getMonthlyPackage3 = async (token1) => {
    setLoader(true);
    var data = {
      token: token
    }
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/3`, requestOptions)
    const resp = await hello.json();

    console.log("resp3", resp)
    if (resp.status) {
      setMonthlyPackage3(resp.data.session.url);
    }
  }


  const openLink = (MonthlyPackage) => {
    window.location.assign(MonthlyPackage)
  }

  // console.log("...", MonthlyPackage2)
  // console.log("...", MonthlyPackage3)

  const [showFreePackage, setshowFreePackage] = useState(false)
  const [showPayAsYouGoPackage, setshowPayAsYouGoPackage] = useState(false)
  const [showMonthlyPackage, setshowMonthlyPackage] = useState(false)
  const [PackageContent, setPackageContent] = useState("free")
  const showPackageFunc = (content) => {
    if (content == "free") {
      setPackageContent(content)
      // setshowFreePackage(true)
      // setshowPayAsYouGoPackage(false)
      // setshowMonthlyPackage(false)
    } else if (content == "payAsYouGo") {
      setPackageContent(content)
      // setshowFreePackage(false)
      // setshowPayAsYouGoPackage(true)
      // setshowMonthlyPackage(false)
    } else {
      setPackageContent(content)
      // setshowFreePackage(false)
      // setshowPayAsYouGoPackage(false)
      // setshowMonthlyPackage(true)

    }

  }

  return (
    <>
      <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
        <Button variant={PackageContent == "free" ? 'contained' : 'outlined'} onClick={() => showPackageFunc("free")} >Free </Button>
        <Button variant={PackageContent == "monthly" ? 'contained' : 'outlined'} onClick={() => showPackageFunc("monthly")}>Monthly</Button>
        <Button variant={PackageContent == "payAsYouGo" ? 'contained' : 'outlined'} onClick={() => showPackageFunc("payAsYouGo")}>PayAsYouGo</Button>
      </ButtonGroup>



      {PackageContent == "free" ?
        <>
          {/* <h1 className="card__header-title container_heading_one text-center" style={{ color: 'gray' }} > Subscription</h1> */}
          <section className="card container grid section_one">
            <div className="card__container_PayAsYouGo_freepack ">
              {/*==================== CARD 1 ====================*/}
              <article className="card__content_free_and_payAsYouGo grid">
                {/* <div className="card__pricing">
              <div className="card__pricing-number">
                <span className="card__pricing-symbol">$</span>100
              </div>
              <span className="card__pricing-month">/month</span>
            </div> */}
                <header className="card__header">
                  {/* <div className="card__header-circle grid">
                <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png" alt className="card__header-img" />
              </div> */}
                  <span className="card__header-subtitle">Basic Plan</span>
                  <h1 className="card__header-title">Standard</h1>
                  <hr style={{ height: "1px", borderWidth: 0, color: "gray", backgroundColor: "#e9e9e9" }} />
                  <div>
                    <div className='pricing_div'>
                      <span className="pricing_free">FREE</span>

                    </div>

                  </div>
                </header>
                <ul className="card__list grid">
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">3 user request</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">10 downloads por day</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">Daily content updates</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">Fully editable files</p>
                  </li>
                </ul>
                <button onClick={() => getFreePackage()} className="card__button">Choose this plan</button>
              </article>
              {/*==================== CARD 2 ====================*/}

            </div>
          </section>
        </>
        : null
      }

      {PackageContent == "monthly" ?
        <>
          {/* <h1 className="card__header-title container_heading_two text-center" style={{ color: 'gray' }}>Monthly Subscription</h1> */}
          <section className="card container grid section_two">
            <div className="card__container grid">

              <article className="card__content_Basic grid">

                <header className="card__header">

                  <span className="card__header-subtitle">Best for Radiologists</span>
                  <h1 style={{ marginTop: '14%' }} className="card__header-title">Basic</h1>
                  <hr style={{ height: "1px", borderWidth: 0, color: "gray", backgroundColor: "#e9e9e9" }} />
                  <div className='pricing_div'>
                    <span className="pricing_number"><strong>$100</strong></span>
                    <span className="pricing_month">
                      /month

                    </span>

                  </div>
                </header>
                <ul className="card__list grid">
                  <li className="card__list-item">

                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"> <CheckIcon fontSize='small' />DICOM VIEWER: View all of your DICOM images. Using multi-modal (CT, MRI, CR, DR, US, XA, etc.) DICOM Viewer.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />CLINICAL DOCUMENTS VIEWER: Store clinical documents with DICOM images. Supported formats are JPEG, BMP, AVI, and PDF.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />PET- CT/MR FUSION: View PET/CT and PET/MR studies on DCMCLOUD. - Use MPR views - Measure SUV values.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />3D RENDERING: Use advanced diagnostic tools including; MPR, MIP, MINIP, AVGIP and 3D Rendering.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />UPLOAD: Upload DICOM images and clinical documents using HTML5 interface on browsers.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />MEDICAL DEVICE COMMUNICATOR: Setup MeDiC on your client machines. Send DICOM</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />SHARING: - Generate folders. - Assign studies to folders. - Share them with doctors and patients.</p>
                  </li>
                </ul>
                <button onClick={() => openLink(MonthlyPackage1)} className="card__button">Choose this plan</button>
              </article>

              <article className="card__content_Enterprise grid">
                <header className="card__header">

                  <span className="card__header-subtitle">Best for Hospitals, Clinicians, Imaging Centers</span>
                  <h1 className="card__header-title">Enterprise</h1>
                  <hr style={{ height: "1px", borderWidth: 0, color: "gray", backgroundColor: "#e9e9e9" }} />
                  <div className='pricing_div'>
                    <span className="pricing_number">$150</span>
                    <span className="pricing_month">
                      /month

                    </span>

                  </div>
                </header>
                <ul className="card__list grid">
                  <li className="card__list-item">

                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"> <CheckIcon fontSize='small' />DICOM VIEWER: View all of your DICOM images. Using multi-modal (CT, MRI, CR, DR, US, XA, etc.) DICOM Viewer.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />CLINICAL DOCUMENTS VIEWER: Store clinical documents with DICOM images. Supported formats are JPEG, BMP, AVI, and PDF.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />PET- CT/MR FUSION: View PET/CT and PET/MR studies on DCMCLOUD. - Use MPR views - Measure SUV values.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />3D RENDERING: Use advanced diagnostic tools including; MPR, MIP, MINIP, AVGIP and 3D Rendering.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />UPLOAD: Upload DICOM images and clinical documents using HTML5 interface on browsers.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />MEDICAL DEVICE COMMUNICATOR: Setup MeDiC on your client machines. Send DICOM</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />SHARING: - Generate folders. - Assign studies to folders. - Share them with doctors and patients.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />AUTHORIZATION: - Create users. - Assign specific attributes to users. - Manage explicit permissions</p>
                  </li>
                </ul>
                <button onClick={() => openLink(MonthlyPackage3)} className="card__button">Choose this plan</button>
              </article>

              <article className="card__content_Co_Branding grid">

                <header className="card__header">

                  <span className="card__header-subtitle">Suitable for Large Volume</span>
                  <h1 style={{ marginTop: '15%' }} className="card__header-title">Co-Branding</h1>
                  <hr style={{ height: "1px", borderWidth: 0, color: "gray", backgroundColor: "#e9e9e9" }} />
                  <div className='pricing_div'>
                    <span className="pricing_number">$200</span>
                    <span className="pricing_month">
                      /month

                    </span>

                  </div>

                </header>
                <ul className="card__list grid">
                  <li className="card__list-item">

                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"> <CheckIcon fontSize='small' />DICOM VIEWER: View all of your DICOM images. Using multi-modal (CT, MRI, CR, DR, US, XA, etc.) DICOM Viewer.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />CLINICAL DOCUMENTS VIEWER: Store clinical documents with DICOM images. Supported formats are JPEG, BMP, AVI, and PDF.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />PET- CT/MR FUSION: View PET/CT and PET/MR studies on DCMCLOUD. - Use MPR views - Measure SUV values.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />3D RENDERING: Use advanced diagnostic tools including; MPR, MIP, MINIP, AVGIP and 3D Rendering.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />UPLOAD: Upload DICOM images and clinical documents using HTML5 interface on browsers.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />MEDICAL DEVICE COMMUNICATOR: Setup MeDiC on your client machines. Send DICOM</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />SHARING: - Generate folders. - Assign studies to folders. - Share them with doctors and patients.</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p style={{ display: 'flex' }} className="card__list-description"><CheckIcon fontSize='small' />AUTHORIZATION: - Create users. - Assign specific attributes to users. - Manage explicit permissions</p>
                  </li>
                </ul>
                <button onClick={() => openLink(MonthlyPackage2)} className="card__button">Choose this plan</button>
              </article>

            </div>
          </section>
        </>
        : null
      }

      {PackageContent == "payAsYouGo" ?
        <>
          {/* <h1 className="card__header-title container_heading_one text-center" style={{ color: 'gray' }} > Subscription</h1> */}
          <section className="card container grid section_one">
            <div className="card__container_PayAsYouGo_freepack ">
              {/*==================== CARD 1 ====================*/}

              {/*==================== CARD 2 ====================*/}
              <article className="card__content_free_and_payAsYouGo grid">
                {/* <div className="card__pricing">
      <div className="card__pricing-number">
        <span className="card__pricing-symbol">$</span>150
      </div>
      <span className="card__pricing-month">/month</span>
    </div> */}
                <header className="card__header">
                  {/* <div className="card__header-circle grid">
        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/pro-coin.png" alt className="card__header-img" />
      </div> */}
                  <span className="card__header-subtitle"> PayAsYouGo Plan</span>
                  <h1 className="card__header-title">PayAsYouGo</h1>
                  <hr style={{ height: "1px", borderWidth: 0, color: "gray", backgroundColor: "#e9e9e9" }} />
                  <div className='pricing_div'>
                    <span className="pricing_number">$5</span>
                    <span className="pricing_month">
                      /month
                    </span>

                  </div>
                </header>
                <ul className="card__list grid">
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">100 user request</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">Unlimited downloads</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">Unlock all features from our site</p>
                  </li>
                  <li className="card__list-item">
                    <i className="uil uil-check card__list-icon" />
                    <p className="card__list-description">Daily content updates</p>
                  </li>

                </ul>
                <button onClick={() => openLink(PayAsYouGo)} className="card__button">Choose this plan</button>
              </article>

            </div>
          </section>
        </> :
        null
      }






      {/* <section className="card container grid" style={{ height: '60vh' }}>
        <h1 className="card__header-title text-center" style={{ color: 'gray' }}>PayAsYouGo </h1>
        <article className="card__content__freePackage grid">
          <div className="card__pricing">
            <div className="card__pricing-number">
              <span className="card__pricing-symbol">$</span>5
            </div>
            <span className="card__pricing-month">/month</span>
          </div>
          <header className="card__header">
            <div className="card__header-circle grid">
              <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png" alt className="card__header-img" />
            </div>
            <span className="card__header-subtitle">PayAsYouGo plan</span>
          </header>

          <ul className="card__list grid">
            <li className="card__list-item">
              <i className="uil uil-check card__list-icon" />
              <p className="card__list-description">3 user request</p>
            </li>

          </ul>
          <button onClick={() => openLink(PayAsYouGo)} className="card__button_freePackage">Choose this plan</button>
        </article>


      </section> */}


      {/* <section className="card container grid" style={{ height: '60vh' }}>
        <h1 className="card__header-title text-center" >Free Subscription</h1>
        <article className="card__content__freePackage grid">

          <header className="card__header">

            <span className="card__header-subtitle">Free plan</span>

          </header>

          <ul className="card__list grid">
            <li className="card__list-item">
              <i className="uil uil-check card__list-icon" />
              <p className="card__list-description">3 user request</p>
            </li>

          </ul>
          <button onClick={() => getFreePackage()} className="card__button_freePackage">Choose this plan</button>
        </article>

      </section> */}

    </>
  )
}

export default PackagePrice
