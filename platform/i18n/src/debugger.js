import { debugMode } from './config';

export default (message, level = 'log') => {
  if (debugMode) {
    // eslint-disable-next-line
    console[level]('@dcmcloud/i18n: ', message);
  }
};
