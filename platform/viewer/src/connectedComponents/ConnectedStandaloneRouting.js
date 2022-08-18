import { connect } from 'react-redux';
import StandaloneRouting from '../routes/StandaloneRouting';
import { useHistory } from 'react-router-dom';

const mapDispatchToProps = dispatch => {

  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('studentData'))
  const token = localStorage.getItem('token')
  if (token === null) {
    history.push('/')
  }
  return {
    activateServer: server => {
      const action = {
        type: 'ACTIVATE_SERVER',
        server,
      };
      dispatch(action);
    },
  };
};

const ConnectedStandaloneRouting = connect(
  null,
  mapDispatchToProps
)(StandaloneRouting);

export default ConnectedStandaloneRouting;
