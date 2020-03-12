import React, { Fragment } from 'react';
import { equals } from 'ramda';

import Presentation from './Presentation';

const APP_TITLE = 'Insights Center Story';

class Application extends React.Component {
  componentDidMount() {
    document.title = APP_TITLE;
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      error,
      actions: { setAppError },
    } = this.props;

    /**
     * one should check if route changed while application has errors
     * case in which appError should reset
     */
    if (!equals(location, prevProps.location) && error) {
      setAppError(null);
    }
  }

  /** pages
   * catches all js erpagesrors from its children
   * @param {*} error
   */
  componentDidCatch(error) {
    const {
      actions: { setAppError },
    } = this.props;
    setAppError(error);
  }

  render() {
    return (
      <Fragment>
        <header />

        <main>
          <Presentation title={APP_TITLE} />
        </main>

        <footer />
      </Fragment>
    );
  }
}

export default Application;
