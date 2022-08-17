import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import './ErrorFallback.css';

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div className="ErrorFallback" role="alert">
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
    </div>
  );
};

const DCMCloudErrorBoundary = ({
  context = 'DCMCloud',
  onReset = () => {},
  onError = () => {},
  fallbackComponent,
  children,
}) => {
  const onErrorHandler = (error, componentStack) => {
    console.error(`${context} Error Boundary`, error, componentStack);
    onError(error, componentStack);
  };

  const onResetHandler = () => {
    onReset();
  };

  return (
    <ErrorBoundary
      FallbackComponent={fallbackComponent || ErrorFallback}
      onReset={onResetHandler}
      onError={onErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};

DCMCloudErrorBoundary.propTypes = {
  context: PropTypes.string,
  onReset: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node.isRequired,
  fallbackComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.element,
  ]),
};

export default DCMCloudErrorBoundary;
