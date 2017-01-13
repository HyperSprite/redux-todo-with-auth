import React, { Component, PropTypes } from 'react';

const propTypes = {
  id: PropTypes.string,
  alignToTop: PropTypes.bool,
  headerHeight: PropTypes.number,
  children: PropTypes.node,
};

export default class ScrollIntoView extends Component {

  static defaultProps = {
    alignToTop: true,
    headerHeight: 0,
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scrollUpdate();
  }

  scroll() {
    const { id, alignToTop, headerHeight } = this.props;
    if (!id) {
      window.scroll(0, 0);
      return;
    }

    const element = document.querySelector(id);
    if (element && element.scrollIntoView) {
      setTimeout(() => {
        element.scrollIntoView(alignToTop);
        const scrolledY = window.scrollY;

        if (scrolledY) {
          window.scroll(0, scrolledY - headerHeight);
        }
      }, 0);
    }
  }

  scrollUpdate() {
    const { id, alignToTop, headerHeight } = this.props;
    if (!id) {
      return;
    }

    const element = document.querySelector(id);
    if (element && element.scrollIntoView) {
      setTimeout(() => {
        element.scrollIntoView(alignToTop);
        const scrolledY = window.scrollY;

        if (scrolledY) {
          window.scroll(0, scrolledY - headerHeight);
        }
      }, 0);
    }
  }

  render() {
    return this.props.children ? this.props.children : null;
  }
}

ScrollIntoView.propTypes = propTypes;
