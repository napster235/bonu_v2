import React from 'react';
import PropTypes from 'prop-types';
import { request } from 'api/base.js';
import equal from 'deep-equal';
import { mergeRight } from 'ramda';

/**
 * Calls api for presentational data only, without adding it to store.
 * Takes a function as children and calls it with data, loading, and error params.
 * Cancels pending request if component will unmount while request is pending.
 *
 * @param url [REQUIRED] is a string specifying the endpoint.
 * @param method [OPTIONAL] is used to choose the REST method. [DEFAULT] 'GET'.
 * @param params [OPTIONAL] is an object of optional parameters. [DEFAULT] {}
 *
 * @returns
 * @param data response.body object
 * @param loading true while request is pending
 * @param error boolean, true if server returns an error.
 *
 * @example
 * <DataFetcher url="/issue">
 *   {({ loading, data, error }) => (
 *    <Component
 *      data={data}
 *      loading={loading}
 *      error={error}
 *    />
 *   )}
 * </DataFetcher>
 */

class DataFetcher extends React.PureComponent {
  static propTypes = {
    /* method name: GET or POST mostly */
    method: PropTypes.string,
    /* endpoint url */
    url: PropTypes.string.isRequired,
    /* optional query params */
    params: PropTypes.object, /* eslint-disable-line */
  };

  static defaultProps = {
    method: 'GET',
    params: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!equal(nextProps.params, prevState.params) || nextProps.url !== prevState.url) {
      return mergeRight(prevState, {
        url: nextProps.url,
        params: nextProps.params,
        data: [],
        error: false,
      });
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: false,
    };

    this.request = {};
  }

  componentDidMount() {
    const { method, url, params } = this.props;
    this.fetch(method, url, params);
  }

  componentDidUpdate(_, prevState) {
    const { params, url } = this.state;
    const { method } = this.props;

    if (!equal(prevState.params, params) || prevState.url !== url) {
      this.fetch(method, url, params);
    }
  }

  componentWillUnmount() {
    if (this.request.cancel) {
      this.request.cancel();
    }
  }

  fetch = (method, url, params) => {
    this.setState({ loading: true, data: [] });

    if (this.request.cancel) {
      this.request.cancel();
    }

    this.request = request(method, url, params)
      .then((resp) => {
        this.setState({
          loading: false,
          data: resp.body,
          error: false,
        });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }

  componentDidCatch() {
    if (this.request.cancel) {
      this.request.cancel();
    }
  }

  render() {
    const { loading, data, error } = this.state;
    const { children } = this.props;
    return children({ loading, data, error });
  }
}

export default DataFetcher;
