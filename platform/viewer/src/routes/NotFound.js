import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function NotFound({ message = 'Sorry, this page does not exist.', showGoBackButton = true }) {

  const context = useAppContext();

  return (
    <div className={'not-found'}>
      <div>
        <h4>{message}</h4>
        {showGoBackButton && context.appConfig.showStudyList && (
          <h5>
            <Link to={'#'}>Could not load Study</Link>
          </h5>
        )}
      </div>
    </div>
  );
}
