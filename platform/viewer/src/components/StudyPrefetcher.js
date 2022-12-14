import { Component } from "react";
import PropTypes from "prop-types";
import DCMCloud from "@dcmcloud/core";

const { StudyPrefetcher } = DCMCloud.classes;

class StudyPrefetcherComponent extends Component {
  static propTypes = {
    studies: PropTypes.array
  };

  componentDidMount() {
    const { studies } = this.props;

    this.studyPrefetcher = StudyPrefetcher.getInstance();
    this.studyPrefetcher.setStudies(studies);
  }

  render() {
    return null;
  }

  componentWillUnmount() {
    // Stop prefetching when we close the viewer
    this.studyPrefetcher.destroy();
  }
}

export default StudyPrefetcherComponent;
