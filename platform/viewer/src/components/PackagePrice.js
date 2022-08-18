import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';


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

  return (
    <>



      <section className="card container grid" style={{ height: '60vh' }}>
        <h1 className="card__header-title text-center" >Free Subscription</h1>
        <article className="card__content__freePackage grid">
          <div className="card__pricing">
            <div className="card__pricing-number">
              <span className="card__pricing-symbol">$</span>0
            </div>
            <span className="card__pricing-month">/month</span>
          </div>
          <header className="card__header">
            <div className="card__header-circle grid">
              <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png" alt className="card__header-img" />
            </div>
            <span className="card__header-subtitle">Free plan</span>
            {/* <h1 className="card__header-title">Basic</h1> */}
          </header>

          <ul className="card__list grid">
            <li className="card__list-item">
              <i className="uil uil-check card__list-icon" />
              <p className="card__list-description">3 user request</p>
            </li>
            {/* <li className="card__list-item">
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
            </li> */}
          </ul>
          <button onClick={() => getFreePackage()} className="card__button_freePackage">Choose this plan</button>
        </article>
        {/* <div className="card__container grid">

          </div> */}

      </section>





      {/*==================== CARD 1 ====================*/}


      <h1 className="card__header-title text-center" style={{ color: 'gray', height: '10vh' }}>Monthly Subscription</h1>
      <section className="card container grid">
        <div className="card__container grid">
          {/*==================== CARD 1 ====================*/}
          <article className="card__content grid">
            <div className="card__pricing">
              <div className="card__pricing-number">
                <span className="card__pricing-symbol">$</span>100
              </div>
              <span className="card__pricing-month">/month</span>
            </div>
            <header className="card__header">
              <div className="card__header-circle grid">
                <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png" alt className="card__header-img" />
              </div>
              <span className="card__header-subtitle">Basic plan</span>
              <h1 className="card__header-title">Basic</h1>
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
            <button onClick={() => openLink(MonthlyPackage1)} className="card__button">Choose this plan</button>
          </article>
          {/*==================== CARD 2 ====================*/}
          <article className="card__content grid">
            <div className="card__pricing">
              <div className="card__pricing-number">
                <span className="card__pricing-symbol">$</span>150
              </div>
              <span className="card__pricing-month">/month</span>
            </div>
            <header className="card__header">
              <div className="card__header-circle grid">
                <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/pro-coin.png" alt className="card__header-img" />
              </div>
              <span className="card__header-subtitle">Most popular</span>
              <h1 className="card__header-title">Professional</h1>
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
              <li className="card__list-item">
                <i className="uil uil-check card__list-icon" />
                <p className="card__list-description">Fully editable files</p>
              </li>
            </ul>
            <button onClick={() => openLink(MonthlyPackage2)} className="card__button">Choose this plan</button>
          </article>
          {/*==================== CARD 3 ====================*/}
          <article className="card__content grid">
            <div className="card__pricing">
              <div className="card__pricing-number">
                <span className="card__pricing-symbol">$</span>200
              </div>
              <span className="card__pricing-month">/month</span>
            </div>
            <header className="card__header">
              <div className="card__header-circle grid">
                <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/enterprise-coin.png" alt className="card__header-img" />
              </div>
              <span className="card__header-subtitle">For agencies</span>
              <h1 className="card__header-title">Enterprise</h1>
            </header>
            <ul className="card__list grid">
              <li className="card__list-item">
                <i className="uil uil-check card__list-icon" />
                <p className="card__list-description">Unlimited  user request</p>
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
              <li className="card__list-item">
                <i className="uil uil-check card__list-icon" />
                <p className="card__list-description">Fully editable files</p>
              </li>
            </ul>
            <button onClick={() => openLink(MonthlyPackage3)} className="card__button">Choose this plan</button>
          </article>
        </div>
      </section>


      <section className="card container grid" style={{ height: '60vh' }}>
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
            {/* <h1 className="card__header-title">Basic</h1> */}
          </header>

          <ul className="card__list grid">
            <li className="card__list-item">
              <i className="uil uil-check card__list-icon" />
              <p className="card__list-description">3 user request</p>
            </li>
            {/* <li className="card__list-item">
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
            </li> */}
          </ul>
          <button onClick={() => openLink(PayAsYouGo)} className="card__button_freePackage">Choose this plan</button>
        </article>
        {/* <div className="card__container grid">

          </div> */}

      </section>

    </>
  )
}

export default PackagePrice
