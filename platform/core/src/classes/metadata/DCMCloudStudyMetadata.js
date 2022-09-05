import { StudyMetadata } from './StudyMetadata';
import { DCMCloudSeriesMetadata } from './DCMCloudSeriesMetadata';

export class DCMCloudStudyMetadata extends StudyMetadata {
  /**
   * @param {Object} Study object.
   */
  constructor(data, uid) {
    super(data, uid);
    this.init();
  }

  init() {
    const study = this.getData();

    // define "_studyInstanceUID" protected property
    Object.defineProperty(this, '_studyInstanceUID', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: study.StudyInstanceUID,
    });

    // populate internal list of series
    study.series.forEach(series => {
      this.addSeries(new DCMCloudSeriesMetadata(series, study));
    });
  }
}
