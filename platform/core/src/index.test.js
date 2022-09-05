import * as DCMCloud from './index.js';

describe('Top level exports', () => {
  test('have not changed', () => {
    const expectedExports = [
      'MODULE_TYPES',
      //
      'CommandsManager',
      'ExtensionManager',
      'HotkeysManager',
      'ServicesManager',
      //
      'UINotificationService',
      'UIModalService',
      'UIDialogService',
      'MeasurementService',
      'LoggerService',
      //
      'utils',
      'hotkeys',
      'studies',
      'redux',
      'classes',
      'metadata',
      'header',
      'cornerstone',
      'default', //
      'errorHandler',
      'string',
      'ui',
      'user',
      'object',
      'log',
      'DICOMWeb',
      'DICOMSR',
      'DCMCloud', //
      'measurements',
      'hangingProtocols',
    ].sort();

    const exports = Object.keys(DCMCloud).sort();

    expect(exports).toEqual(expectedExports);
  });
});
