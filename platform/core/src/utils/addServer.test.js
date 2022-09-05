import addServers from './addServers';

describe('addServers', () => {
  const servers = {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot: 'https://192.168.100.20:5006/coreapi/react/WadoURI',
        qidoRoot: 'https://192.168.100.20:5006/coreapi/react/QidoRS',
        wadoRoot: 'https://192.168.100.20:5006/coreapi/react/WadoRS',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadouri',
        thumbnailRendering: 'wadouri',
      },
    ],
    oidc: [
      {
        authority: 'http://127.0.0.1/auth/realms/dcmcloud',
        client_id: 'dcmcloud-viewer',
        redirect_uri: 'http://127.0.0.1/callback',
        response_type: 'code',
        scope: 'openid',
        post_logout_redirect_uri: '/logout-redirect.html',
      },
    ],
  };

  const store = {
    dispatch: jest.fn(),
  };

  test('should be able to add a server and dispatch to the store successfuly', () => {
    addServers(servers, store);
    expect(store.dispatch).toBeCalledWith({
      server: {
        authority: 'http://127.0.0.1/auth/realms/dcmcloud',
        client_id: 'dcmcloud-viewer',
        post_logout_redirect_uri: '/logout-redirect.html',
        redirect_uri: 'http://127.0.0.1/callback',
        response_type: 'code',
        scope: 'openid',
        type: 'oidc',
      },
      type: 'ADD_SERVER',
    });
    expect(store.dispatch).toBeCalledWith({
      server: {
        imageRendering: 'wadouri',
        name: 'DCM4CHEE',
        qidoRoot: 'https://192.168.100.20:5006/coreapi/react/QidoRS',
        qidoSupportsIncludeField: true,
        thumbnailRendering: 'wadouri',
        type: 'dicomWeb',
        wadoRoot: 'https://192.168.100.20:5006/coreapi/react/WadoRS',
        wadoUriRoot: 'https://192.168.100.20:5006/coreapi/react/WadoURI',
      },
      type: 'ADD_SERVER',
    });
  });

  test('should throw an error if servers list is not defined', () => {
    expect(() => addServers(undefined, store)).toThrowError(
      new Error('The servers and store must be defined')
    );
  });

  test('should throw an error if store is not defined', () => {
    expect(() => addServers(servers, undefined)).toThrowError(
      new Error('The servers and store must be defined')
    );
  });

  test('should throw an error when both server and store are not defined', () => {
    expect(() => addServers(undefined, undefined)).toThrowError(
      new Error('The servers and store must be defined')
    );
  });
});
