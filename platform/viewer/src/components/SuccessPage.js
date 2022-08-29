import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Success.css';

const SuccessPage = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  if (token === null) {
    history.push('/');
  }

  useEffect(() => {
    getStripeID();
  }, [getStripeID]);

  const getStripeID = async token1 => {
    // setLoader(true);
    var data = {
      token: token,
    };
    // console.log("DATA", token)
    var requestOptions = {
      method: 'POST',
      // headers: {
      //   Authorization: "Bearer " + userToken
      // }
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const hello = await fetch(
      `https://dcm-cloud.herokuapp.com/api/v1/stripe/getId`,
      requestOptions
    );
    const resp = await hello.json();

    console.log('resp', resp.id);

    const userDataNew = { ...userData, stripeId: resp.id };
    localStorage.setItem('userData', JSON.stringify(userDataNew));
  };
  console.log('first', userData);

  return (
    <>
      <section className="success_section">
        <div className=" Successpage_card">
          {/* <div style={{ borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto' }}>
            <i className="checkmark">✓</i>
          </div> */}
          <h1 style={{ color: '#5ABC71' }}>
            <strong>Thanks for Subscription</strong>
          </h1>
          <img src="assets/right.png" width={70} style={{ margin: '35px 0' }} />
          <p>
            We received your purchase request;
            <br /> we'll be in touch shortly!
          </p>
          <div className="row ">
            <button
              onClick={() => history.push('/DashboardPage/StudylistNew')}
              type="button"
              style={{ width: '100%', height: 46, marginTop: '5%' }}
              className="SuccessPagebtn btn-primary btn-block "
            >
              To Studylist
            </button>
          </div>
          <div className="container"></div>
        </div>
      </section>
    </>
  );
};

export default SuccessPage;
